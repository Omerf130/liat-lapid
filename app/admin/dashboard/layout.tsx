import { getAdminSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <AdminShell email={session?.email ?? "מנהל"}>{children}</AdminShell>
  );
}
