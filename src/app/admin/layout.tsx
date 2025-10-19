"use client";

import AdminAuthWrapper from "@/components/admin-auth-wrapper";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthWrapper>
      <div className="flex h-screen">
        <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav>
              <ul>
                <li className="mb-2">
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="mb-2">
                  <Link href="/admin/users">Users</Link>
                </li>
                <li className="mb-2">
                  <Link href="/admin/products">Products</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-auto">
            <Link href="/shop/cannabis" passHref>
              <Button variant="outline" className="w-full mb-2">View Shop</Button>
            </Link>
            <Button onClick={() => auth.signOut()} className="w-full">Logout</Button>
          </div>
        </div>
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
          {children}
        </div>
      </div>
    </AdminAuthWrapper>
  );
}