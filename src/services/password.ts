import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Password {
  // Hashing the password
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const hash = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${hash.toString("hex")}.${salt}`;
  }

  // Comparing the hashed password with the plain text password
  static async compare(storedPassword: string, plainTextPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const hash = (await asyncScrypt(plainTextPassword, salt, 64)) as Buffer;
    return hash.toString("hex") === hashedPassword;
  }
}
