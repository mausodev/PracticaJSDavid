import Link from "next/link";
import { Buscador } from "@/components/buscador";
import { PeliculasPopulares } from "@/components/peliculas-populares";
import { sesionActual } from "@/lib/sesion";

export default async function Home() {
  const sesion = await sesionActual();

  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-6">
      {sesion ? (
        <Buscador />
      ) : (
        <p className="w-full max-w-xl text-sm text-muted">
          <Link className="underline" href="/login">
            Inicia sesión
          </Link>{" "}
          para buscar películas.
        </p>
      )}

      {!sesion && (
        <div className="w-full max-w-xl">
          <PeliculasPopulares />
        </div>
      )}
    </main>
  );
}
