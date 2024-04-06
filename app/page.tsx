import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen min-w-screen p-24">
      <h1 className="text-3xl font-black">
        <span className="text-2xl text-orange-600">S</span>killer app
      </h1>
      <div>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "default" }), "my-4")}
        >
          <SignedIn>Go to Dashboard</SignedIn>
          <SignedOut>Get Started</SignedOut>
        </Link>
      </div>
    </main>
  );
}
