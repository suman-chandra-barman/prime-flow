import { DashbaordSidebar } from "@/components/dashboard/DashboardSidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashbaordSidebar/>
        <SidebarInset className="flex-1">
          <Navbar />
          <main className="flex-1 p-6 bg-gray-50">
            <div className="space-y-6">
              <div>{children}</div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
