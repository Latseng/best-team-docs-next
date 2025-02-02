import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "@/components/BlockRendererClient";

async function getDocData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/docs`);
  const data = await res.json();
  return data.data;
}

export default async function Tatics() {
  const result: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    documentId: string;
    category: string;
    content: BlocksContent;
  }[] = await getDocData();
  
  const docData = result.filter((item) => (
    item.category === "tactics"
  ));

   const content: BlocksContent = docData[0].content;
   
  return (
    <section className="content p-4">
      <h1>戰術</h1>
      <p>戰術，指的是完成任務的技術與方法。</p>
      <p>
        雖然戰術執法人員專精於限制空間戰鬥（Close-Quarters
        Battle），但戰術這一詞，並不僅侷限於CQB。
      </p>
      <p>
        只要是任何有辦法達成目標，並儘可能降低風險的方法，都是戰術執法人員應該考量的範圍，就像教官說過的：「喬裝成餐點外送員的戰術隊員，也是執行戰術的一員」。
      </p>
      <p>
        雖是這麼說，但這一個篇章的開頭，還是得從CQB，這個在出勤時，跟團隊夥伴密切相關的技術開始談起。
      </p>
    </section>
  );
}
