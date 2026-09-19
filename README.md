# Pelis APP

Este proyecto se planteó en un inicio como algo tipo Letterboxd: una app donde las personas registran las películas que ven y las califican. Por cuestiones de tiempo terminó siendo una web-app donde podemos ver y dejar reviews de películas.

El proyecto cuenta con:

- Auth (login, registro y rutas protegidas)
- Películas en tendencia
- Recomendaciones de películas similares
- Altas y bajas de reviews de películas

La información de las películas se toma del servicio **TMDB**, al cual nos conectamos mediante API REST.

El proyecto está hecho en **Next.js con JavaScript**. Next.js es un framework full stack: cuenta con React en la parte del front y su propia tecnología en el back. Además utiliza una pequeña base de datos en **PostgreSQL** (aunque solo cuenta con 2 tablas).

## Cómo ejecutarlo

El único requisito para correr el proyecto es tener instalado **Docker** y **Docker Compose**. En caso de no tenerlo, se puede instalar aquí:

https://www.docker.com/products/docker-desktop/

Luego se deben poner los valores correctos de los secretos `TMDB_ACCESS_TOKEN` y `JWT_SECRET` en el archivo `docker-compose.yml` y guardar los cambios. Estos serán enviados por email.

Finalmente, para ejecutar el proyecto se debe abrir una terminal en la raíz del proyecto y ejecutar el comando:

```bash
docker compose up
```

Una vez aparezca lo siguiente:

![Terminal mostrando las migraciones aplicadas y el servidor listo](https://i.ibb.co/Rp53BhVD/Captura-de-pantalla-2026-09-19-a-la-s-3-12-28-p-m.png)

...el proyecto está listo, y solo hay que ir en el navegador a http://localhost:3000

> **Nota:** la primera vez que se ejecuta `docker compose up` puede tardar varios minutos en arrancar (dependiendo de la velocidad de internet y de la computadora).

Probado y funcionando correctamente en **Debian** y **macOS**.

## Imágenes del proyecto

Registro de un nuevo usuario:

![Pantalla de registro](https://i.ibb.co/kggcdk7c/brave-screenshot-localhost3.png)

Inicio, con el buscador y las películas populares:

![Inicio con buscador y películas populares](https://i.ibb.co/60zf4Bkw/brave-screenshot-localhost.png)

Detalle de una película, con sus críticas y las recomendaciones:

![Detalle de Interestelar con críticas y películas similares](https://i.ibb.co/5xvVnHXb/brave-screenshot-localhost2.png)
