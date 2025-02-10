"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Compass,
  Shield,
  ScanEye,
  BicepsFlexed,
  Bolt,
} from "lucide-react";

export default function NavMain(
  { docData }) {

  //menu items
  const category = [
    {
      title: "導覽",
      url: "/docs",
      icon: Compass,
      contents: [],
    },
    {
      title: "戰術",
      //URL可選，是否為page
      url: "/docs/tactics",
      icon: Shield,
      //contens可選
      contents:
        docData && docData.length > 0
          ? docData
              .filter((data) => data.category === "tactics")
              .map((item) => ({
                title: item.title,
                url: `/docs/tactics/${item.documentId}`,
              }))
          : [],
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
      contents:
        docData && docData.length > 0
          ? docData
              .filter((data) => data.category === "tactics")
              .map((item) => ({
                title: item.title,
                url: `/docs/tactics/${item.documentId}`,
              }))
          : [],
    },
    {
      title: "肌力與體能",
      url: "/docs/strength-and-conditioning",
      icon: BicepsFlexed,
      contents:
        docData && docData.length > 0
          ? docData
              .filter((data) => data.category === "tactics")
              .map((item) => ({
                title: item.title,
                url: `/docs/tactics/${item.documentId}`,
              }))
          : [],
    },
    {
      title: "AAR",
      url: "/docs/aar",
      icon: ScanEye,
      contents:
        docData && docData.length > 0
          ? docData
              .filter((data) => data.category === "tactics")
              .map((item) => ({
                title: item.title,
                url: `/docs/tactics/${item.documentId}`,
              }))
          : [],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>目錄</SidebarGroupLabel>
      <SidebarMenu>
        {category.map((item) => (
          <Collapsible key={item.title} asChild>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span className="text-base font-semibold">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.contents?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.contents?.map((content) => (
                        <SidebarMenuSubItem key={content.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={content.url}>
                              <span>{content.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
