import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "./logout-button";
import { Button } from "./ui/button";
import {
  AlignJustify,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import  NavMain from "./nav-main";
import HeaderAction from "./header-action";
import { SidebarContent, SidebarFooter, SidebarProvider } from "./ui/sidebar";


async function getDocCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?populate=*`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export default async function Header() {
const docCategories = await getDocCategories();

  return (
    <header className="bg-gray-50 dark:bg-zinc-900 fixed top-0 left-0 w-full z-50 border h-16 px-4 sm:px-8 flex gap-8 justify-between items-center">
      <Link className="flex items-center gap-2 font-bold" href="/">
        <Image
          aria-hidden
          className="dark:invert"
          src="/logo.svg"
          alt="Logo icon"
          width={36}
          height={36}
        />
        文件資料庫
      </Link>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <Image
                aria-hidden
                className="dark:invert mx-auto sm:mx-0"
                src="/logo.svg"
                alt="Logo icon"
                width={36}
                height={36}
              />
              <SheetTitle>文件系統2.0</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <SidebarProvider className="grid">
              <SidebarContent className="border rounded-md">
                <NavMain docCategories={docCategories} />
              </SidebarContent>
              <SidebarFooter>
                <div className="flex justify-center items-center gap-4">
                  <HeaderAction />
                </div>
              </SidebarFooter>
            </SidebarProvider>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex gap-4 items-center">
        <HeaderAction />
      </div>
    </header>
  );
}
