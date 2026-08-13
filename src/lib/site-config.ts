/**
 * Fuente única de verdad para los datos del fraccionamiento que se repiten
 * en metadata, JSON-LD, sitemap y el footer. Igual que evitarías tener el
 * mismo VARCHAR hardcodeado en 5 procedimientos distintos en PL/SQL: un
 * solo lugar que cambiar el día que haya dominio propio o cambie el CP.
 */
export const siteConfig = {
  name: "Azul Península",
  // Sin dominio propio todavía — el sitio vive en Vercel. El día que haya
  // dominio, esta es la ÚNICA línea que cambia (más la config de redirect
  // 301 en Vercel, eso ya es infraestructura, no código).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azulpeninsula.vercel.app",
  description:
    "Fraccionamiento Azul Península en Puerto Vallarta, Jalisco. Departamentos en renta y venta, administración transparente y atención directa con asesores.",

  // Versión limpia con + → se usa en JSON-LD y en tel:
  telefono: "+523224580603",
  
  // Solo dígitos → se usa para WhatsApp
  telefonoWhatsApp: "523224580603",
  
  // Versión legible → se muestra al usuario
  telefonoDisplay: "+52 (322) 458-0603",

  email: "direccion.azul@outlook.com",

  address: {
    streetAddress: "Av. Laurel Real SN",
    addressLocality: "Puerto Vallarta",
    addressRegion: "Jalisco",
    postalCode: "48280",
    addressCountry: "MX",
  },
} as const;