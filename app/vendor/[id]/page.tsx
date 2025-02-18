import { auth } from "@/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { VendorDashboard } from "../_components/vendor-dashboard";

export default async function VendorDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const vendor = await db.vendor.findFirst({
    where: {
      id: param.id,
    },
  });

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return <VendorDashboard vendor={vendor} />;
}
