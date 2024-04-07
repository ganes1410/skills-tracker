import { syncUser } from "@/lib/dbUtils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen container p-24">{children}</main>;
}
