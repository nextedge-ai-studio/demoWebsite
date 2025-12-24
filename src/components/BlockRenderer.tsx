"use client";

import Image from "next/image";
import { AlertTriangle } from "lucide-react";

// ===== 類型定義 =====
interface BaseBlock {
  type: string;
}

interface H1Block extends BaseBlock {
  type: "h1";
  data: {
    text: string;
  };
}

interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  data: {
    text: string;
  };
}

interface ImageBlock extends BaseBlock {
  type: "image";
  data: {
    src: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

interface VideoBlock extends BaseBlock {
  type: "video";
  data: {
    src: string;
    poster?: string;
    caption?: string;
  };
}

// 聯合類型：所有支援的 Block 類型
export type Block = H1Block | ParagraphBlock | ImageBlock | VideoBlock | BaseBlock;

// BlockRenderer 的 Props
interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

// ===== 個別 Block 渲染組件 =====

/** 大標題組件 */
const H1BlockComponent = ({ data }: { data: H1Block["data"] }) => {
  return (
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
      {data.text}
    </h1>
  );
};

/** 段落組件 */
const ParagraphBlockComponent = ({ data }: { data: ParagraphBlock["data"] }) => {
  return (
    <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4">
      {data.text}
    </p>
  );
};

/** 圖片組件 */
const ImageBlockComponent = ({ data }: { data: ImageBlock["data"] }) => {
  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={data.src}
          alt={data.alt || "圖片"}
          width={data.width || 800}
          height={data.height || 450}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      {data.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
};

/** 影片組件 */
const VideoBlockComponent = ({ data }: { data: VideoBlock["data"] }) => {
  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        <video
          src={data.src}
          poster={data.poster}
          controls
          className="w-full h-auto"
        >
          您的瀏覽器不支援 HTML5 影片。
        </video>
      </div>
      {data.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
};

/** 錯誤/未知類型提示組件 */
const UnknownBlockComponent = ({ type }: { type: string }) => {
  return (
    <div className="my-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-destructive">
          未知的區塊類型
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          無法渲染類型為 「<code className="bg-muted px-1 py-0.5 rounded">{type}</code>」 的區塊
        </p>
      </div>
    </div>
  );
};

// ===== 主要 BlockRenderer 組件 =====

/**
 * BlockRenderer - 動態渲染 Block JSON 資料為 UI 組件
 * 
 * @param blocks - Block 陣列，每個物件包含 type 和 data
 * @param className - 可選的額外 CSS class
 * 
 * @example
 * const blocks = [
 *   { type: 'h1', data: { text: '歡迎來到我的網站' } },
 *   { type: 'paragraph', data: { text: '這是一段介紹文字...' } },
 *   { type: 'image', data: { src: '/hero.jpg', caption: '主視覺圖' } }
 * ];
 * 
 * <BlockRenderer blocks={blocks} />
 */
export function BlockRenderer({ blocks, className = "" }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={`block-renderer ${className}`}>
      {blocks.map((block, index) => {
        const key = `block-${index}-${block.type}`;

        // 使用 Switch Case 結構處理不同類型
        switch (block.type) {
          case "h1":
            return (
              <H1BlockComponent
                key={key}
                data={(block as H1Block).data}
              />
            );

          case "paragraph":
            return (
              <ParagraphBlockComponent
                key={key}
                data={(block as ParagraphBlock).data}
              />
            );

          case "image":
            return (
              <ImageBlockComponent
                key={key}
                data={(block as ImageBlock).data}
              />
            );

          case "video":
            return (
              <VideoBlockComponent
                key={key}
                data={(block as VideoBlock).data}
              />
            );

          default:
            // 防錯處理：未知類型顯示錯誤提示
            return (
              <UnknownBlockComponent
                key={key}
                type={block.type}
              />
            );
        }
      })}
    </div>
  );
}

export default BlockRenderer;
