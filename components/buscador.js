"use client";

import { Button, Form, Input, Label, Spinner, TextField } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GridPeliculas } from "./grid-peliculas";
import { PeliculasPopulares } from "./peliculas-populares";

async function buscar(q) {
  const res = await fetch(`/api/peliculas?q=${encodeURIComponent(q)}`);
  if (res.status === 401) throw new Error("Inicia sesión para buscar películas");
  if (!res.ok) throw new Error("La búsqueda falló");
  return res.json();
}

export function Buscador() {
  const [q, setQ] = useState("");

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["busqueda", q],
    queryFn: () => buscar(q),
    enabled: q.length > 0,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setQ(new FormData(e.currentTarget).get("q").trim());
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Form className="flex flex-row items-end gap-2" onSubmit={onSubmit}>
        <TextField className="flex-1" name="q">
          <Label>Buscar película</Label>
          <Input className="w-full" placeholder="Crepúsculo, Matrix…" />
        </TextField>
        <Button type="submit">Buscar</Button>
      </Form>

      {isFetching && (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      )}

      {isError && <p className="text-sm text-danger">{error.message}</p>}

      {!q && !isFetching && <PeliculasPopulares />}

      {data &&
        !isFetching &&
        (data.results.length === 0 ? (
          <p className="text-sm text-muted">Sin resultados para «{q}».</p>
        ) : (
          <GridPeliculas peliculas={data.results} />
        ))}
    </div>
  );
}
