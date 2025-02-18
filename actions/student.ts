import db from "@/lib/db";

export const student = async () => {
  const vendors = db.vendor.findMany({
    where: {
      vendorStatus: "APPROVED",
    },
    select: {
      shopName: true,
      shopStatus: true,
    },
  });

  return vendors;
};
