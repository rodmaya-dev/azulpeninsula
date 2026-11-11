// "Gabriela Delgado" -> "gabriela-delgado". Máximo 50 caracteres para dejar
// espacio al sufijo numérico (la columna admite 60).
export function generarSlugBase(texto: string): string {
  const base = texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50)
    .replace(/-+$/g, "");
  return base || "asesor";
}