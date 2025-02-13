import Header from "@/components/Header";

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
  docs: [];
}

import { ReactNode } from "react";

export default async function Layout({
  children,
  docCategories,
}: {
  children: ReactNode;
  docCategories: docCategories[];
}) {
 
  return (
    <>
      <div className="mt-16">
       
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
    </>
  );
}
