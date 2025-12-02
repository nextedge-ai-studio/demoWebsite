"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Code,
  Database,
  Star,
  ArrowRight,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AnimatedHeroText } from "@/components/animated-hero-text";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    name: "前端開發",
    description: "JavaScript, HTML, CSS, React, Next.js",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    name: "後端工程",
    description: "PHP, Python, Node.js",
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    name: "資料庫管理",
    description: "MySQL, PostgreSQL, MongoDB",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    name: "全端框架",
    description: "Linux & Windows 環境開發",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const ctaRef = useRef(null);
  const unicornStudioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Unicorn Studio Script
    const initializeUnicornStudio = () => {
        if (window.UnicornStudio) {
            window.UnicornStudio.init({ hideMadeWith: true });
        }
    };

    if (!window.UnicornStudio) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js';
        script.onload = initializeUnicornStudio;
        document.body.appendChild(script);
    } else {
        initializeUnicornStudio();
    }
    
    const heroElements = heroRef.current;
    if (heroElements) {
       gsap.fromTo(
        (heroElements as HTMLElement).children,
        { autoAlpha: 0, y: 30 },
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
    
    const skillsElements = skillsRef.current;
    if (skillsElements) {
      const skillsTitle = (skillsElements as HTMLElement).querySelector(".skills-title");
      const skillsPara = (skillsElements as HTMLElement).querySelector(".skills-para");
      const skillCards = (skillsElements as HTMLElement).querySelectorAll(".skill-card");

      gsap.fromTo(
        [skillsTitle, skillsPara, ...Array.from(skillCards)],
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsElements,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    
    const ctaElements = ctaRef.current;
    if (ctaElements) {
      gsap.fromTo(
        (ctaElements as HTMLElement).children,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ctaElements,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <section className="relative w-full pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div 
            ref={unicornStudioRef}
            data-us-project="7i5VdQmvImX9y8oDeO2t"
            className="absolute inset-0 w-full h-full opacity-50"
        ></div>
        <div ref={heroRef} className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6 text-center flex flex-col items-center">
            <AnimatedHeroText />
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              我是王祥豪，一位對程式碼充滿熱情的全端工程師，專注於打造高效能且使用者友善的網頁應用。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">與我聯絡</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">
                  查看作品集 <ArrowRight />
                </Link>
              </Button>
            </div>
        </div>
      </section>
      
      <section ref={skillsRef} className="w-full py-16 sm:py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 w-full h-24 bg-transparent text-background -translate-y-px">
           <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full"><path d="M0,60 C300,0 1140,120 1440,60 V0 H0 Z" className="fill-current"></path></svg>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline skills-title">
            專業技能
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg skills-para">
            從前端到後端，從資料庫到伺服器，我具備構建完整解決方案的能力。
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <Card
                key={skill.name}
                className="bg-card/50 text-center transition-transform transform hover:-translate-y-2 skill-card"
              >
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {skill.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-headline">
                    {skill.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">
                    {skill.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
         <div className="absolute bottom-0 left-0 w-full h-24 bg-transparent text-background">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 C300,120 1140,0 1440,60 V120 H0 Z" className="fill-current"></path>
          </svg>
        </div>
      </section>

      <section className="w-full pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <div ref={ctaRef} className="mx-auto max-w-4xl flex flex-col items-center">
            <Globe className="h-12 w-12 text-primary" />
            <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              準備好開始您的下一個專案了嗎？
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              我熱衷於將創新的想法轉化為現實。無論是新創公司的產品原型，還是大型企業的系統升級，我都能提供專業的技術支援。
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">與我討論</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: (options?: { hideMadeWith?: boolean }) => void;
    };
  }
}
