"use client";

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCircle, KeySquare } from "lucide-react";
import { loginUserAction } from "@/app/(auth)/auth-actions";
import { SubmitButton } from "./submit-button";
import { StrapiErrors } from "./strapi-errors";
import { ZodErrors } from "@/components/zod-errors";
import { useActionState } from "react";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SigninForm() {

  const [formState, formAction] = useActionState(
    loginUserAction,
    INITIAL_STATE
  );
  
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">登入</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor="identifier">
                <UserCircle className="w-4" />
                帳號
              </Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="請輸入帳號"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor="password">
                <KeySquare className="w-4" />
                密碼
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="請輸入密碼"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton className="w-full" text="登入" loadingText="登入" />
            <StrapiErrors error={formState?.strapiErrors} />
            <a
              href="https://strapi-backend-eqf9.onrender.com"
              target="_blank"
              className="mt-4 p-2 text-sm hover:text-sky-600"
            >
              管理員登入
            </a>
          </CardFooter>
        </Card>
      </form>
      <div className="mt-8 text-center"></div>
    </div>
  );
}
