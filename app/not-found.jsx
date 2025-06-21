import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-7xl mb-4 animate-bounce">👻</div>

      <h1 className="text-6xl font-bold text-purple-700 mb-2">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
       Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.Try again.
      </p>

      <Link href="/" passHref>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg rounded-lg shadow-md transition-all">
          🏠 RETURN 
        </Button>
      </Link>
    </div>
  );
}
