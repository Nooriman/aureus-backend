import bcrypt from "bcrypt";

const ROUNDS = 10;

export async function hashPassword(plainText: string) {
  return await bcrypt.hash(plainText, ROUNDS);
}

export async function comparePassword(plainText: string, hash: string) {
  return await bcrypt.compare(plainText, hash);
}
