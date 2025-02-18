import { auth } from "@/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { ApprovalButton } from "./_components/approval-button";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const admins = await db.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  if (!admins.find((admin) => admin.email === session.user?.email)) {
    redirect("/");
  }

  const vendors = await db.vendor.findMany({});

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {vendors.length === 0 ? (
        <p className="text-center text-gray-500">No vendors available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {vendor.shopName}
                </h2>
                <p className="text-gray-600">{vendor.vendorStatus}</p>
              </div>
              <p className="text-gray-600">Owner: {vendor.name}</p>
              <p className="text-gray-600">Phone: {vendor.phone}</p>
              <p className="text-gray-600">Email: {vendor.email}</p>
              <p className="text-gray-600">Address: {vendor.address}</p>

              <div className="mt-4 space-x-2">
                <a
                  href={vendor.fssai_url}
                  target="_blank"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View FSSAI
                </a>
                <a
                  href={vendor.gst_url}
                  target="_blank"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  View GST
                </a>
                <a
                  href={vendor.price_menu_url}
                  target="_blank"
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                  View Price Menu
                </a>
              </div>
              <div className="mt-4">
                <ApprovalButton id={vendor.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
