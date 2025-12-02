"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="https://img.nextedge-ai-studio.com/logo.png" 
              alt="neXtedge AI studio Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 drop-shadow-primary" 
            />
            <p className="text-lg font-bold font-headline">neXtedge AI studio</p>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Wang Xiang-Hao. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/contact" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/tom851024?tab=repositories"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-not-allowed opacity-50">
                    <Linkedin className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>準備中</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
