import Link from "next/link";
export default function Navigation() {
  return (
    <nav className="w-full bg-white border-b shadow-sm flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <Link href="/">
        <span className="text-2xl font-extrabold text-blue-600">
          🌀 Blogger
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link
          href="/login"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
