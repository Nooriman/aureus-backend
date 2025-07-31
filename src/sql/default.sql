INSERT INTO "Role" (name)
VALUES 
  ('admin'),
  ('user')
ON CONFLICT (name) DO NOTHING;
