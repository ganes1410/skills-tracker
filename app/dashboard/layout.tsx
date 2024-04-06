import { syncUser } from "@/lib/dbUtils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();

  return <div>{children}</div>;
}
