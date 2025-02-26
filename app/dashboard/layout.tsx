import { Sidebar } from "@/components/molecules/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
