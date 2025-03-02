"use client";

import type React from "react";

import { useState, useEffect, useRef, startTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
import { submitComplaint } from "@/actions/raise-complaint";
import { toast } from "sonner";
import { Loader2, Copy, CheckCircle } from "lucide-react";

export const RaiseComplaintDialog = ({
  vendorShopname,
  vendorId,
}: {
  vendorShopname: string;
  vendorId: string;
}) => {
  const [state, formAction, isPending] = useActionState(submitComplaint, {
    error: undefined,
    success: "",
    complaintId: "",
  });

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.success && state.complaintId) {
      toast.success(state.success);
      // Close the complaint form dialog
      closeDialogRef.current?.click();
      // Show the success dialog with complaint ID
      setShowSuccessDialog(true);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  const copyToClipboard = () => {
    if (state.complaintId) {
      navigator.clipboard.writeText(state.complaintId);
      setCopied(true);
      toast.success("Complaint ID copied to clipboard");

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Raise Complaint
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Raise Complaint - {vendorShopname}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset disabled={isPending} className="space-y-4">
              <div>
                <Input
                  id="vendorId"
                  className="hidden"
                  name="vendorId"
                  value={vendorId}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" name="contact" type="tel" required />
              </div>
              <div>
                <Label htmlFor="type">Complaint Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hygiene">Hygiene</SelectItem>
                    <SelectItem value="taste_quality">Taste/Quality</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter your complaint details..."
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Complaint"
                )}
              </Button>
            </fieldset>
          </form>
          <DialogClose ref={closeDialogRef} className="hidden" />
        </DialogContent>
      </Dialog>

      {/* Success Dialog with Complaint ID */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              Complaint Submitted Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-center text-sm text-muted-foreground">
                Your complaint has been registered. Please save the complaint ID
                for future reference.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="complaintId">Complaint ID</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="complaintId"
                  value={state.complaintId || ""}
                  readOnly
                  className="font-mono"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => setShowSuccessDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
