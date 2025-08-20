import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/app/modules/dashboard/ui/components/dashoard-sidebar";

interface Props {
  children: React.ReactNode;
}

const layout =(({children}:Props)=>{
   return(

      <main className="flex flex-col h-screen w-screen bg-muted">
         <SidebarProvider>
            <DashboardSidebar />
            {children}
         </SidebarProvider>
      </main>
   )
})

export default layout; // important for routing
