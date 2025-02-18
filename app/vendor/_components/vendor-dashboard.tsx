import type { Vendor } from "@prisma/client";
import { UpdateShopStatus } from "./update-shop-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const VendorDashboard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Vendor Dashboard
            </CardTitle>
            <Badge
              variant={
                vendor.vendorStatus === "APPROVED" ? "outline" : "secondary"
              }
            >
              {vendor.vendorStatus}
            </Badge>
          </div>
          <CardDescription>
            Manage your vendor account and shop status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Vendor Information</h2>
              <p className="text-sm text-muted-foreground">
                Vendor ID: {vendor.id}
              </p>
            </div>
            <Separator />
            {vendor.vendorStatus === "APPROVED" ? (
              <UpdateShopStatus
                id={vendor.id}
                initialStatus={vendor.shopStatus}
              />
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-2">Review Status</h2>
                <p className="text-sm text-muted-foreground">
                  Your account is currently under review. We will notify you
                  once its approved.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
