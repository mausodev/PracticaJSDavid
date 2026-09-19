"use client";

import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { GridPeliculas } from "./grid-peliculas";

async function traerPopulares() {
  const res = await fetch("/api/peliculas/populares");
  if (!res.ok) throw new Error("No se pudieron cargar las populares");
  return res.json();
}

export function PeliculasPopulares({ limite = 12 }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["populares"],
    queryFn: traerPopulares,
  });

  if (isPending) {
    return (
      <div className="flex justify-center p-6">
        <Spinner />
      </div>
    );
  }

  if (isError) return <p className="text-sm text-danger">{error.message}</p>;

  return (
    <section className="flex w-full flex-col gap-3">
      <h2 className="text-sm font-semibold text-muted">Populares ahora</h2>
      <GridPeliculas peliculas={data.results.slice(0, limite)} />
    </section>
  );
}
