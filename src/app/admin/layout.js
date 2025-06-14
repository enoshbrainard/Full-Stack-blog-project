"use client";
import Link from "next/link";
import { Plus, List, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AdminLayout({ children }) {
  const Router = useRouter();
  const handleClick = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      Router.push("/");
    }
  };
  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r">
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Link href="/">
              {" "}
              <span>🌀</span> blogger
            </Link>
          </h1>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <Link
            href="/admin/addProduct"
            className="flex items-center gap-3 px-4 py-2 border rounded hover:bg-gray-200"
          >
            <Plus size={20} /> Add blogs
          </Link>
          {/* <Link
            href="/admin/blogs"
            className="flex items-center gap-3 px-4 py-2 border rounded hover:bg-gray-200"
          >
            <List size={20} /> Blog lists
          </Link>
          <Link
            href="/admin/subscriptions"
            className="flex items-center gap-3 px-4 py-2 border rounded hover:bg-gray-200"
          >
            <Mail size={20} /> Subscriptions
          </Link> */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 px-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          {/* <Image
            src="/blogpic.png" // Make sure this exists in /public
            width={36}
            height={36}
            className="rounded-full"
            alt="Profile"
          /> */}
          <button
            onClick={handleClick}
            className="text-md underline text-blue-600 cursor-pointer"
          >
            Log out
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
