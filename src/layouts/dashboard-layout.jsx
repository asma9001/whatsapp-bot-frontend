import { Outlet } from "react-router-dom"
import { DashboardSidebar } from "../components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "../components/ui/sidebar"

// This inner layout will respond to sidebar open/close state
function DashboardMainLayout() {
  const { open } = useSidebar()

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Content area - left margin matches sidebar width */}
      <div
        className={`flex flex-1 flex-col transition-all duration-200`}
        style={{
          marginLeft: open ? 256 : 64, // 64px or 256px depending on sidebar state
        }}
      >
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardMainLayout />
    </SidebarProvider>
  )
}