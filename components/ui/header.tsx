"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 shadow-md z-50 backdrop-blur-md">
      <nav className="w-full p-2 flex justify-between">
        <div>
          <Link
            href="/dashboard"
            className={clsx(buttonVariants({ variant: "ghost" }), {
              "bg-black text-white": pathname === "/dashboard",
            })}
          >
            Home
          </Link>
          <Link
            href="/my-profile"
            className={clsx(buttonVariants({ variant: "ghost" }), {
              "bg-black text-white": pathname === "/my-profile",
            })}
          >
            My Profile
          </Link>
        </div>
        <div className="mr-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
