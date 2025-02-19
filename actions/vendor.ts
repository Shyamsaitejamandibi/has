"use server";

import { auth } from "@/app/(auth)/auth";
import db from "@/lib/db";

export const createVendor = async (state: any, formData: FormData) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const name = formData.get("name") as string;
    const shopName = formData.get("shopName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const fssai_url = formData.get("fssai_url") as string;
    const gst_url = formData.get("gst_url") as string;
    const price_menu_url = formData.get("price_menu_url") as string;

    await db.$transaction(async (prisma) => {
      // Update user role to VENDOR
      const user = await prisma.user.update({
        where: {
          email: session.user?.email!,
        },
        data: {
          role: "VENDOR",
        },
      });

      // Create new vendor
      const newVendor = await prisma.vendor.create({
        data: {
          id: user.id,
          name,
          shopName,
          phone,
          address,
          email: user.email!,
          fssai_url,
          gst_url,
          price_menu_url,
        },
      });
      console.log("New vendor created:", newVendor);
    });

    return {
      success: "Vendor created successfully",
    };
  } catch (error) {
    console.error("Error creating vendor:", error);
    return {
      error: "Failed to create vendor",
    };
  }
};
