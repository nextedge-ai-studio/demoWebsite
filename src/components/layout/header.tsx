"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/about", label: "關於我" },
  { href: "/portfolio", label: "作品集" },
  { href: "/blog", label: "部落格" },
  { href: "/contact", label: "聯絡我" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "transition-colors hover:text-primary",
          isActive ? "text-primary font-semibold" : "text-muted-foreground",
          className
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
             <Image 
                src="https://img.nextedge-ai-studio.com/logo.png" 
                alt="neXtedge AI studio Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8 drop-shadow-primary" 
             />
            <span className="font-bold font-headline text-lg">neXtedge AI studio</span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex ml-10">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                    <Image 
                      src="https://img.nextedge-ai-studio.com/logo.png" 
                      alt="neXtedge AI studio Logo" 
                      width={32} 
                      height={32} 
                      className="h-8 w-8 drop-shadow-primary" 
                    />
                    <span className="font-bold font-headline text-lg">neXtedge AI studio</span>
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close Menu</span>
                      </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} className="text-lg" />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
