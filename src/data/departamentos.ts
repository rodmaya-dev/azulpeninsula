import type { Departamento } from "@/types/departamento";

/**
 * Fuente de datos actual: array en memoria.
 * Fase 2 (Node.js + Prisma): esta constante se sustituye por
 * `await prisma.departamento.findMany()` — ningún componente que
 * consuma `departamentos` necesita cambiar, porque el shape es idéntico.
 */
export const departamentos: Departamento[] = [
  {
    id: "depto-m4",
    slug: "departamento-m4-azul-peninsula",
    titulo: "Departamento M4",
    estatus: "disponible",
    operacion: "renta",
    precio: 9500,
    recamaras: 2,
    m2: 59,
    piso: 1,
    amenidades: ["A/C", "Cocina equipada", "Estacionamiento", "Patio"],
    // Único departamento con foto real por ahora. El carrusel soporta hasta
    // 5; el resto de arrays queda vacío hasta tener las fotos de cada uno.
    imagenes: ["/img/departamentos/depto-m4_2.jpg"],
    asesorId: "efrain-pineda",
  },
  {
    id: "depto-m7",
    slug: "departamento-m7-azul-peninsula",
    titulo: "Departamento M7",
    estatus: "disponible",
    operacion: "renta",
    precio: 10500,
    recamaras: 2,
    m2: 51,
    piso: 2,
    amenidades: ["A/C", "Cocina equipada", "Estacionamiento", "Vista a la montaña"],
    imagenes: [],
    asesorId: "efrain-pineda",
  },
  {
    id: "depto-m9",
    slug: "departamento-m9-azul-peninsula",
    titulo: "Departamento M9",
    estatus: "rentado",
    operacion: "renta",
    precio: 12500,
    recamaras: 2,
    m2: 51,
    piso: 0,
    amenidades: ["A/C", "Cocina equipada", "Amueblado", "Estacionamiento", "Closets"],
    imagenes: [],
    asesorId: "efrain-pineda",
  },
];
