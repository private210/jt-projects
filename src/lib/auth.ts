import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "./db";

export async function getCurrentUser() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Check if user exists in our database
  let dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
  });

  // If user doesn't exist, create them
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim() || user.emailAddresses[0].emailAddress,
        role: "USER", // Default role
      },
    });
  }

  return {
    ...dbUser,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  return true;
}

export async function getUserRole() {
  const user = await getCurrentUser();
  return user?.role || "USER";
}
