"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Vendor {
  id: number;
  shopName: string;
  status: string;
  phoneNumber: string;
  address: string;
  fssaiLicense: string;
  menu: string;
}

export default function AdminDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the vendor data from your backend
    // For this example, we'll just simulate it
    setVendors([
      {
        id: 1,
        shopName: "Vendor A",
        status: "Reviewing",
        phoneNumber: "1234567890",
        address: "Address A",
        fssaiLicense: "license_a.pdf",
        menu: "menu_a.pdf",
      },
      {
        id: 2,
        shopName: "Vendor B",
        status: "Accepted",
        phoneNumber: "2345678901",
        address: "Address B",
        fssaiLicense: "license_b.pdf",
        menu: "menu_b.pdf",
      },
      {
        id: 3,
        shopName: "Vendor C",
        status: "Verifying Documents",
        phoneNumber: "3456789012",
        address: "Address C",
        fssaiLicense: "license_c.pdf",
        menu: "menu_c.pdf",
      },
    ]);
  }, []);

  const handleStatusUpdate = (id: number, newStatus: string) => {
    // Here you would typically send the status update to your backend
    setVendors(
      vendors.map((vendor) =>
        vendor.id === id ? { ...vendor, status: newStatus } : vendor
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold">{vendor.shopName}</h2>
            <p>Current Status: {vendor.status}</p>
            <p>Phone: {vendor.phoneNumber}</p>
            <p>Address: {vendor.address}</p>
            <p>
              FSSAI License:{" "}
              <a
                href={vendor.fssaiLicense}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View
              </a>
            </p>
            <p>
              Menu:{" "}
              <a
                href={vendor.menu}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View
              </a>
            </p>
            <div className="mt-2 space-x-2">
              <Button onClick={() => handleStatusUpdate(vendor.id, "Accepted")}>
                Accept
              </Button>
              <Button
                onClick={() => handleStatusUpdate(vendor.id, "Reviewing")}
              >
                Review
              </Button>
              <Button
                onClick={() =>
                  handleStatusUpdate(vendor.id, "Verifying Documents")
                }
              >
                Verify Documents
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
