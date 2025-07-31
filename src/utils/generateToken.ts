import jwt, { Secret } from "jsonwebtoken";
import { Profile } from "../../generated/prisma";

const { JWT_SECRET_KEY, JWT_EXPIRE_MIN, JWT_EXPIRE_HR } = process.env;

const generateToken = (profile: Profile) => {
  if (!JWT_SECRET_KEY || !JWT_EXPIRE_MIN || !JWT_EXPIRE_HR)
    throw new Error("Missing JWT_KEY");

  const jwtSecret: Secret = JWT_SECRET_KEY;

  const payload = {
    id: profile.id,
    role: profile.roleId,
  };

  const accessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: Number(JWT_EXPIRE_MIN) * 60, // 15 mins
  });

  const refreshToken = jwt.sign(payload, jwtSecret, {
    expiresIn: Number(JWT_EXPIRE_HR) * 60 * 60, // 8 hours
  });

  return { accessToken, refreshToken };
};

export default generateToken;
