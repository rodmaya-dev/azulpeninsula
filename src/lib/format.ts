import type { EstatusDepartamento, TipoOperacion } from "@/types/departamento";

export function formatPrecio(precio: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(precio);
}

export const ESTATUS_LABEL: Record<EstatusDepartamento, string> = {
  disponible: "Disponible",
  rentado: "Rentado",
  vendido: "Vendido",
};

export const OPERACION_LABEL: Record<TipoOperacion, string> = {
  renta: "Renta",
  venta: "Venta",
};