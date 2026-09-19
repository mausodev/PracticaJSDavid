"use client";

import { Chip, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

const fecha = new Intl.DateTimeFormat("es-MX", { dateStyle: "long", timeZone: "UTC" });

async function traerDiario(user, tmdbId) {
  const res = await fetch(`/api/diario?user=${encodeURIComponent(user)}&tmdbId=${tmdbId}`);
  if (!res.ok) throw new Error("No se pudo cargar el diario");
  return res.json();
}

export function DiarioPelicula({ user, tmdbId }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["diario", user, tmdbId],
    queryFn: () => traerDiario(user, tmdbId),
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
    <section className="flex w-full max-w-xl flex-col gap-3">
      <h2 className="text-sm font-semibold text-muted">Tu diario</h2>

      {data.entradas.length === 0 ? (
        <p className="text-sm text-muted">Todavía no registras esta película.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {data.entradas.map((e) => (
            <li className="flex flex-col gap-1 rounded-xl bg-surface p-4" key={e.id}>
              <div className="flex items-center gap-2 text-sm">
                <span>{fecha.format(new Date(e.watchedDate))}</span>
                {e.rating && <span className="text-muted">{e.rating} ★</span>}
                {e.rewatch && <Chip size="sm">Revisionado</Chip>}
              </div>
              {e.review && <p className="text-sm text-muted">{e.review}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
