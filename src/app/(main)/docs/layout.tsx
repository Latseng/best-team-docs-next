import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";


async function getDocData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/docs`);
  const data = await res.json();
  return data.data;
}

interface LayoutProps {
  children: React.ReactNode;
  docData: any; // Replace 'any' with a more specific type if possible
}

export default async function Layout({ children }: LayoutProps) {
   const docData = await getDocData();
  return (
    <SidebarProvider>
      <Header docData={docData} />
      <AppSidebar docData={docData} />
      <div className="mt-16">
        <div className="flex items-center gap-2 p-2">
          <SidebarTrigger className="hidden md:flex" />
          <Separator
            orientation="vertical"
            className="hidden md:block mr-2 h-4"
          />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">文件系統</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>導覽</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
