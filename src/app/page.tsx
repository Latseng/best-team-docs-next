import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-rows-[40px_1fr_40px] items-center justify-items-center mt-16 sm:mt-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="flex flex-col-reverse items-center sm:flex-row gap-2 row-start-2">
        <div>
          <div className="m-8">
            <h1 className="text-4xl font-bold text-center">文件系統2.0</h1>
            <p className="m-4 text-lg">即時、易用的技術交流平台</p>
          </div>
          <div className="flex flex-col items-center sm:flex-row justify-around gap-4">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] sm:text-base h-10 w-4/5 sm:h-12 px-4 sm:px-5"
              href="./docs"
            >
              開始瀏覽 →
            </Link>
            <a
              className="rounded-full transition-colors flex items-center justify-center bg-gray-200 text-gray-800 gap-2 hover:bg-[#dddddd] dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-200 sm:text-base h-10 w-4/5  sm:h-12 px-4 sm:px-5"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              內容管理
              <Image
                aria-hidden
                src="/file.svg"
                alt="file icon"
                width={16}
                height={16}
              />
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
    </main>
  );
}
