"use client";

import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function CerrarSesion() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const salir = useMutation({
    mutationFn: () => fetch("/api/auth/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
      router.refresh();
    },
  });

  return (
    <Button
      isPending={salir.isPending}
      size="sm"
      variant="secondary"
      onPress={() => salir.mutate()}
    >
      Cerrar sesión
    </Button>
  );
}
