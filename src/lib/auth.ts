import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    // Alta solo por invitación: el registro público queda cerrado.
    disableSignUp: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
  },

  user: {
    additionalFields: {
      // input:false impide que alguien se asigne un rol al registrarse.
      role: {
        type: "string",
        required: false,
        defaultValue: "ASESOR",
        input: false,
      },
    },
  },

  // En serverless no hay memoria compartida entre instancias: los contadores
  // van a la tabla rate_limits.
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 60,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
    },
  },

  // Debe ser el último plugin: permite fijar cookies desde Server Actions.
  plugins: [nextCookies()],
});