import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const hasLocale =
    pathname.startsWith("/uz") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/ru") ||
    pathname.startsWith("/ger");

  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/uz${pathname}`, req.url));
  }
};

export { middleware };

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
