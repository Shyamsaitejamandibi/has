import { auth } from "@/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { VendorDashboard } from "../_components/vendor-dashboard";

export const VendorDashboardPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const vendor = await db.vendor.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return <VendorDashboard vendor={vendor} />;
};

export default VendorDashboardPage;
