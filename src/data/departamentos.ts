import type { Departamento } from "@/types/departamento";

/**
 * Fuente de datos actual: array en memoria.
 * Fase 2 (Node.js + Prisma): esta constante se sustituye por
 * `await prisma.departamento.findMany()` — ningún componente que
 * consuma `departamentos` necesita cambiar, porque el shape es idéntico.
 */
export const departamentos: Departamento[] = [
  {
    id: "m70221x",
    slug: "departamento-m70221x-azul-peninsula",
    titulo: "Departamento en planta baja",
    estatus: "disponible",
    operacion: "renta",
    precio: 12000,
    recamaras: 2,
    m2: 65,
    piso: 0,
    amenidades: ["Planta baja", "Cocina", "Estacionamiento", "Amueblado"],
    imagenes: [
      "/img/departamentos/m70221x/01.jpeg",
      "/img/departamentos/m70221x/02.jpeg",
      "/img/departamentos/m70221x/03.jpeg",
      "/img/departamentos/m70221x/04.jpeg",
      "/img/departamentos/m70221x/05.jpeg",
      "/img/departamentos/m70221x/06.jpeg",
      "/img/departamentos/m70221x/07.jpeg",
      "/img/departamentos/m70221x/08.jpeg",
      "/img/departamentos/m70221x/09.jpeg",
      "/img/departamentos/m70221x/10.jpeg",
      "/img/departamentos/m70221x/11.jpeg",
      "/img/departamentos/m70221x/12.jpeg",
    ],
    asesorId: "delgado-gaby",
  },
  {
    id: "depto-m4",
    slug: "departamento-m4-azul-peninsula",
    titulo: "Departamento M4",
    estatus: "disponible",
    operacion: "renta",
    precio: 9500,
    recamaras: 2,
    m2: 59,
    piso: 0,
    amenidades: ["A/C", "Cocina equipada", "Estacionamiento", "Patio"],
    // Único departamento con foto real por ahora. El carrusel soporta hasta
    // 5; el resto de arrays queda vacío hasta tener las fotos de cada uno.
    imagenes: ["/img/departamentos/depto-m4_2.jpg"],
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
    piso: 1,
    amenidades: ["A/C", "Cocina equipada", "Amueblado", "Estacionamiento", "Closets"],
    imagenes: [],
    asesorId: "efrain-pineda",
  },
];
