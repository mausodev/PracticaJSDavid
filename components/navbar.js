import Link from "next/link";
import { sesionActual } from "@/lib/sesion";
import { CerrarSesion } from "./cerrar-sesion";

export async function Navbar() {
  const sesion = await sesionActual();

  return (
    <header className="flex items-center justify-between bg-foreground px-6 py-3 text-background">
      <Link className="font-semibold" href="/">
        Pelis APP
      </Link>

      <nav className="flex items-center gap-3 text-sm">
        {sesion ? (
          <>
            <span className="opacity-80">{sesion.user}</span>
            <CerrarSesion />
          </>
        ) : (
          <>
            <Link className="underline" href="/login">
              Iniciar sesión
            </Link>
            <Link className="underline" href="/registro">
              Registrarme
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
