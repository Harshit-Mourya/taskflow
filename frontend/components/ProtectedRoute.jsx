"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // redirect to login
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return children;
}
