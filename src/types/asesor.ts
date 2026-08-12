/**
 * Asesor inmobiliario. En la fase de Node.js, `id` se vuelve la FK que
 * referencian los Departamentos (ver types/departamento.ts) y el sujeto
 * de la autenticación para el panel de carga de imágenes.
 */
export interface Asesor {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  fotoUrl?: string;
  /** Promedio 0-5, calculado a partir de Reseña[] en la fase con backend. */
  ratingPromedio: number;
  totalResenas: number;
}
