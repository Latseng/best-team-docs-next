import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import  NavMain  from "./nav-main";


interface docCategories {
  category: string;
  content: [];
  createdAt: string;
  description: string | null;
  documentId: string;
  id: number;
  publishedAt: string;
  name: string;
  updatedAt: string;
  slug: string;
  docs: { title: string; documentId: string }[];
}

interface AppSidebarProps {
  docCategories: docCategories[];
}

export default async function AppSidebar({ docCategories }: AppSidebarProps) {
  

  return (
    <Sidebar collapsible="icon" className="mt-16">
      <SidebarContent>
        <NavMain docCategories={docCategories} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
