import { Icon } from "@iconify/react";

export default function Skeleton() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Icon icon="system-uicons:loader" className="animate-spin text-5xl" />
    </div>
  );
}
