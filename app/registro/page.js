"use client";

import { Button, Description, Form, Input, Label, TextField } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postJson } from "@/lib/api";

export default function Registro() {
  const router = useRouter();

  const registro = useMutation({
    mutationFn: (datos) => postJson("/api/auth/registro", datos),
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    registro.mutate(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Form className="flex w-full max-w-sm flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Crear cuenta</h1>

        {/* Las mismas reglas que valida zod en el endpoint. */}
        <TextField isRequired maxLength={20} minLength={3} name="user">
          <Label>Usuario</Label>
          <Input className="w-full" placeholder="david" />
          <Description>Entre 3 y 20 caracteres</Description>
        </TextField>

        <TextField isRequired maxLength={22} minLength={8} name="password" type="password">
          <Label>Contraseña</Label>
          <Input className="w-full" placeholder="••••••••" />
          <Description>Mínimo 8 caracteres</Description>
        </TextField>

        {registro.isError && (
          <p className="text-sm text-danger">{registro.error.message}</p>
        )}

        <Button type="submit" isPending={registro.isPending}>
          Registrarme
        </Button>

        <p className="text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link className="underline" href="/login">
            Inicia sesión
          </Link>
        </p>
      </Form>
    </main>
  );
}
