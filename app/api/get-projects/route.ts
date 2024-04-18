import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const projects = await prismadb.presentation.findMany({
      where: {
        userId: userId,
      },
    });
    return new NextResponse(JSON.stringify(projects), { status: 201 });
  } catch (e) {
    console.error(e);
  }
}
