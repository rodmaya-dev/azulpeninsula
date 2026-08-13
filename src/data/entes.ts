import type { Ente } from "@/types/ente";

export const entes: Ente[] = [
  {
    id: "asamblea",
    nombre: "Asamblea de Propietarios",
    descripcion:
      "El órgano máximo de decisión del fraccionamiento, integrado por todos los propietarios.",
    funciones: [
      "Aprobar el presupuesto anual y las cuotas de mantenimiento",
      "Elegir y remover a los miembros del Consejo de Vigilancia",      
      "Autorizar obras y gastos especiales",
      "Aprobar modificaciones al reglamento interno",
    ],
    miembros: [],
  },
  {
    id: "directors",
    nombre: "Mesa Directiva",
    descripcion:
      "Representa legalmente a la comunidad y ejecuta los acuerdos de la Asamblea.",
    funciones: [
      "Administrar los recursos y el patrimonio común",
      "Representar legalmente al fraccionamiento",
      "Supervisar al equipo operativo y a proveedores",
      "Rendir cuentas a la Asamblea de Propietarios",
    ],
    miembros: [
      { id: "rodrigo-maya", nombre: "Ing. Rodrigo Maya", cargo: "Presidente" },
      { id: "victoria-vazquez", nombre: "Ing. Victoria Vázquez", cargo: "Tesorera" },
      { id: "maritza-castellon", nombre: "Lic. Maritza Castellón", cargo: "Secretaria" },
    ],
  },
  {
    id: "council",
    nombre: "Consejo de Vigilancia",
    descripcion:
      "Supervisa la gestión de la Mesa Directiva y vela por la transparencia del fraccionamiento.",
    funciones: [
      "Revisar el manejo de los recursos económicos",
      "Vigilar el cumplimiento del reglamento interno",
      "Presentar informes de supervisión a la Asamblea",
      "Atender inconformidades de los residentes de su manzana",
    ],
    miembros: [
      { id: "erick-gomez", nombre: "C. Erick Gómez", cargo: "Manzana 4" },
      { id: "beatriz-gomez", nombre: "C. Beatriz Gómez", cargo: "Manzana 5" },
      { id: "nestor-garcia", nombre: "Arq. Néstor García", cargo: "Manzana 6" },
      { id: "hossana-romero", nombre: "Lic. Hossana Romero", cargo: "Manzana 7" },
      { id: "guadalupe-gonzalez", nombre: "C. Guadalupe González", cargo: "Manzana 8" },
      { id: "oliver-rodriguez", nombre: "Lic. Oliver Rodríguez", cargo: "Manzana 9" },
    ],
  },
  {
    id: "management",
    nombre: "Gerencia Operativa",
    descripcion:
      "Equipo encargado de la operación diaria: mantenimiento, seguridad y atención a residentes.",
    funciones: [
      "Coordinar el mantenimiento de áreas comunes",
      "Supervisar al personal de seguridad e intendencia",
      "Atender reportes y solicitudes de los residentes",
      "Ejecutar las decisiones operativas de la Mesa Directiva",
    ],
    miembros: [
      { id: "eddie-gutierrez", nombre: "Arq. Eddie Gutiérrez", cargo: "Gerente Operativo" },
      { id: "lizett-gastelum", nombre: "Lic. Lizett Gastelum", cargo: "Auxiliar de Administración" },
    ],
  },
];
