import Link from "next/link";
import { imagen } from "@/lib/tmdb";


export function GridPeliculas({ peliculas }) {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {peliculas.map((p) => (
        <li key={p.id}>
          <Link className="flex flex-col gap-1" href={`/peliculas/${p.id}`}>
            {p.poster_path ? (
              <img
                alt={`Póster de ${p.title}`}
                className="aspect-[2/3] w-full rounded-lg object-cover"
                src={imagen(p.poster_path, "w342")}
              />
            ) : (
              <div className="aspect-[2/3] w-full rounded-lg bg-default" />
            )}
            <span className="line-clamp-2 text-xs">{p.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
