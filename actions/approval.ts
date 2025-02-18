"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const approval = async (
  id: string,
  status: "APPROVED" | "REJECTED" | "REVIEWING"
) => {
  try {
    await db.vendor.update({
      where: {
        id,
      },
      data: {
        vendorStatus: status,
      },
    });
    revalidatePath("/admin");
  } catch {
    return {
      error: "Failed to update vendor status",
    };
  }
};
