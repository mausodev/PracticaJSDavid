"use client";

import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { imagen } from "@/lib/tmdb";

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

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {peliculas.map((p) => (
          <li key={p.id}>
            <Link className="flex flex-col gap-1" href={`/peliculas/${p.id}`}>
              {p.poster_path ? (
                <img
                  alt={`Póster de ${p.title}`}
                  className="aspect-[2/3] w-full rounded-lg object-cover"
                  src={imagen(p.poster_path, "w342")}
                />
              ) : (
                <div className="aspect-[2/3] w-full rounded-lg bg-default" />
              )}
              <span className="line-clamp-2 text-xs">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
