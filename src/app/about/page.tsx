import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Code2, GraduationCap } from "lucide-react";

export default function AboutPage() {
  const avatarImage = PlaceHolderImages.find((img) => img.id === "avatar");

  const experiences = [
    {
      role: "網頁全端工程師",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description:
        "主導核心產品的開發與維護，涵蓋前後端、資料庫設計及系統架構優化，成功提升系統效能30%。",
    },
    {
      role: "後端工程師",
      company: "Web Innovators Co.",
      period: "2019 - 2021",
      description:
        "專注於後端 API 開發與資料庫管理，使用 PHP 和 Python 構建高穩定性、高可用性的服務。",
    },
  ];
  
  const skillSet = [
    "PHP", "JavaScript", "React", "Next.js", "Node.js", "Python", 
    "MySQL", "PostgreSQL", "HTML/CSS", "Linux", "Docker", "Git"
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">
          關於我
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          一位對程式碼充滿熱情的全端工程師，專注於打造高效能且使用者友善的網頁應用。
        </p>
      </div>

      <div className="flex flex-col items-center gap-12">
        <Card className="w-full max-w-4xl overflow-hidden md:flex">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            {avatarImage && (
              <Image
                src={avatarImage.imageUrl}
                alt="王祥豪"
                fill
                className="object-cover"
                data-ai-hint={avatarImage.imageHint}
              />
            )}
          </div>
          <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold font-headline">王祥豪</h2>
            <p className="text-primary font-semibold mt-1">全端工程師</p>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-5 w-5" />
              <p>東海大學 資訊工程學系</p>
            </div>
            <p className="mt-4 text-foreground/80">
              擁有超過五年的專業開發經驗，我對於學習新技術及解決複雜問題抱持著極大的熱情。我相信好的軟體不僅功能強大，更應該帶來卓越的使用者體驗。
            </p>
          </div>
        </Card>

        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="font-headline text-2xl">工作經歷</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-primary" />
                  <p className="font-semibold">{exp.role}</p>
                  <p className="text-sm text-primary/80">{exp.company} / {exp.period}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                 <Code2 className="h-6 w-6 text-primary" />
                <span className="font-headline text-2xl">技術棧</span>
              </CardTitle>
              <CardDescription>
                我擅長使用多種技術來解決問題，並持續學習新知。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillSet.map((skill) => (
                  <div key={skill} className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
