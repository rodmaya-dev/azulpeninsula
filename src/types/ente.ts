/**
 * Estructura organizacional del fraccionamiento (sección "Nosotros").
 *
 * Un `Ente` (Asamblea de Propietarios, Mesa Directiva, Consejo de
 * Vigilancia, Gerencia Operativa) agrupa funciones + miembros. Es la
 * relación 1-a-N que en PL/SQL modelarías como `entes` + `ente_funciones`
 * + `miembros(ente_id FK)`.
 */

export interface Miembro {
  id: string;
  nombre: string;
  /** Ej. "Presidente", "Manzana 4". Ya no se usan fotos, solo nombre + cargo. */
  cargo: string;
}

export interface Ente {
  /** Usado como anchor (#directors, #council...) y como key del modal. */
  id: string;
  nombre: string;
  /** Texto corto que resume qué hace este ente — se muestra en el modal. */
  descripcion: string;
  /** Lista de funciones/responsabilidades — se renderiza como lista en el modal. */
  funciones: string[];
  miembros: Miembro[];
}
