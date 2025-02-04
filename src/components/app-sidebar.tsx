"use client";
import { usePathname } from "next/navigation";
import { Compass, Shield, ScanEye, ChevronRight, BicepsFlexed, Bolt } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";



export function AppSidebar({docData}) {
  const pathname = usePathname();
  
  // Menu items.
const category = [
  {
    title: "導覽",
    url: "/docs",
    icon: Compass,
    contents: []
  },
  {
    title: "戰術",
    //URL可選，是否為page
    url: "/docs/tactics",
    icon: Shield,
    //contens可選
    contents: docData && docData.length > 0 ? (docData.filter((data) => data.category === "tactics")
      .map((item) => ({
        title: item.title,
        url: `/docs/tactics/${item.documentId}`,
      }))) : ([]),
    // [
    //   {
    //     title: "CQB的原則",
    //     url: "/docs/tactics/the-principle-of-cqb",
    //   },
    //   {
    //     title: "CQB基本觀念：受迫面",
    //     url: "/docs/tactics/cqb-fundamentals-the-fatal-funnel",
    //   },
    // ]
  },
  {
    title: "裝備",
    url: "/docs/equipment",
    icon: Bolt,
    contents: docData && docData.length > 0 ? (docData.filter((data) => data.category === "tactics")
      .map((item) => ({
        title: item.title,
        url: `/docs/tactics/${item.documentId}`,
      }))) : ([]),
  },
  {
    title: "肌力與體能",
    url: "/docs/strength-and-conditioning",
    icon: BicepsFlexed,
    contents: docData && docData.length > 0 ? (docData.filter((data) => data.category === "tactics")
      .map((item) => ({
        title: item.title,
        url: `/docs/tactics/${item.documentId}`,
      }))) : ([]),
  },
  {
    title: "AAR",
    url: "/docs/aar",
    icon: ScanEye,
    contents: docData && docData.length > 0 ? (docData.filter((data) => data.category === "tactics")
      .map((item) => ({
        title: item.title,
        url: `/docs/tactics/${item.documentId}`,
      }))) : ([]),
  },
];


  return (
    <Sidebar collapsible="icon" className="mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {category.map((item) =>
              item.contents.length > 0 ?  (
                <Collapsible
                  key={item.title}
                  className="group/collapsible"
                  asChild
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={item.url === pathname}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.contents.map((content) => (
                          <SidebarMenuSubItem key={content.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={content.url === pathname}
                            >
                              <Link href={content.url}>
                                <span>{content.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
