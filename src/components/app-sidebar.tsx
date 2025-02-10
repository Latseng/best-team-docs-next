
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

import  NavMain  from "./nav-main";

export function AppSidebar({docData}) {

  return (
    <Sidebar collapsible="icon" className="mt-16">
      <SidebarContent>
        <NavMain docData={docData} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
