import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-rows-[40px_1fr_40px] items-center justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="flex flex-col-reverse items-center sm:flex-row gap-2 row-start-2">
        <div>
          <div className="m-8">
            <h2 className="text-4xl text-center">文件系統2.0</h2>
            <p className="m-4 text-lg">快速、即時、易用的技術文件庫</p>
          </div>
          <a
            className="m-4 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            進入目錄 →
          </a>
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
