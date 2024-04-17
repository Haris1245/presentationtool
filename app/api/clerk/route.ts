import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import prismadb from "@/lib/prisma";
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  const payload = await validateRequest(request);

  if (payload.type === "user.created") {
    await prismadb.user.create({
      data: {
        userId: payload.data.id,
      },
    });
    console.log(`User ${payload.data.id} added to db`);
  } else if (payload.type === "user.deleted") {
    await prismadb.user.delete({
      where: {
        userId: payload.data.id,
      },
    });
    console.log(`User ${payload.data.id} deleted from db`);
  }
  return new Response(JSON.stringify({ message: "Received" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
