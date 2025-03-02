import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { RaiseComplaintDialog } from "./_components/raise-complaint";
import { student } from "@/lib/db/queries";

const StudentDashboard = async () => {
  const vendors = await student();
  return (
    <div className="container py-8 animate-fadeIn">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-3">Campus Vendors</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Check the status of your favorite campus vendors in real time.
        </p>
      </div>
      <div className="grid gap-6 px-10">
        {vendors.map((vendor, i) => (
          <Card
            key={i}
            className="p-4 shadow-lg max-w-96 hover:shadow-xl transition duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xl font-semibold text-gray-900">
                {vendor.shopName}
              </CardTitle>
              <StatusBadge status={vendor.shopStatus} />
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                More details about the vendor can be displayed here.
              </p>
              <RaiseComplaintDialog
                vendorShopname={vendor.shopName}
                vendorId={vendor.id}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
