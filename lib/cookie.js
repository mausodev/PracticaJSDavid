export const COOKIE_SESION = "token";

export const opcionesCookie = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
