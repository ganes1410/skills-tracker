import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function DashboardLoading() {
  const SKELETON_ITEMS = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <main className="min-h-screen container py-16">
      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-4 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {SKELETON_ITEMS.map((item) => (
          <Skeleton
            className="w-full h-[320px] flex flex-col bg-gray-200"
            key={item}
          />
        ))}
      </div>
    </main>
  );
}

export default DashboardLoading;
