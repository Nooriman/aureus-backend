import jwt from "jsonwebtoken";

interface JWTPayload {
  id: number;
  role: number;
  iat?: number;
  exp?: number;
}

export const getUserFromToken = (token?: string): JWTPayload | null => {
  if (!token) return null;

  try {
    return jwt.verify(token, String(process.env.JWT_SECRET_KEY)) as JWTPayload;
  } catch (error: any) {
    return null;
  }
};
