"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";

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
    const fssai = formData.get("fssai") as File;
    const gst = formData.get("gst") as File;
    const price_menu = formData.get("price_menu") as File;

    const { url: fssai_url } = await put(
      `${session.user?.email}/${fssai.name}`,
      fssai,
      {
        access: "public",
      }
    );

    const { url: gst_url } = await put(
      `${session.user?.email}/${gst.name}`,
      gst,
      {
        access: "public",
      }
    );

    const { url: price_menu_url } = await put(
      `${session.user?.email}/${price_menu.name}`,
      price_menu,
      {
        access: "public",
      }
    );

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
    // Handle error (e.g., redirect to an error page or return an error message)
    return {
      error: "Failed to create vendor",
    };
  }
};
