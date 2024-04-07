import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 shadow-md z-50 backdrop-blur-md">
        <nav className="w-full p-2">
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "ghost" })}
          >
            Home
          </Link>
          <Link
            href="/my-profile"
            className={buttonVariants({ variant: "ghost" })}
          >
            My profile
          </Link>
        </nav>
      </header>
      <div className="pt-16">{children}</div>
    </div>
  );
}
