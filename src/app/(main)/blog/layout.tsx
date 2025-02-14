import { ReactNode } from "react";

export default async function Layout({
  children
}: {
  children: ReactNode;
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
