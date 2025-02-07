import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
// import student from "@/actions/student";

const vendors = [
  {
    id: 1,
    shopName: "Vendor 1",
    status: "Accepted",
  },
  {
    id: 2,
    shopName: "Vendor 2",
    status: "Pending",
  },
  {
    id: 3,
    shopName: "Vendor 3",
    status: "Open",
  },
  {
    id: 4,
    shopName: "Vendor 4",
    status: "Closed",
  },
];

const StudentDashboard = async () => {
  // const vendors = await student();

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Vendors</h1>
          <p className="text-muted-foreground">
            Check the status of campus vendors
          </p>
        </div>
        <div className="grid gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {vendor.shopName}
                </CardTitle>
                <StatusBadge
                  status={
                    vendor.status.toLowerCase() as
                      | "pending"
                      | "reviewing"
                      | "accepted"
                      | "rejected"
                      | "open"
                      | "closed"
                  }
                />
              </CardHeader>
              <CardContent>
                {/* vendor description */}
                <div className="text-muted-foreground">
                  <p>Hello how are you </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
