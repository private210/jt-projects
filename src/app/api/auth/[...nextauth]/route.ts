import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // ✅ Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),

    // ✅ Manual Email/Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: "/",
    error: "/",
  },

  callbacks: {
    // ✅ Sign In: Validasi apakah user boleh login
    async signIn({ user, account }) {
      // Jika login dengan Google
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;

        // Cek apakah user sudah terdaftar di database
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        // Jika belum ada, block login - hanya admin yang bisa tambah user
        if (!existingUser) {
          console.log(`❌ Login ditolak: ${email} belum terdaftar di database`);
          return false;
        }

        // Jika sudah ada, update image dan name dari Google
        await prisma.user.update({
          where: { email },
          data: {
            name: user.name || existingUser.name,
            image: user.image || existingUser.image,
          },
        });

        return true;
      }

      // Login dengan credentials selalu diizinkan (sudah divalidasi di authorize)
      return true;
    },

    // ✅ JWT: Inject role ke dalam token
    async jwt({ token, user, account }) {
      // Saat login pertama kali
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as { role?: string }).role || "USER";
        token.image = user.image;
      }

      // Saat user login dengan Google, ambil data dari DB
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.name = dbUser.name || dbUser.username;
          token.image = dbUser.image;
        }
      }

      // Refresh role dari database setiap request (opsional, untuk update real-time)
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, role: true, username: true, name: true, image: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.name = dbUser.name || dbUser.username;
        }
      }

      return token;
    },

    // ✅ Session: inject token ke dalam session.user
    async session({ session, token }) {
      if (token && session.user) {
        type EnhancedUser = {
          id?: string;
          email?: string | null;
          role?: string;
          name?: string | null;
          image?: string | null;
        };
        const user = session.user as EnhancedUser;
        user.id = token.id as string | undefined;
        user.email = token.email ?? null;
        user.role = token.role as string | undefined;
        user.name = token.name ?? null;
        user.image = typeof token.image === "string" ? token.image : null;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 hari
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
