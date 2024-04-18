import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, description, gradient } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Project name is required!!", { status: 401 });
    }

    const project = await prismadb.presentation.create({
      data: {
        userId: userId,
        name: name,
        description: description,
        gradient: gradient,
      },
    });
    revalidatePath("/dashboard");
    return new NextResponse(JSON.stringify(project), { status: 201 });
  } catch (e) {
    console.error(e);
  }
}
