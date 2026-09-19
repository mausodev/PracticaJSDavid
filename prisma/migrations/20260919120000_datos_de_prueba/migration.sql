-- Datos de prueba. Los hashes son bcrypt de "12345678".

INSERT INTO "Usuario" ("id", "user", "password", "createdAt") VALUES
  ('seed_user_david', 'david', '$2b$10$/6GRlEc88ZQxqbNwyowMtOA4/grpZGYL4QBBjEDqtaPKbsSwuci/i', NOW()),
  ('seed_user_pedro', 'pedro', '$2b$10$ocyDj3GlRAqQ4ezpW4BYoOBYaW9dES1G4FnFhT3b.nP/OEiukm2gi', NOW())
ON CONFLICT ("user") DO NOTHING;


INSERT INTO "Entrada" (
  "id", "tmdbId", "title", "posterPath", "year",
  "watchedDate", "rating", "review", "rewatch", "createdAt", "userId"
) VALUES
  (
    'seed_entrada_david', 157336, 'Interestelar', '/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg', 2014,
    DATE '2026-03-14', 5, 'La escena del planeta de las olas me sigue dejando sin aire. Cine de verdad.',
    false, NOW(), 'seed_user_david'
  ),
  (
    'seed_entrada_pedro', 157336, 'Interestelar', '/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg', 2014,
    DATE '2026-07-02', 4, 'Enorme en lo visual, aunque el tercer acto se me hace tramposo. Aun así la revería.',
    true, NOW(), 'seed_user_pedro'
  )
ON CONFLICT ("id") DO NOTHING;
