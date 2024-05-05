import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config.get<string>("privateKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, privateKey) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}