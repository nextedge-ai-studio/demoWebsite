import { Newspaper } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">
          部落格
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          歡迎來到我的技術與生活分享園地。這裡會記錄我的學習筆記、專案心得與生活點滴。
        </p>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-20">
        <Newspaper className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-semibold">文章即將上線</h2>
        <p className="mt-2 text-muted-foreground">
          我正在努力撰寫內容，敬請期待！
        </p>
      </div>
    </div>
  );
}
