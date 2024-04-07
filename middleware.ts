import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";
import { NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  // Allow signed out users to access the specified routes:
  async afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, auth.userId),
    });

    if (!user && !req.url.includes("onboarding")) {
      const onboarding = new URL("/onboarding", req.url);
      return NextResponse.redirect(onboarding);
    }

    if (user && req.url.includes("onboarding")) {
      const dashboard = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboard);
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
  publicRoutes: ["/"],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
