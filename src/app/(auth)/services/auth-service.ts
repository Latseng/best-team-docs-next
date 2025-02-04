import { getStrapiURL } from "@/lib/utils";

interface LoginUserProps {
  identifier: string;
  password: string;
}

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

const baseUrl = getStrapiURL();

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}