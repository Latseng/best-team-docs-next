import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";

async function getDocData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/docs/${id}`);

  const result = await res.json();

  return result.data;
}

export default async function TaticDoc({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  const docData: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    documentId: string;
    category: string;
    content: BlocksContent;
  }[] = await getDocData(id);

  if (!docData) {
    // 處理找不到文章的情況，例如導向 404 頁面
    return <div>文章不存在</div>; // 或使用更完善的 404 處理方式
  }


  return (
    <section className="content p-4">
      <BlockRendererClient content={docData.content} />
    </section>
  );
}
