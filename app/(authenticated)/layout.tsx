import { buttonVariants } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="pt-16">{children}</div>
    </div>
  );
}
