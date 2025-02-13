import Image from "next/image";
import Link from "next/link";
import { FileText, MessageSquareHeart } from "lucide-react";
import MainMessage from "@/components/MainMessage";

export default function Home() {
  return (
    <main className="grid grid-rows-[40px_1fr_40px] items-center justify-items-center mt-16 sm:mt-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="flex flex-col-reverse items-center sm:flex-row gap-2 row-start-2">
        <div>
          <div className="m-8">
            <h1 className="text-4xl font-bold text-center">文件資料庫</h1>
            <p className="m-4 text-lg">
              即時更新、便於使用、團隊專屬、永久保存
            </p>
          </div>
          <div className="flex flex-col items-center sm:flex-row justify-around gap-4">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] sm:text-base h-10 w-4/5 sm:h-12 px-4 sm:px-5"
              href="/docs"
            >
              <FileText size={16} />
              文件
            </Link>
            <Link
              className="rounded-full transition-colors flex items-center justify-center bg-gray-200 text-gray-800 gap-2 hover:bg-[#dddddd] dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-200 sm:text-base h-10 w-4/5  sm:h-12 px-4 sm:px-5"
              href="/blog"
            >
              <MessageSquareHeart size={16} />
              共筆
            </Link>
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://strapi-backend-eqf9.onrender.com"
              target="_blank"
              className="mt-2 p-2 text-sm hover:text-sky-600"
            >
              管理員登入
            </a>
          </div>
        </div>
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="lightning logo"
          width={160}
          height={160}
          priority
        />
      </section>
      <MainMessage />
    </main>
  );
}
