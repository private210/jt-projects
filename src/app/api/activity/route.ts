import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return NextResponse.json(logs);
}
