"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Envuelve cualquier sección para que aparezca con fade + deslizamiento
 * al entrar al viewport — reemplaza el IntersectionObserver manual del
 * sitio original con la misma idea, pero declarativo.
 *
 * `once: true` en viewport evita que la animación se repita cada vez que
 * el usuario sube y baja la página (se anima una sola vez, la primera).
 * `useReducedMotion` respeta la preferencia de accesibilidad del sistema
 * operativo — si la persona pidió menos movimiento, el contenido
 * simplemente aparece sin desplazamiento ni fade.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}