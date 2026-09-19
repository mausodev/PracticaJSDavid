"use client";

import { Button, Chip, Spinner } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const IconoBasura = () => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" strokeLinecap="round" />
  </svg>
);

const fecha = new Intl.DateTimeFormat("es-MX", { dateStyle: "long", timeZone: "UTC" });

async function traerEntradas(tmdbId) {
  const res = await fetch(`/api/diario?tmdbId=${tmdbId}`);
  if (!res.ok) throw new Error("No se pudieron cargar las críticas");
  return res.json();
}

export function DiarioPelicula({ tmdbId, usuarioActual }) {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["diario", tmdbId],
    queryFn: () => traerEntradas(tmdbId),
  });

  const borrar = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/diario/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diario", tmdbId] }),
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
      <h2 className="text-sm font-semibold text-muted">Críticas</h2>

      {data.entradas.length === 0 ? (
        <p className="text-sm text-muted">Nadie ha registrado esta película todavía.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {data.entradas.map((e) => (
            <li className="flex flex-col gap-1 rounded-xl bg-surface p-4" key={e.id}>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{e.user.user}</span>
                <span className="text-muted">{fecha.format(new Date(e.watchedDate))}</span>
                {e.rating && <span className="text-muted">{e.rating} ★</span>}
                {e.rewatch && <Chip size="sm">Revisionado</Chip>}

                {e.user.user === usuarioActual && (
                  <Button
                    isIconOnly
                    aria-label="Eliminar crítica"
                    className="ml-auto"
                    isPending={borrar.isPending && borrar.variables === e.id}
                    size="sm"
                    variant="danger"
                    onPress={() => borrar.mutate(e.id)}
                  >
                    <IconoBasura />
                  </Button>
                )}
              </div>
              {e.review && <p className="text-sm text-muted">{e.review}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
