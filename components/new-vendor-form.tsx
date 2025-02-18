"use client";

import { createVendor } from "@/actions/vendor";
import { useActionState, useEffect, startTransition } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Upload, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export default function MyForm() {
  const [state, formAction, isPending] = useActionState(createVendor, {
    error: undefined,
    success: "",
  });

  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const validateFile = (file: File, fieldName: string) => {
    if (file.size > MAX_FILE_SIZE) {
      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: `File size must be less than 5MB. Current size: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB`,
      }));
      return false;
    }
    setFileErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateFile(file, event.target.name);
    }
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [router, state]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUploading(true);

    try {
      const form = event.currentTarget;
      const files = {
        fssai: (form.fssai as HTMLInputElement).files?.[0],
        gst: (form.gst as HTMLInputElement).files?.[0],
        price_menu: (form.price_menu as HTMLInputElement).files?.[0],
      };

      // Validate all files first
      for (const [key, file] of Object.entries(files)) {
        if (!file) {
          throw new Error(`${key.toUpperCase()} file is required`);
        }
        if (!validateFile(file, key)) {
          throw new Error(`Invalid file size for ${key.toUpperCase()}`);
        }
      }

      // Upload files and get URLs
      const [fssaiBlob, gstBlob, priceMenuBlob] = await Promise.all([
        upload(files.fssai?.name ?? "", files.fssai!, {
          access: "public",
          handleUploadUrl: "/api/upload",
        }),
        upload(files.gst?.name ?? "", files.gst!, {
          access: "public",
          handleUploadUrl: "/api/upload",
        }),
        upload(files.price_menu?.name ?? "", files.price_menu!, {
          access: "public",
          handleUploadUrl: "/api/upload",
        }),
      ]);

      // Create new FormData with only the required fields
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("shopName", form.shopName);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("fssai_url", fssaiBlob.url);
      formData.append("gst_url", gstBlob.url);
      formData.append("price_menu_url", priceMenuBlob.url);

      startTransition(() => {
        formAction(formData);
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload files"
      );
    } finally {
      setIsUploading(false);
    }
  }

  const hasFileErrors = Object.keys(fileErrors).length > 0;

  // Combined loading state
  const isLoading = isUploading || isPending;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Vendor Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset disabled={isLoading} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vendor Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter vendor name"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name</Label>
                <Input
                  id="shopName"
                  name="shopName"
                  type="text"
                  placeholder="Enter shop name"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter complete address"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              {["fssai", "gst", "price_menu"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field} className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  {fileErrors[field] && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{fileErrors[field]}</AlertDescription>
                    </Alert>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Maximum file size: 5MB. Accepted formats: PDF
                  </p>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || hasFileErrors}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading ? "Uploading Files..." : "Creating Vendor..."}
                </>
              ) : (
                "Create Vendor"
              )}
            </Button>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
}
