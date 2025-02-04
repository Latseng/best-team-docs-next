"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";
import { Button } from "./ui/button";

export default function Header() {
 const pathname = usePathname()

  return (
    <header className="bg-gray-50 dark:bg-zinc-900 fixed top-0 left-0 w-full z-50 border h-16 px-4 sm:px-8 flex gap-8 justify-between items-center">
      <Link className="flex items-center gap-2" href="/">
        <Image
          aria-hidden
          className="dark:invert"
          src="/logo.svg"
          alt="Logo icon"
          width={36}
          height={36}
        />
        文件系統2.0
      </Link>
      <div className="flex gap-4 items-center">
        {pathname.startsWith("/docs") && (
          <Button variant="outline" asChild>
            <Link href="/blog">共筆</Link>
          </Button>
        )}
        {pathname.startsWith("/blog") && (
          <Button variant="outline" asChild>
            <Link href="/docs">文件</Link>
          </Button>
        )}
        <ThemeToggle />
        <LogoutButton />
      </div>
    </header>
  );
}
