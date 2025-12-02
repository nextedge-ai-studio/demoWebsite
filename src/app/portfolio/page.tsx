import { ProjectCard } from "@/components/portfolio/project-card";
import { projects } from "@/lib/projects";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">
          作品集
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          這裡展示了我過去參與的部分專案，涵蓋了不同領域和技術的應用。
        </p>
      </div>

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
