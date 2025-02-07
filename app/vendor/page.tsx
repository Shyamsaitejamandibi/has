"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function VendorDashboard() {
  const [isNewVendor, setIsNewVendor] = useState(true);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    shopName: "",
    phoneNumber: "",
    address: "",
  });
  const [fssaiLicense, setFssaiLicense] = useState<File | null>(null);
  const [menu, setMenu] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append text data
      formDataToSend.append("shopName", formData.shopName);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("address", formData.address);

      // Append files if they exist
      if (fssaiLicense) {
        formDataToSend.append("fssaiLicense", fssaiLicense);
      }
      if (menu) {
        formDataToSend.append("menu", menu);
      }

      const response = await fetch("/api/vendor/proposal", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit proposal");
      }

      const result = await response.json();
      setIsNewVendor(result.isVerified);
      setStatus("Submitted Successfully");
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting proposal:", error);
      setStatus("Submission Failed");
    }
  };

  const handleStatusUpdate = (newStatus: string) => {
    // Here you would typically send the status update to your backend
    console.log("Updating status to:", newStatus);
    setStatus(newStatus);
  };

  if (isNewVendor) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">New Vendor Dashboard</h1>
        <form onSubmit={handleSubmitProposal} className="space-y-4">
          <div>
            <Label htmlFor="shopName">Shop Name</Label>
            <Input
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="fssaiLicense">FSSAI License</Label>
            <Input
              id="fssaiLicense"
              type="file"
              onChange={(e) => handleFileChange(e, setFssaiLicense)}
              required
            />
          </div>
          <div>
            <Label htmlFor="menu">Menu</Label>
            <Input
              id="menu"
              type="file"
              onChange={(e) => handleFileChange(e, setMenu)}
              required
            />
          </div>
          <Button type="submit">Submit Proposal</Button>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Proposal Status</h2>
          <p>{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Existing Vendor Dashboard</h1>
      <div className="space-y-4">
        <Button onClick={() => handleStatusUpdate("Open")}>Open Shop</Button>
        <Button onClick={() => handleStatusUpdate("Closed")}>Close Shop</Button>
        <Button onClick={() => handleStatusUpdate("Price Hike Proposal")}>
          Submit Price Hike Proposal
        </Button>
        <Button onClick={() => handleStatusUpdate("Leave Request")}>
          Submit Leave Request
        </Button>
        <Button onClick={() => handleStatusUpdate("Complaint")}>
          Raise Complaint
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Current Status</h2>
        <p>{status}</p>
      </div>
    </div>
  );
}
