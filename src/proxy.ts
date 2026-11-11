import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Barrera optimista: solo mira si existe la cookie de sesión. Una cookie
// falsa pasa de aquí, pero la página la rechaza con exigirRol() (src/lib/session.ts),
// que es la verificación real. Por eso no se consulta la base de datos en el proxy:
// corre en cada petición, incluidas las de precarga de enlaces.
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/panel/:path*"],
};