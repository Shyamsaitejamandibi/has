"use client";

import { createVendor } from "@/actions/vendor";
import { useActionState, useEffect } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

export default function MyForm() {
  const [state, formAction, isPending] = useActionState(createVendor, {
    error: undefined,
    success: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <fieldset disabled={isPending} className="space-y-3">
        <legend className="text-lg font-semibold">Vendor Details</legend>

        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            Vendor Name
          </Label>
          <Input id="name" name="name" type="text" required />
        </div>

        <div>
          <Label htmlFor="shopName" className="block text-sm font-medium">
            Shop Name
          </Label>
          <Input id="shopName" name="shopName" type="text" required />
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>

        <div>
          <Label htmlFor="address" className="block text-sm font-medium">
            Address
          </Label>
          <Input id="address" name="address" type="text" required />
        </div>

        <div>
          <Label htmlFor="fssai" className="block text-sm font-medium">
            FSSAI Certificate
          </Label>
          <Input id="fssai" name="fssai" type="file" required />
        </div>

        <div>
          <Label htmlFor="gst" className="block text-sm font-medium">
            GST Certificate
          </Label>
          <Input id="gst" name="gst" type="file" required />
        </div>

        <div>
          <Label htmlFor="price_menu" className="block text-sm font-medium">
            Price Menu
          </Label>
          <Input id="price_menu" name="price_menu" type="file" required />
        </div>

        <Button type="submit" disabled={isPending} className="w-full mt-4">
          {isPending ? "Creating..." : "Create Vendor"}
        </Button>
      </fieldset>
    </form>
  );
}
