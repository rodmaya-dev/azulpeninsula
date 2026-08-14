# Azul Península — Next.js

Sitio web del fraccionamiento Azul Península (Puerto Vallarta, Jalisco).
Migración completa desde HTML/CSS/JS vanilla a **Next.js 16 (App Router) +
TypeScript + Tailwind**, con formulario de contacto funcional, catálogo de
departamentos indexable por Google, y una capa de SEO de marca completa.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** estricto (`strict`, `noUncheckedIndexedAccess`)
- **Tailwind CSS** — tokens de marca (colores, tipografía) portados 1:1 del sitio original
- **Zod** — validación de formularios, compartida entre cliente y servidor
- **Resend** — envío de correo del formulario de contacto
- **Framer Motion** — animaciones de entrada al hacer scroll
- **ESLint 9** (flat config) + Prettier

## Cómo correrlo

Requiere **Node.js ≥ 20.9**.

```bash
npm install
npm run dev
```

`npm run dev` levanta el servidor **y abre automáticamente tu navegador
preferido** en `http://localhost:3000` en cuanto está listo (configurable
en `scripts/dev.mjs` — busca `NAVEGADOR_PREFERIDO`). Si prefieres el
comportamiento normal sin apertura automática, usa `npm run dev:plain`.

### Variables de entorno

Copia el contenido de `.env.example` a un archivo nuevo `.env.local` (este
último nunca se sube a git) y rellena tus valores reales:
