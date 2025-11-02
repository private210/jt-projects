import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  if (!email || !password) {
    return new Response("Email dan password wajib diisi", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return Response.json(user);
}
