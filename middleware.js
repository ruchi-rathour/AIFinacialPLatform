import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected route logic manually
const isProtectedRoute = (req) => {
  const path = req.nextUrl.pathname;
  return (
    path.startsWith("/dashboard") ||
    path.startsWith("/account") ||
    path.startsWith("/transaction")
  );
};

// ArcJet middleware
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

// Clerk middleware
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// Chain ArcJet and Clerk
export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    // Skip static files and internal Next.js routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run on APIs
    "/(api|trpc)(.*)",
  ],
};

