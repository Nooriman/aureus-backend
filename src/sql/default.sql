INSERT INTO "Role" (name)
VALUES 
  ('admin'),
  ('user')
ON CONFLICT (name) DO NOTHING;

INSERT INTO "Profile" (
  "id",
  "firstName",
  "lastName",
  "email",
  "password",
  "createdAt",
  "roleId"
) VALUES (
  gen_random_uuid(),
  'Admin',
  'User',
  'admin@admin.com',
  '$2b$10$qKwUlH/N0pL.kHdEx6EGqOrU5QfsZfnwGuWsvXpkA5RbRMQThh1ne',
  NOW(),
  1
);
