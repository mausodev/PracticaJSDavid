"use client";

import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { GridPeliculas } from "./grid-peliculas";

async function traerSimilares(id) {
  const res = await fetch(`/api/peliculas/${id}/similares`);
  if (!res.ok) throw new Error("No se pudieron cargar las similares");
  return res.json();
}

export function PeliculasSimilares({ id, limite = 12 }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["similares", id],
    queryFn: () => traerSimilares(id),
  });

  if (isPending) {
    return (
      <div className="flex justify-center p-6">
        <Spinner />
      </div>
    );
  }

  if (isError) return <p className="text-sm text-danger">{error.message}</p>;

  const peliculas = data.results.slice(0, limite);
  if (!peliculas.length) return null;

  return (
    <section className="flex w-full max-w-xl flex-col gap-3">
      <h2 className="text-sm font-semibold text-muted">Películas similares</h2>
      <GridPeliculas peliculas={peliculas} />
    </section>
  );
}
