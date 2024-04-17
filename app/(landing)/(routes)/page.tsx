"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
export default function Home() {
  const { userId } = useAuth();
  return (
    <div>
      {userId ? (
        <div>
          <UserButton afterSignOutUrl="/" />
          <a href="/dashboard">Dashboard</a>
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          <a href="/sign-up">Sign up</a>
          <a href="/sign-in">Sign in</a>
        </div>
      )}
    </div>
  );
}
