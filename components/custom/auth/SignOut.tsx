"use client";

// NEXT
import { useRouter } from "next/navigation";

// ACTIONS
import { signOut } from "@/actions/auth";

// UI
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleSignOut() {
    await signOut().then((res) => {
      if (res.success) {
        router.push("/");
        toast({
          title: "Success!",
          description: res.success,
        });
      }

      if (res.error) {
        toast({
          title: "Error!",
          description: res.error,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <Button variant="destructive" onClick={handleSignOut} className="w-full">
      Sign Out
    </Button>
  );
}
