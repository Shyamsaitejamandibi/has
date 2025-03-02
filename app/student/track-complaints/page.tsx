"use client";

import { trackComplaint } from "@/actions/raise-complaint";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Complaint } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  complaintId: z.string().min(1, "Complaint ID is required"),
});

type FormState = {
  error?: string;
  success?: string;
  complaint?: Complaint & {
    vendor: {
      shopName: string;
    };
  };
};

const initialState: FormState = {};

export default function TrackComplaints() {
  const [state, formAction, isLoading] = useActionState(
    trackComplaint,
    initialState as any
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaintId: "",
    },
  });

  useEffect(() => {
    if (state?.error) {
      form.reset();
    }
  }, [state?.error, form]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Track Your Complaint</CardTitle>
          <CardDescription>
            Enter your complaint ID to track its status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="complaintId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your complaint ID"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {state?.error && (
                <div className="p-3 bg-red-100 text-red-800 rounded-md">
                  {state.error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Tracking...
                  </>
                ) : (
                  "Track Complaint"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        {state?.complaint && (
          <CardFooter className="flex flex-col items-start gap-3 border-t pt-6">
            <h3 className="font-semibold text-lg">Complaint Details</h3>

            <div className="space-y-2 w-full">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status:</span>
                <Badge className={getStatusColor(state.complaint.status)}>
                  {state.complaint.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Vendor:</span>
                <span>{state.complaint.vendor.shopName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Subject:</span>
                <span>{state.complaint.subject}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Type:</span>
                <span>{state.complaint.type}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date Submitted:</span>
                <span>
                  {new Date(state.complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
