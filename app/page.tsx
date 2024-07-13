"use client";

import LoginForm from "@/components/custom/auth/LoginForm";
import Dashboard from "@/components/custom/home/Dashboard";
import Skeleton from "@/components/custom/home/Skeleton";
import currentUser from "@/hooks/getCurrentUser";

export default function Home() {
  const { user, loading } = currentUser();

  if (loading) {
    return <Skeleton />;
  }
  return (
    <main className="flex items-center justify-center h-screen">
      {user ? <Dashboard /> : <LoginForm />}
    </main>
  );
}
