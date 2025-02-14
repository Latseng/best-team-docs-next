"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

interface docCategories {
  category: string;
  content: [];
  createdAt: string;
  description: string | null;
  documentId: string;
  id: number;
  publishedAt: string;
  name: string;
  updatedAt: string;
  slug: string;
  docs: { title: string; documentId: string }[];
}

interface PaginationProps {
  docCategories: docCategories[];
}

const Pagination = ({ docCategories }: PaginationProps) => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean); // 過濾空字串

  //因為導覽頁面沒有第二層，所以currentCategory要設為'tactics'才能正常運作
  const currentCategory = pathSegments[1] || "tactics"; // 目錄
  const currentContent = pathSegments[2] || null; // 內容

  // 找出當前目錄的索引
  let categoryIndex = docCategories.findIndex(
    (item) => item.slug === currentCategory
  );
  if (categoryIndex === -1) {
    categoryIndex = 0;
  } // 如果找不到該目錄，則視為首頁

  const currentDir = docCategories[categoryIndex];

  //找出當前目錄下文件的索引，-1代表目錄頁
  const contentIndex = currentDir.docs.findIndex(
    (item) => item.documentId === currentContent
  );

  // 判斷「上一頁」與「下一頁」
  let prevPath: string | null = null;
  let nextPath: string | null = null;

  //判斷上下頁標題
  let prevTitle: string | null = null;
  let nextTitle: string | null = null;

  // 計算上一頁 (prev)
  if (contentIndex > 0) {
    // 若當前是內容頁，且不是該目錄第一個內容
    prevPath = `/docs/${currentCategory}/${
      currentDir.docs[contentIndex - 1].documentId
    }`;
    prevTitle = currentDir.docs[contentIndex - 1].title;
  } else if (contentIndex === 0) {
    // 若當前是該目錄第一個內容，上一頁為該目錄頁
    prevPath = `/docs/${currentCategory}`;
    prevTitle = docCategories[categoryIndex].name;
  } else if (categoryIndex > 1) {
    // 若當前是目錄頁，且不是第一個目錄，上一頁應該是上一個目錄的最後一個內容頁
    const prevDir = docCategories[categoryIndex - 1];
    prevPath = `/docs/${prevDir.slug}/${
      prevDir.docs[prevDir.docs.length - 1].documentId
    }`;
    prevTitle = prevDir.docs[prevDir.docs.length - 1].title;
  } else if (categoryIndex === 1) {
    prevPath = "/docs";
    prevTitle = "導覽";
  }

  // 計算下一頁 (next)
  if (contentIndex !== -1 && contentIndex < currentDir.docs.length - 1) {
    // 若當前是內容頁，且不是最後一個內容
    nextPath = `/docs/${currentCategory}/${
      currentDir.docs[contentIndex + 1].documentId
    }`;
    nextTitle = currentDir.docs[contentIndex + 1].title;
  } else if (contentIndex === -1 && currentDir.docs.length > 0) {
    // 若當前是目錄頁，下一頁應該是該目錄的第一個內容
    nextPath = `/docs/${currentCategory}/${currentDir.docs[0].documentId}`;
    nextTitle = currentDir.docs[0].title;
  } else if (categoryIndex < docCategories.length - 1) {
    // 若當前是最後一個內容，且還有下一個目錄，則前往下一個目錄
    const nextDir = docCategories[categoryIndex + 1];
    nextPath = `/docs/${nextDir.slug}`;
    nextTitle = docCategories[categoryIndex + 1].name;
  }

  return (
    <div className="my-4 py-4 px-8 flex justify-between">
      {/* 在第一個頁面的話，不渲染上一頁的元件 */}
      {pathname !== "/docs" && (
        <a
          href={prevPath || "#"}
          className="flex p-4 border rounded-md cursor-pointer hover:bg-gray-50"
        >
          <ChevronLeft className="mx-2" />
          {prevTitle}
        </a>
      )}
      {/* 是否在最後目錄的最後內容？是的話，不渲染下一頁的元件 */}
      {currentContent !==
        docCategories[docCategories.length - 1].docs[
          docCategories[docCategories.length - 1].docs.length - 1
        ].documentId && (
      <a
        href={nextPath || "#"}
        className="flex p-4 border rounded-md cursor-pointer hover:bg-gray-50"
      >
        {nextTitle}
        <ChevronRight className="mx-2" />
      </a>
      )} 
    </div>
  );
};

export default Pagination;
