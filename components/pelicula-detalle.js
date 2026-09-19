"use client";

import { Card, Chip, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { imagen } from "@/lib/tmdb";

async function traerPelicula(id) {
  const res = await fetch(`/api/peliculas/${id}`);
  if (!res.ok) throw new Error("No se pudo cargar la película");
  return res.json();
}

export function PeliculaDetalle({ id }) {
  const { data: pelicula, isPending, isError, error } = useQuery({
    queryKey: ["pelicula", id],
    queryFn: () => traerPelicula(id),
  });

  if (isPending) {
    return (
      <div className="flex justify-center p-12">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <p className="p-6 text-sm text-danger">{error.message}</p>;
  }

  const anio = pelicula.release_date?.slice(0, 4);

  return (
    <Card className="w-full max-w-xl">
      <Card.Content className="flex flex-col gap-4 sm:flex-row">
        {pelicula.poster_path && (
          <img
            alt={`Póster de ${pelicula.title}`}
            className="w-28 shrink-0 self-start rounded-lg"
            src={imagen(pelicula.poster_path)}
          />
        )}

        <div className="flex flex-col gap-2">
          <Card.Header className="p-0">
            <Card.Title>
              {pelicula.title} {anio && <span className="text-muted">({anio})</span>}
            </Card.Title>
            {pelicula.tagline && <Card.Description>{pelicula.tagline}</Card.Description>}
          </Card.Header>

          <div className="flex flex-wrap gap-2">
            {pelicula.genres?.map((g) => (
              <Chip key={g.id} size="sm">
                {g.name}
              </Chip>
            ))}
          </div>

          <p className="text-sm text-muted">
            {pelicula.runtime ? `${pelicula.runtime} min` : "Duración desconocida"} ·{" "}
            {pelicula.vote_average?.toFixed(1)} ★ ({pelicula.vote_count} votos)
          </p>

          <p className="text-sm">{pelicula.overview || "Sin sinopsis en español."}</p>
        </div>
      </Card.Content>
    </Card>
  );
}
