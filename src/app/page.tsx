"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const basePath = process.env.BASE_PATH ?? '';

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token) {
      router.push(`${basePath}/login`);
      return;
    }
    
    if (role === "admin") {
      router.push(`${basePath}/admin/dashboard`);
      return;
    } else if (role === "moderator") {
      router.push(`${basePath}/moderator/dashboard`);
      return;
    } else {
      router.push(`${basePath}/login`);
    }
  }, [router]);

  return null;
}