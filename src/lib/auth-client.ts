import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "@/lib/auth";

// El import de `auth` es solo de tipo: no lleva código de servidor al navegador.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});