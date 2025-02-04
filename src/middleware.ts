import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./app/(auth)/services/get-user-me-loader";

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return path !== "/signin"
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  //登入後不該進到登入頁面
  if (user.ok === true && !isProtectedRoute(currentPath)) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
