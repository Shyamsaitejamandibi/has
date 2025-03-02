"use server";

import { auth } from "@/app/(auth)/auth";
import db from "@/lib/db";
import { getComplaintById } from "@/lib/db/queries";

export const submitComplaint = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const type = formData.get("type") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const vendorId = formData.get("vendorId") as string;

    const newComplaint = await db.complaint.create({
      data: {
        name,
        email,
        contact,
        type,
        vendorId,
        subject,
        description,
      },
    });
    console.log("New complaint submitted:", newComplaint);
    return {
      success: "Complaint submitted successfully",
      complaintId: newComplaint.id!,
    };
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return {
      error: "Failed to submit complaint",
    };
  }
};

export const trackComplaint = async (prevState: any, formData: FormData) => {
  try {
    const complaintId = formData.get("complaintId") as string;

    if (!complaintId) {
      return {
        error: "Complaint ID is required",
      };
    }

    const complaint = await getComplaintById(complaintId);

    if (!complaint) {
      return {
        error: "Complaint not found",
      };
    }

    return {
      success: "Complaint found",
      complaint,
    };
  } catch (error) {
    console.error("Error tracking complaint:", error);
    return {
      error: "Failed to track complaint",
    };
  }
};
