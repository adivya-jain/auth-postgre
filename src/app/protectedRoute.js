"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) {
      router.push("/login"); 
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
