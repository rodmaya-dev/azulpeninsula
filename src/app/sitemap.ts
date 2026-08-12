import type { MetadataRoute } from "next";
import { departamentos } from "@/data/departamentos";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutasEstaticas = ["", "/nosotros", "/departamentos", "/contacto", "/asesores"];

  const paginasEstaticas: MetadataRoute.Sitemap = rutasEstaticas.map((ruta) => ({
    url: `${siteConfig.url}${ruta}`,
    lastModified: new Date(),
  }));

  // Cada departamento entra al sitemap individualmente — es lo que le
  // permite a Google descubrir e indexar cada ficha por separado.
  const paginasDepartamentos: MetadataRoute.Sitemap = departamentos.map((d) => ({
    url: `${siteConfig.url}/departamentos/${d.slug}`,
    lastModified: new Date(),
  }));

  return [...paginasEstaticas, ...paginasDepartamentos];
}