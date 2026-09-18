"use client";

import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { postJson } from "@/lib/api";

export default function Login() {
  const router = useRouter();

  const login = useMutation({
    mutationFn: (datos) => postJson("/api/auth/login", datos),
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    login.mutate(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Form className="flex w-full max-w-sm flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Iniciar sesión</h1>

        <TextField isRequired name="user">
          <Label>Usuario</Label>
          <Input className="w-full" placeholder="david" />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label>Contraseña</Label>
          <Input className="w-full" placeholder="••••••••" />
        </TextField>

        {login.isError && (
          <p className="text-sm text-danger">{login.error.message}</p>
        )}

        <Button type="submit" isPending={login.isPending}>
          Entrar
        </Button>

        <p className="text-sm text-muted">
          ¿No tienes cuenta?{" "}
          <Link className="underline" href="/registro">
            Regístrate
          </Link>
        </p>
      </Form>
    </main>
  );
}
