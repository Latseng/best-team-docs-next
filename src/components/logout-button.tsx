import { logoutAction } from "@/app/(auth)/auth-actions";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function LogoutButton() {
  return (
    <Button size={"sm"} onClick={logoutAction}>
      登出
      <LogOut />
    </Button>
  );
}
