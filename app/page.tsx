import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center text-xl font-bold text-gray-800"
              >
                Vendor Management
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Vendor Management System
        </h1>
        <div className="space-x-4">
          <Link href="/vendor">
            <Button>Vendor</Button>
          </Link>
          <Link href="/student">
            <Button>Student</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
