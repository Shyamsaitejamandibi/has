import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/app/(auth)/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Vendor Management
            </Link>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900"
                >
                  {session ? "Sign Out" : ""}
                </Button>
              </form>
              <Link
                href="/student/track-complaints"
                className="text-gray-700 hover:text-gray-900"
              >
                Track Your Complaints
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-100 px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome to Vendor Management System
        </h1>
        <div className="flex space-x-4">
          <Link href="/vendor">
            <Button className="px-6 py-2 text-lg">Vendor</Button>
          </Link>
          <Link href="/student">
            <Button className="px-6 py-2 text-lg">Student</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
