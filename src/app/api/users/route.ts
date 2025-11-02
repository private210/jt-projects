import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Ambil semua users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST: Tambah user baru (termasuk Google account)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Validasi: hanya DEVELOPER dan ADMIN yang bisa tambah user
    interface SessionUser {
      id: string;
      email?: string;
      name?: string;
      role?: string;
      image?: string;
    }
    const user = session?.user as SessionUser | undefined;
    if (!user || !["DEVELOPER", "ADMIN"].includes(user.role ?? "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { email, username, password, role, isGoogleAccount } = body;

    // Validasi input
    if (!email || !username || !role) {
      return NextResponse.json({ error: "Email, username, dan role wajib diisi" }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    // Jika bukan Google account, password wajib diisi
    if (!isGoogleAccount && !password) {
      return NextResponse.json({ error: "Password wajib diisi untuk akun non-Google" }, { status: 400 });
    }

    // Hash password jika ada
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        name: username,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// PUT: Update user
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !["DEVELOPER", "ADMIN"].includes((session.user as any).role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { id, username, role, password } = body;

    if (!id || !username || !role) {
      return NextResponse.json({ error: "ID, username, dan role wajib diisi" }, { status: 400 });
    }

    // Cek apakah user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {
      username,
      name: username,
      role,
    };

    // Update password jika diisi
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE: Hapus user
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !["DEVELOPER", "ADMIN"].includes((session.user as any).role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID user wajib diisi" }, { status: 400 });
    }

    // Cek apakah user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Prevent deleting yourself
    interface SessionUser {
      id: string;
      email?: string;
      name?: string;
      role?: string;
      image?: string;
    }
    const user = session.user as SessionUser;
    if (user.id === id) {
      return NextResponse.json({ error: "Tidak dapat menghapus akun sendiri" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User berhasil dihapus", id });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
