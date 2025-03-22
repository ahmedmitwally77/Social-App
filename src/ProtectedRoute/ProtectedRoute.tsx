"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/Hooks/store.hook";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((state) => state.userReducer.token);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // if (token === undefined) return; 
    if (!token && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [token, router, pathname]);

  

  return <>{children}</>;
}
