export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen container p-24">{children}</main>;
}
