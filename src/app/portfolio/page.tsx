import { supabaseAdmin } from "../../../lib/supabase";
import { ProjectCard } from "@/components/portfolio/project-card";
import { projects } from "@/lib/projects";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import BlockRenderer, { Block } from "@/components/BlockRenderer";

// 從 Supabase 取得頁面內容
async function getPageContent() {
  const { data, error } = await supabaseAdmin
    .from("pushed_content_cache")
    .select("content")
    .eq("path", "/portfolio")
    .single();

  if (error || !data) {
    return null;
  }

  return data.content as { blocks?: Block[] } | null;
}

export default async function PortfolioPage() {
  // 從 Supabase 取得動態內容
  const pageContent = await getPageContent();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:py-20">
      {/* 如果有動態內容，優先使用 BlockRenderer 渲染 */}
      {pageContent?.blocks && (
        <div className="mb-12">
          <BlockRenderer blocks={pageContent.blocks} />
        </div>
      )}

      {/* 如果沒有動態內容，顯示預設標題 */}
      {!pageContent?.blocks && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">
            作品集
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            這裡展示了我過去參與的部分專案，涵蓋了不同領域和技術的應用。
          </p>
        </div>
      )}

      {/* 專案卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => {
          const imagePlaceholder = PlaceHolderImages.find(
            (p) => p.id === project.imageId
          );
          if (!imagePlaceholder) {
            return null;
          }
          return (
            <ProjectCard
              key={project.id}
              project={project}
              imagePlaceholder={imagePlaceholder}
            />
          );
        })}
      </div>
    </div>
  );
}
