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
import AppSidebar from "@/components/app-sidebar";
import { ReactNode } from "react";
import Pagination from "@/components/Pagination";

async function getDocCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?populate=*`,
    {
      next: { revalidate: 10 }, // 每 10 秒重新生成這筆資料
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export default async function Layout({ children }: { children: ReactNode }) {

const expectedOrder = ["導覽", "戰術", "裝備", "肌力與體能", "AAR"];

const result = await getDocCategories();
//整理API陣列資料順序
const docCategories = expectedOrder.map((item) => (
  result.find((resultItem: { name: string }) => resultItem.name === item)
));

  return (
    <SidebarProvider>
      <AppSidebar docCategories={docCategories} />
      <div className="mt-16 w-full">
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
        <section className="content p-4 sm:px-8">{children}</section>
        <Pagination docCategories={docCategories} />
      </div>
    </SidebarProvider>
  );
}
