"use client";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postJson } from "@/lib/api";

const hoy = () => new Date().toISOString().slice(0, 10);

export function NuevaEntrada({ id, user }) {
  const [abierto, setAbierto] = useState(false);
  const queryClient = useQueryClient();

  // Misma queryKey que el detalle: sale de la caché, no repite el fetch.
  const { data: pelicula } = useQuery({
    queryKey: ["pelicula", id],
    queryFn: async () => (await fetch(`/api/peliculas/${id}`)).json(),
  });

  const crear = useMutation({
    mutationFn: (datos) => postJson("/api/diario", datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diario", user, Number(id)] });
      setAbierto(false);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));

    crear.mutate({
      tmdbId: Number(id),
      title: pelicula.title,
      posterPath: pelicula.poster_path,
      year: pelicula.release_date ? Number(pelicula.release_date.slice(0, 4)) : null,
      watchedDate: form.watchedDate,
      rating: form.rating ? Number(form.rating) : null,
      review: form.review || null,
      rewatch: form.rewatch === "on",
    });
  };

  return (
    <>
      <Button isDisabled={!pelicula} size="sm" onPress={() => setAbierto(true)}>
        Registrar visionado
      </Button>

      <Modal.Backdrop isOpen={abierto} onOpenChange={setAbierto}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{pelicula?.title}</Modal.Heading>
            </Modal.Header>

            <Form onSubmit={onSubmit}>
              <Modal.Body className="flex flex-col gap-4">
                <TextField isRequired defaultValue={hoy()} name="watchedDate" type="date">
                  <Label>¿Cuándo la viste?</Label>
                  <Input className="w-full" max={hoy()} />
                </TextField>

                <TextField name="rating" type="number">
                  <Label>Calificación</Label>
                  <Input className="w-full" max="5" min="0.5" placeholder="4.5" step="0.5" />
                </TextField>

                <TextField name="review">
                  <Label>Reseña</Label>
                  <TextArea className="w-full" placeholder="Opcional" rows={3} />
                </TextField>

                <Checkbox name="rewatch">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    Ya la había visto antes
                  </Checkbox.Content>
                </Checkbox>

                {crear.isError && <p className="text-sm text-danger">{crear.error.message}</p>}
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancelar
                </Button>
                <Button isPending={crear.isPending} type="submit">
                  Guardar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
