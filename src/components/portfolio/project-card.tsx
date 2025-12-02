"use client";

import Image from "next/image";
import { type Project } from "@/lib/projects";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

interface ProjectCardProps {
  project: Project;
  imagePlaceholder: ImagePlaceholder;
}

export function ProjectCard({ project, imagePlaceholder }: ProjectCardProps) {
  const { title, initialDescription, tags } = project;

  return (
    <Card className="flex flex-col overflow-hidden group">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={imagePlaceholder.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            crossOrigin="anonymous"
            data-ai-hint={imagePlaceholder.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        <p className="mt-3 text-muted-foreground">{initialDescription}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
