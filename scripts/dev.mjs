import { spawn } from "node:child_process";
import open, { apps } from "open";

// Cambia esto por el navegador que prefieras. Opciones disponibles:
// apps.chrome, apps.firefox, apps.edge, apps.browser (predeterminado
// del sistema, macOS: también apps.safari).
const NAVEGADOR_PREFERIDO = apps.chrome;

const PUERTO = process.env.PORT ?? "3000";
const URL = `http://localhost:${PUERTO}`;

const proceso = spawn("next", ["dev"], {
  stdio: ["inherit", "pipe", "inherit"],
  shell: true,
});

let yaAbierto = false;

proceso.stdout.on("data", (chunk) => {
  const texto = chunk.toString();
  process.stdout.write(texto);

  // Next.js imprime "Ready in Xms" cuando el servidor ya puede recibir
  // peticiones. Esperamos esa señal en vez de un setTimeout arbitrario,
  // para no abrir el navegador antes de que el servidor esté listo (o
  // hacerlo tarde de más si la máquina va lenta).
  if (!yaAbierto && /Ready in/i.test(texto)) {
    yaAbierto = true;
    open(URL, { app: { name: NAVEGADOR_PREFERIDO } }).catch(() => {
      // Si ese navegador no está instalado en esta máquina, cae al
      // predeterminado del sistema en vez de fallar en silencio.
      open(URL);
    });
  }
});

proceso.on("exit", (code) => process.exit(code ?? 0));
