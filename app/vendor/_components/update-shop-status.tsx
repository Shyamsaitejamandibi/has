"use client";

import { useState } from "react";
import { updateShopStatus } from "@/actions/update-shop-status";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { ShopStatus } from "@prisma/client";

export const UpdateShopStatus = ({
  id,
  initialStatus,
}: {
  id: string;
  initialStatus: ShopStatus;
}) => {
  const [isOpen, setIsOpen] = useState(initialStatus === "OPEN");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    const newStatus = isOpen ? "CLOSED" : "OPEN";
    try {
      await updateShopStatus(id, newStatus);
      setIsOpen(!isOpen);
      toast("Shop status updated successfully");
    } catch {
      toast("Failed to update shop status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Shop Status</h2>
      <div className="flex items-center space-x-2">
        <Switch
          id="shop-status"
          checked={isOpen}
          onCheckedChange={handleUpdateStatus}
          disabled={isUpdating}
        />
        <Label htmlFor="shop-status">
          {isOpen ? "Open for Business" : "Closed"}
        </Label>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {isOpen
          ? "Your shop is currently open and accepting orders."
          : "Your shop is closed. Customers cannot place orders at this time."}
      </p>
    </div>
  );
};
