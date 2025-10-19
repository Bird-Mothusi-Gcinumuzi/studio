"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        if (pathname !== "/login" && pathname !== "/register") {
          router.push("/login");
        }
      } else {
        if (user.status === "Pending Approval") {
          if (pathname !== "/pending-approval") {
            router.push("/pending-approval");
          }
        } else if (user.status === "Deactivated") {
          auth.signOut();
          router.push("/login?error=deactivated");
        } else if (user.status === "Approved") {
          if (pathname === "/login" || pathname === "/register" || pathname === "/pending-approval") {
            router.push("/");
          }
        }
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (!user && pathname !== "/login" && pathname !== "/register") {
    return null;
  }

  if (user && user.status === "Pending Approval" && pathname !== "/pending-approval") {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;