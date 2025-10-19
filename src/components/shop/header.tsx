
"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Verdant Vista</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            {user && (
              <>
                <li>
                  <Link href="/shop/cannabis">Cannabis</Link>
                </li>
                <li>
                  <Link href="/shop/merch">Merch</Link>
                </li>
                <li>
                  <Link href="/shop/cart">Cart</Link>
                </li>
                {user.roles?.includes("admin") && (
                  <li>
                    <Link href="/admin/dashboard">Admin</Link>
                  </li>
                )}
                <li>
                  <Button onClick={() => auth.signOut()}>Logout</Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
