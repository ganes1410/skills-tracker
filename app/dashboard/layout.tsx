import { syncUser } from "@/lib/dbUtils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen min-w-screen p-24">
      {children}
    </main>
  );
}
