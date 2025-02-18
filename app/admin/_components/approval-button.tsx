"use client";

import { approval } from "@/actions/approval";
import { Button } from "@/components/ui/button";

export const ApprovalButton = ({ id }: { id: string }) => {
  return (
    <div className="flex gap-2 p-2 border rounded-lg shadow-sm">
      <Button
        variant="outline"
        className="text-yellow-600 w-16 border-yellow-600 hover:bg-yellow-100"
        onClick={() => approval(id, "REVIEWING")}
      >
        Review
      </Button>
      <Button
        variant="outline"
        className="text-green-600 border-green-600 hover:bg-green-100"
        onClick={() => approval(id, "APPROVED")}
      >
        Approve
      </Button>
      <Button
        variant="outline"
        className="text-red-600 border-red-600 hover:bg-red-100"
        onClick={() => approval(id, "REJECTED")}
      >
        Reject
      </Button>
    </div>
  );
};
