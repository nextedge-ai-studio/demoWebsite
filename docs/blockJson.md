# Block JSON 格式規範

此文件說明 `BlockRenderer` 組件所支援的所有 Block 類型及其 JSON 格式。

---

## 目錄

- [H1 大標題](#1-h1-大標題)
- [Paragraph 段落](#2-paragraph-段落)
- [Image 圖片](#3-image-圖片)
- [Video 影片](#4-video-影片)
- [完整範例](#完整範例)

---

## 1. H1 大標題

渲染為大標題，使用粗體與較大字體。

### 格式

```json
{
  "type": "h1",
  "data": {
    "text": "這是大標題文字"
  }
}
```

### 欄位說明

| 欄位 | 類型 | 必填 | 說明 |
|------|------|:----:|------|
| `type` | `string` | ✅ | 固定為 `"h1"` |
| `data.text` | `string` | ✅ | 標題內容 |

---

## 2. Paragraph 段落

渲染為一般段落文字，具有適當的行距。

### 格式

```json
{
  "type": "paragraph",
  "data": {
    "text": "這是一段內文，可以包含很長的文字內容..."
  }
}
```

### 欄位說明

| 欄位 | 類型 | 必填 | 說明 |
|------|------|:----:|------|
| `type` | `string` | ✅ | 固定為 `"paragraph"` |
| `data.text` | `string` | ✅ | 段落內容 |

---

## 3. Image 圖片

使用 Next.js 的 `Image` 組件渲染圖片，支援可選的說明文字。

### 格式

```json
{
  "type": "image",
  "data": {
    "src": "/images/hero.jpg",
    "alt": "主視覺圖片",
    "caption": "這是圖片說明文字",
    "width": 800,
    "height": 450
  }
}
```

### 欄位說明

| 欄位 | 類型 | 必填 | 預設值 | 說明 |
|------|------|:----:|--------|------|
| `type` | `string` | ✅ | - | 固定為 `"image"` |
| `data.src` | `string` | ✅ | - | 圖片路徑或完整 URL |
| `data.alt` | `string` | ❌ | `"圖片"` | 圖片替代文字 (accessibility) |
| `data.caption` | `string` | ❌ | - | 圖片下方說明文字 |
| `data.width` | `number` | ❌ | `800` | 圖片寬度 (px) |
| `data.height` | `number` | ❌ | `450` | 圖片高度 (px) |

---

## 4. Video 影片

渲染為 HTML5 video 元素，支援封面圖片與說明文字。

### 格式

```json
{
  "type": "video",
  "data": {
    "src": "/videos/demo.mp4",
    "poster": "/images/video-cover.jpg",
    "caption": "產品展示影片"
  }
}
```

### 欄位說明

| 欄位 | 類型 | 必填 | 說明 |
|------|------|:----:|------|
| `type` | `string` | ✅ | 固定為 `"video"` |
| `data.src` | `string` | ✅ | 影片路徑或完整 URL |
| `data.poster` | `string` | ❌ | 影片封面圖片（播放前顯示） |
| `data.caption` | `string` | ❌ | 影片下方說明文字 |

---

## 完整範例

以下是一個包含多種 Block 類型的完整 JSON 陣列範例：

```json
[
  {
    "type": "h1",
    "data": {
      "text": "我的網站介紹"
    }
  },
  {
    "type": "paragraph",
    "data": {
      "text": "歡迎來到我們的網站！這裡提供最新的科技資訊與產品介紹。"
    }
  },
  {
    "type": "image",
    "data": {
      "src": "/images/product.jpg",
      "alt": "產品照片",
      "caption": "2024 年最新產品",
      "width": 1200,
      "height": 675
    }
  },
  {
    "type": "paragraph",
    "data": {
      "text": "以下影片將為您詳細介紹產品功能。"
    }
  },
  {
    "type": "video",
    "data": {
      "src": "/videos/product-demo.mp4",
      "poster": "/images/video-poster.jpg",
      "caption": "產品功能介紹"
    }
  }
]
```

---

## 未知類型處理

當遇到未定義的 `type` 時，`BlockRenderer` 會自動渲染一個錯誤提示組件，顯示：

- ⚠️ 警告圖示
- 「未知的區塊類型」錯誤訊息
- 該未知的 type 值

這確保了即使接收到錯誤的資料，頁面也不會崩潰。

---

## 擴展指南

如需新增 Block 類型，請參考 `BlockRenderer.tsx` 中的註解說明，或聯繫開發團隊。
