/**
 * Modelo de un departamento del fraccionamiento.
 *
 * Este tipo está diseñado para convertirse casi 1:1 en un `model Departamento`
 * de Prisma cuando llegue la fase de Node.js + Postgres:
 *
 *   model Departamento {
 *     id          String   @id @default(cuid())
 *     slug        String   @unique
 *     titulo      String
 *     estatus     Estatus
 *     precio      Int
 *     operacion   Operacion
 *     recamaras   Int
 *     m2          Int
 *     piso        Int
 *     amenidades  String[]
 *     imagenes    String[]
 *     asesorId    String
 *     asesor      Asesor   @relation(fields: [asesorId], references: [id])
 *   }
 *
 * `asesorId` es la clave foránea que hará posible, en la fase 2, que cada
 * asesor solo pueda editar/subir imágenes de sus propios departamentos
 * (equivalente a un `WHERE asesor_id = :usuario_actual` en PL/SQL).
 */

export type EstatusDepartamento = "disponible" | "rentado" | "vendido";

export type TipoOperacion = "renta" | "venta";

/** Tope de fotos que el carrusel muestra por departamento. Cambiar este
 *  número es la única línea que tocar si el máximo cambia — tanto si se
 *  reduce como si se decide permitir más adelante. */
export const MAX_IMAGENES_CARRUSEL = 6;

export interface Departamento {
  /** Identificador único. Hoy es un string manual; en DB será un cuid/uuid. */
  id: string;
  /** Usado para la URL pública /departamentos/[slug] — clave para SEO. */
  slug: string;
  titulo: string;
  estatus: EstatusDepartamento;
  operacion: TipoOperacion;
  /** Precio en MXN, sin formatear (el formateo vive en la capa de presentación). */
  precio: number;
  recamaras: number;
  m2: number;
  piso: number;
  amenidades: string[];
  /**
   * Hasta 6 rutas de imagen para el carrusel. Hoy apuntan a /public/img;
   * en la fase con carga por asesor serán URLs de un storage externo.
   */
  imagenes: string[];
  /** FK al asesor responsable de este departamento. */
  asesorId: string;
  descripcion?: string;
}
