export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen min-w-screen p-24">
      {children}
    </main>
  );
}
