# Azul Península — Next.js

Migración del sitio de Azul Península (antes HTML + CSS + JS vanilla) a
Next.js 15 (App Router) + TypeScript + Tailwind. Este es el **andamiaje base
+ modelo de datos** — el primer paso del roadmap.

## Cómo correrlo

Necesitas **Node.js ≥ 20.9** (requisito de Next.js 16 — revisa con `node -v`).

```bash
npm install
npm run dev
```

> Nota (ago 2026): el proyecto corre sobre Next.js 16.3 (LTS activo) y
> React 19.2. Si vienes de una instalación anterior con Next 14, borra
> `node_modules` y `package-lock.json` antes de `npm install` para evitar
> versiones mezcladas.

Abre http://localhost:3000. El botón ES/EN en el navbar ya funciona
(mismo mecanismo de `localStorage` que tenías, ahora vía Context de React).

## Qué incluye este paso

- **Configuración base**: `next.config.mjs`, `tsconfig.json` (strict +
  `noUncheckedIndexedAccess`), Tailwind, ESLint, Prettier.
- **Identidad visual portada 1:1**: los mismos tokens de color/tipografía
  que tenías en `css/styles.css` viven ahora en `src/app/globals.css`, y
  Tailwind solo los referencia (`tailwind.config.ts`). Cormorant Garamond +
  DM Sans se cargan con `next/font/google` en vez del `@import` a Google
  Fonts — evita una petición externa y elimina el parpadeo de fuente.
- **i18n**: `src/lib/i18n/` — mismo diccionario ES/EN que tenías en
  `main.js`, ahora vía Context + hook `useTranslations()`. Se mantiene
  `localStorage` por ahora (ver comentario en `I18nProvider.tsx` sobre por
  qué no usamos `next-intl` con rutas `/es /en` todavía: eso lo resolvemos
  junto con el trabajo de SEO de Departamentos, para no tocar el layout dos
  veces).
- **Layout**: `Navbar` (con menú móvil) y `Footer`, con datos reales de
  contacto portados de `components/footer.html`.
- **Modelo de datos tipado** (`src/types/`, `src/data/`):
  - `Ente` — los 4 entes de "Nosotros" con `funciones` para el modal (ver
    roadmap paso 3) y sus miembros reales.
  - `Departamento` — pensado para convertirse casi sin cambios en un
    `model` de Prisma cuando lleguemos a Node.js/Postgres. `asesorId` ya es
    la FK que hará posible que cada asesor suba solo sus propias fotos.
  - `Asesor` — sujeto de esa relación.
  - Todos los arrays de datos están comentados explicando su equivalente
    en PL/SQL y su futuro reemplazo por consultas Prisma.

## Qué NO incluye todavía (siguientes pasos del roadmap)

1. Página "Nosotros" con el organigrama clicable + modales de funciones
2. Página "Departamentos" con carrusel (hasta 5 imágenes) + rutas
   `/departamentos/[slug]` + JSON-LD para SEO
3. Formulario de contacto con Resend + validación con Zod
4. Animaciones (Framer Motion) y hero con imagen de fondo

## Nota de seguridad (ago 2026)

Next.js 14 llegó a su End-of-Life en octubre 2025 — dejó de recibir
parches. El proyecto se actualizó a Next.js 16.3 (LTS activo) + React 19.2,
y el lint pasó al flat config de ESLint 9 (`eslint.config.mjs`), ya que
`next lint` se eliminó en Next 16. Revisa `eslint.config.mjs` en vez de
`.eslintrc.json` si necesitas ajustar reglas.

## Variables de entorno

Copia `.env.example` a `.env.local`. Las variables de Resend y base de
datos están comentadas — se activan en sus respectivos pasos.
