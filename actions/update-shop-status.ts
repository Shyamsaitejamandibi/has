"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export const updateShopStatus = async (
  id: string,
  status: "OPEN" | "CLOSED"
) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }
  try {
    await db.vendor.update({
      where: {
        id,
      },
      data: {
        shopStatus: status,
      },
    });
  } catch {
    return {
      error: "Failed to update shop status",
    };
  }
};
