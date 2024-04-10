import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function ProfileLoading() {
  return (
    <main className="min-h-screen container py-16">
      <Skeleton className="w-[50%] h-[30px] bg-gray-200" />
      {/* Name */}
      <Skeleton className="w-[10%] h-[30px] bg-gray-200 mt-6" />
      <Skeleton className="w-full h-[30px] bg-gray-200 mt-2" />
      {/* Email */}
      <Skeleton className="w-[10%] h-[30px] bg-gray-200 mt-6" />
      <Skeleton className="w-full h-[30px] bg-gray-200 mt-2" />
      {/* Skills */}
      <Skeleton className="w-[10%] h-[30px] bg-gray-200 mt-6" />
      <Skeleton className="w-full h-[30px] bg-gray-200 mt-3" />
      <Skeleton className="w-full h-[30px] bg-gray-200 mt-3" />
    </main>
  );
}

export default ProfileLoading;
