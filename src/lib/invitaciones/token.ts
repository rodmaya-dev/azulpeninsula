import "server-only";

import { createHash, randomBytes } from "node:crypto";

export const VIGENCIA_INVITACION_HORAS = 48;

// 32 bytes aleatorios = 256 bits: no se puede adivinar ni probar por fuerza bruta.
export function generarToken(): string {
  return randomBytes(32).toString("base64url");
}

// SHA-256 sin sal es suficiente porque el token ya tiene entropía de sobra
// (la sal sirve para contraseñas que elige una persona, no para esto).
// El resultado son 64 caracteres hex: calza con la columna CHAR(64).
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}