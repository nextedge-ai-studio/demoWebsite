export interface Project {
  id: string;
  title: string;
  imageId: string;
  initialDescription: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "電商平台儀表板",
    imageId: "project-1",
    initialDescription: "一個為線上零售設計的現代化儀表板，提供銷售分析、庫存管理和客戶關係工具。",
    tags: ["PHP", "JavaScript", "MySQL", "React"],
  },
  {
    id: "2",
    title: "社群媒體分析",
    imageId: "project-2",
    initialDescription: "一個數據驅動的分析平台，幫助品牌追踪和優化其在各大社群媒體上的表現。",
    tags: ["Python", "JavaScript", "Flask", "PostgreSQL"],
  },
  {
    id: "3",
    title: "企業形象網站",
    imageId: "project-3",
    initialDescription: "一個視覺豐富的企業登陸頁面，旨在吸引潛在客戶並傳達品牌價值。",
    tags: ["HTML", "CSS", "JavaScript", "Next.js"],
  },
  {
    id: "4",
    title: "個人技術部落格",
    imageId: "project-4",
    initialDescription: "一個簡潔、專注於內容的部落格平台，為技術愛好者提供分享知識和經驗的空間。",
    tags: ["PHP", "Laravel", "MySQL", "Vue.js"],
  },
];
