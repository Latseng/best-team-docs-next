"use client";
import { ChevronRight } from "lucide-react";
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
import { Compass, Shield, ScanEye, BicepsFlexed, Bolt } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

interface NavMainProps {
  docCategories: docCategories[];
}

export default function NavMain({ docCategories }: NavMainProps) {
  const pathname = usePathname();

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
        docCategories.filter((item) => item.slug === "tactics")[0]?.docs
          .length > 0
          ? docCategories
              .filter((item) => item.slug === "tactics")[0]
              .docs.map((item) => ({
                title: item.title,
                url: `/docs/tactics/${item.documentId}`,
              }))
          : [],
    },
    {
      title: "裝備",
      url: "/docs/equipment",
      icon: Bolt,
      contents:
        docCategories.filter((item) => item.slug === "equipment")[0]?.docs
          .length > 0
          ? docCategories
              .filter((item) => item.slug === "equipment")[0]
              .docs.map((item) => ({
                title: item.title,
                url: `/docs/equipment/${item.documentId}`,
              }))
          : [],
    },
    {
      title: "肌力與體能",
      url: "/docs/strength-and-conditioning",
      icon: BicepsFlexed,
      contents:
        docCategories.filter(
          (item) => item.slug === "strength-and-conditioning"
        )[0]?.docs.length > 0
          ? docCategories
              .filter((item) => item.slug === "strength-and-conditioning")[0]
              .docs.map((item) => ({
                title: item.title,
                url: `/docs/strength-and-conditioning/${item.documentId}`,
              }))
          : [],
    },
    {
      title: "AAR",
      url: "/docs/aar",
      icon: ScanEye,
      contents:
        docCategories.filter((item) => item.slug === "aar")[0]?.docs.length > 0
          ? docCategories
              .filter((item) => item.slug === "aar")[0]
              .docs.map((item) => ({
                title: item.title,
                url: `/docs/aar/${item.documentId}`,
              }))
          : [],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>目錄</SidebarGroupLabel>
      <SidebarMenu>
        {category.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={pathname.startsWith(item.url)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === item.url}
                asChild
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span className="text-base font-semibold">{item.title}</span>
                </Link>
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
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname.startsWith(content.url)}
                          >
                            <Link href={content.url}>
                              <span>{content.title}</span>
                            </Link>
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
