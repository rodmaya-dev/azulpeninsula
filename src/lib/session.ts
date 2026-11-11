import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { auth } from "@/lib/auth";
import { RUTA_INICIAL, rolSchema, type Rol } from "@/lib/roles";

export interface UsuarioSesion {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
}

// cache() evita consultar la sesión varias veces en una misma petición.
export const obtenerSesion = cache(
  async (): Promise<{ usuario: UsuarioSesion } | null> => {
    const sesion = await auth.api.getSession({ headers: await headers() });
    if (!sesion) return null;

    // Better Auth tipa el rol como texto: se valida aquí, en un solo lugar.
    // Un rol desconocido se trata como "sin sesión" (falla cerrado).
    const rol = rolSchema.safeParse(
      (sesion.user as Record<string, unknown>).role,
    );
    if (!rol.success) return null;

    return {
      usuario: {
        id: sesion.user.id,
        nombre: sesion.user.name,
        email: sesion.user.email,
        rol: rol.data,
      },
    };
  },
);

// Cada página y cada Server Action protegida debe llamar a esto: los layouts
// de Next no se vuelven a ejecutar al navegar entre páginas hijas, así que
// no pueden ser la única barrera.
export async function exigirRol(...rolesPermitidos: Rol[]) {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/login");
  if (!rolesPermitidos.includes(sesion.usuario.rol)) {
    redirect(RUTA_INICIAL[sesion.usuario.rol]);
  }
  return sesion;
}