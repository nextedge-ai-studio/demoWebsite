import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "nextedge.ai.studio@gmail.com",
  },
  {
    icon: Phone,
    label: "電話",
    value: "0920-371-507",
  },
  {
    icon: MapPin,
    label: "地點",
    value: "台灣，台中市",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Wang Xiang Hao",
    href: "https://github.com/tom851024?tab=repositories",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "準備中",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">
          聯絡我
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          我非常樂意聽到您的想法。無論是合作機會、技術交流，或只是單純打個招呼，都歡迎隨時與我聯繫。
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">聯絡資訊</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-3 rounded-md"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground">
                      {href ? (
                        <Link href={href} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                          {value}
                        </Link>
                      ) : (
                        value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
