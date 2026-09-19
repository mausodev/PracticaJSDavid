import { DiarioPelicula } from "@/components/diario-pelicula";
import { NuevaEntrada } from "@/components/nueva-entrada";
import { PeliculaDetalle } from "@/components/pelicula-detalle";
import { PeliculasSimilares } from "@/components/peliculas-similares";
import { sesionActual } from "@/lib/sesion";

export default async function PaginaPelicula({ params }) {
  const { id } = await params;
  const sesion = await sesionActual();

  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-6">
      <PeliculaDetalle id={id} />
      <div className="flex w-full max-w-xl flex-col items-start gap-4">
        {sesion && <NuevaEntrada id={id} />}
        <DiarioPelicula tmdbId={Number(id)} usuarioActual={sesion?.user ?? null} />
      </div>
      <PeliculasSimilares id={id} />
    </main>
  );
}
