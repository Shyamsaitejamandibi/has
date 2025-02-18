"use client";

import { Mail } from "lucide-react";
import resendLogin from "@/actions/resend-login";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export function SignIn() {
  const [state, formAction, isPending] = useActionState(resendLogin, undefined);
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url("/cmgfs.png")',
        backgroundSize: "60% auto", // Make the image smaller
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Lighter background color with transparency
        backgroundBlendMode: "lighten", // Change blend mode to lighten
        boxShadow: "inset 0 0 100px rgba(255, 255, 255, 0.5)",
      }}
    >
      <Card className="w-full max-w-sm backdrop-blur-sm bg-white/90 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to sign in with Email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2" action={formAction}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className="pl-10 bg-white/80 backdrop-blur-sm focus:bg-white transition-colors"
                  aria-describedby="email-description"
                />
                <Mail
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <p
                id="email-description"
                className="text-sm text-muted-foreground"
              >
                We will send a magic link to this email
              </p>
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Send magic link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
