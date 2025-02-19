import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import db from "@/lib/db";
import NewVendorForm from "@/components/new-vendor-form";

export default async function VendorDashboard() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const existingVendor = await db.user.findFirst({
    where: {
      email: session.user?.email!,
      role: "VENDOR",
    },
  });

  if (existingVendor) {
    redirect(`/vendor/${existingVendor.id}`);
  }

  return <NewVendorForm />;
}
