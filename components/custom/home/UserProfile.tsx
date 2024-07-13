"use client";

// HOOKS
import currentUser from "@/hooks/getCurrentUser";

// UI
import { Input } from "@/components/ui/input";

export default function UserProfile() {
  const { user, loading } = currentUser();
  return (
    <div className="flex space-x-2 items-center justify-between w-full">
      <span>User Email:</span>
      <Input
        disabled
        value={loading ? "Fetching..." : `${user?.email}`}
        className="w-1/2"
      />
    </div>
  );
}
