"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "./logout-button";

const HeaderAction = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/docs") && (
        <Button variant="outline" asChild>
          <a href="/blog">共筆</a>
        </Button>
      )}
      {pathname.startsWith("/blog") && (
        <Button variant="outline" asChild>
          <a href="/docs">文件</a>
        </Button>
      )}
      <ThemeToggle />
      <LogoutButton />
    </>
  );
};

export default HeaderAction;
