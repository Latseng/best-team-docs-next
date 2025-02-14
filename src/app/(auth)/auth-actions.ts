"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { loginUserService } from "./services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 1, // 1 day
  path: "/",
  domain: process.env.HOST ?? process.env.VERCEL_URL ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// const schemaRegister = z.object({
//   username: z.string().min(3).max(20, {
//     message: "Username must be between 3 and 20 characters",
//   }),
//   password: z.string().min(6).max(100, {
//     message: "Password must be between 6 and 100 characters",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address",
//   }),
// });

// export async function registerUserAction(prevState: any, formData: FormData) {
//   const validatedFields = schemaRegister.safeParse({
//     username: formData.get("username"),
//     password: formData.get("password"),
//     email: formData.get("email"),
//   });

//   if (!validatedFields.success) {
//     return {
//       ...prevState,
//       zodErrors: validatedFields.error.flatten().fieldErrors,
//       strapiErrors: null,
//       message: "Missing Fields. Failed to Register.",
//     };
//   }

//   const responseData = await registerUserService(validatedFields.data);

//   if (!responseData) {
//     return {
//       ...prevState,
//       strapiErrors: null,
//       zodErrors: null,
//       message: "Ops! Something went wrong. Please try again.",
//     };
//   }

//   if (responseData.error) {
//     return {
//       ...prevState,
//       strapiErrors: responseData.error,
//       zodErrors: null,
//       message: "Failed to Register.",
//     };
//   }

//   const cookieStore = await cookies();
//   cookieStore.set("jwt", responseData.jwt, config);

//   redirect("/");
// }

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "請輸入有效帳號",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "請輸入有效密碼",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  console.log(responseData, "responseData");

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/signin");
}
