import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and any path with a file extension
  // (dot is double-escaped: a single "\." in a JS string is just ".")
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
