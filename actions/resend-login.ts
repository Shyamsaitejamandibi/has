"use server";

import { signIn } from "@/auth";

export default async function resendLogin(state: unknown, formData: FormData) {
  await signIn("resend", formData);
  return { success: true };
}
