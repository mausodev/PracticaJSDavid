/** POST con JSON; lanza el mensaje de error que devuelve la API. */
export async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const datos = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(datos.error ?? "Algo salió mal");
  return datos;
}
