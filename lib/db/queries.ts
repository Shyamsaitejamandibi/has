import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import db from "../db";
import { User } from "@prisma/client";

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.user.findMany({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db.user.create({
      data: {
        email,
        password: hash,
      },
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}
