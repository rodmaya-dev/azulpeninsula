import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { departamentos } from "@/data/departamentos";
import { asesores } from "@/data/asesores";
import { Carousel } from "@/components/departamentos/Carousel";
import { formatPrecio, ESTATUS_LABEL, OPERACION_LABEL } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getDepartamento(slug: string) {
  return departamentos.find((d) => d.slug === slug);
}

// Genera las páginas estáticas de cada departamento en build time — cada
// una con su propia URL indexable, que es justo lo que hoy no existe
// (todo vivía como cards dentro de una sola página).
export function generateStaticParams() {
  return departamentos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const depto = getDepartamento(slug);
  if (!depto) return {};

  const titulo = `${depto.titulo} en ${OPERACION_LABEL[depto.operacion].toLowerCase()} — Azul Península`;
  const descripcion =
    depto.descripcion ??
    `${depto.titulo}: ${depto.recamaras} recámaras, ${depto.m2} m², en ${OPERACION_LABEL[
      depto.operacion
    ].toLowerCase()} dentro de Azul Península, Puerto Vallarta.`;

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      images: depto.imagenes[0] ? [depto.imagenes[0]] : undefined,
    },
  };
}

export default async function DepartamentoDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const depto = getDepartamento(slug);
  if (!depto) notFound();

  const asesor = asesores.find((a) => a.id === depto.asesorId);
  const disponible = depto.estatus === "disponible";

  // JSON-LD: le dice a Google explícitamente que esto es una publicación
  // inmobiliaria (precio, operación, disponibilidad) y no solo texto
  // suelto — es lo que habilita que aparezca en búsquedas locales.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: depto.titulo,
    description:
      depto.descripcion ??
      `${depto.titulo} en ${OPERACION_LABEL[depto.operacion].toLowerCase()} en Azul Península, Puerto Vallarta.`,
    url: `${siteConfig.url}/departamentos/${depto.slug}`,
    image: depto.imagenes,
    about: {
      "@type": "Apartment",
      name: depto.titulo,
      numberOfRooms: depto.recamaras,
      floorSize: {
        "@type": "QuantitativeValue",
        value: depto.m2,
        unitCode: "MTK",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puerto Vallarta",
        addressRegion: "Jalisco",
        addressCountry: "MX",
      },
    },
    offers: {
      "@type": "Offer",
      price: depto.precio,
      priceCurrency: "MXN",
      businessFunction:
        depto.operacion === "renta"
          ? "http://purl.org/goodrelations/v1#LeaseOut"
          : "http://purl.org/goodrelations/v1#Sell",
      availability: disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  };

  return (
    <section className="px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-container">
        <Link
          href="/departamentos"
          className="text-sm text-azul-accent hover:underline"
        >
          ← Volver a Departamentos
        </Link>

        <div className="mt-4 grid gap-10 lg:grid-cols-2">
          <Carousel imagenes={depto.imagenes} alt={depto.titulo} />

          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-azul-deep px-2.5 py-1 text-xs font-medium text-white">
                {OPERACION_LABEL[depto.operacion]}
              </span>
              {!disponible && (
                <span className="rounded bg-sand-light px-2.5 py-1 text-xs font-medium text-text-mid">
                  {ESTATUS_LABEL[depto.estatus]}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-3xl text-azul-mid md:text-4xl">
              {depto.titulo}
            </h1>

            <p className="mt-2 text-2xl font-medium text-text-dark">
              {formatPrecio(depto.precio)}
              {depto.operacion === "renta" && (
                <span className="text-base font-normal text-text-light">
                  {" "}
                  /mes
                </span>
              )}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-black/5 py-4 text-center">
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-light">
                  Recámaras
                </dt>
                <dd className="mt-1 font-medium text-text-dark">
                  {depto.recamaras}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-light">
                  m²
                </dt>
                <dd className="mt-1 font-medium text-text-dark">{depto.m2}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-text-light">
                  Piso
                </dt>
                <dd className="mt-1 font-medium text-text-dark">
                  {depto.piso}
                </dd>
              </div>
            </dl>

            {depto.descripcion && (
              <p className="mt-6 text-text-mid">{depto.descripcion}</p>
            )}

            {depto.amenidades.length > 0 && (
              <>
                <h2 className="mt-6 text-xs font-medium uppercase tracking-wide text-text-light">
                  Amenidades
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {depto.amenidades.map((a) => (
                    <li
                      key={a}
                      className="rounded-full bg-sand-light px-3 py-1 text-sm text-text-dark"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {asesor && disponible && (
              <div className="mt-8 rounded-lg border border-black/5 p-5">
                <p className="text-xs uppercase tracking-wide text-text-light">
                  Contacta al asesor
                </p>
                <p className="mt-1 font-medium text-text-dark">
                  {asesor.nombre}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${asesor.telefono}?text=${encodeURIComponent(
                      `Hola, me interesa el ${depto.titulo} de Azul Península.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-azul-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azul-mid"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${asesor.email}`}
                    className="rounded border border-azul-mid/20 px-5 py-2.5 text-sm font-medium text-azul-mid transition-colors hover:bg-sand-light"
                  >
                    Enviar correo
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}