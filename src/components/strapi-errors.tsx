interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null;

  if (error?.message === "Invalid identifier or password") {
    error.message = "帳號或密碼錯誤"
  }
  
  return (
    <div className="text-rose-500 text-sm italic py-2">{error.message}</div>
  );
}