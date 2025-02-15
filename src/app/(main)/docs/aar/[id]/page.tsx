import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";
import Image from "next/image";

// 設定 ISR：每 10 秒重新生成一次頁面
export const revalidate = 10;

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
  docs: { title: string; documentId: string }[] | [];
}

//當前文件所在的目錄
const currentCategory = "aar";

//產生動態路由
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?populate=*`
    );

    if (!res.ok) {
      console.error(`API request failed with status ${res.status}`);
      return []; // 保證回傳空陣列，而不是 undefined
    }

    const jsonResponse = await res.json();

    const docCategories: docCategories[] = jsonResponse.data;
    
    const categoryData = docCategories.filter(
      (category) => category.slug === currentCategory
    )[0];

    if (!categoryData || !categoryData.docs) {
      return []; // 若找不到資料，回傳空陣列
    }

    return categoryData.docs.map((item) => ({
      id: item.documentId,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // 確保發生錯誤時仍然回傳空陣列
  }
}

async function getDocData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/docs/${id}?populate=*`,
    {
      next: { revalidate: 10 }, // 使用 ISR，每 10 秒重新生成這筆資料
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data"); // 錯誤處理
  }

  const result = await res.json();

  return result.data;
}

export default async function AarDocs({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    // 處理找不到文章的情況，例如導向 404 頁面
    return (
      <div>
        <h1>找不到文章</h1>
      </div>
    ); // 或使用更完善的 404 處理方式
  }

  const docData: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    documentId: string;
    category: string;
    content: BlocksContent;
    cover: { url: string } | null;
  } = await getDocData(id);

  if (!docData) {
    // 處理找不到文章的情況，例如導向 404 頁面
    return (
      <div>
        <h1>找不到文章</h1>
      </div>
    ); // 或使用更完善的 404 處理方式
  }   
  
  return (
    <>
      <h1>{docData.title}</h1>
       {docData.cover && <Image src={docData.cover.url} width={512} height={512} alt="cover image" />}
      <BlockRendererClient content={docData.content} />
    </>
  );
}