import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, description } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Project name is required!!", { status: 401 });
    }

    await prismadb.presentation.create({
      data: {
        userId: userId!,
        name: name,
        description: description,
      },
    });
    return new NextResponse("Success", { status: 201 });
  } catch (e) {
    console.error(e);
  }
}
