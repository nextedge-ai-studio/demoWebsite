# API 文件

本文件說明專案中所有 API 路由的使用方式。

---

## 目錄

- [ISR Revalidation API](#isr-revalidation-api)
  - [POST /api/revalidate](#post-apirevalidate)
  - [GET /api/revalidate](#get-apirevalidate)

---

## ISR Revalidation API

用於觸發 Next.js 增量靜態再生 (ISR) 並更新內容快取。

**路徑**: `/api/revalidate`

---

### POST /api/revalidate

觸發指定路徑的 ISR 重新驗證，並將內容儲存至 Supabase。

#### 請求

##### Headers

| 名稱 | 類型 | 必填 | 說明 |
|------|------|:----:|------|
| `Content-Type` | `string` | ✅ | 必須為 `application/json` |
| `X-Global-Secret` | `string` | ✅ | 全域驗證密鑰 |

##### Body

```json
{
  "path": "/blog/post-1",
  "content": {
    "title": "文章標題",
    "body": "文章內容..."
  }
}
```

| 欄位 | 類型 | 必填 | 說明 |
|------|------|:----:|------|
| `path` | `string` | ✅ | 要重新驗證的頁面路徑 |
| `content` | `object` | ✅ | 要儲存至 Supabase 的 JSON 內容 |

#### 回應

##### 成功 (200)

```json
{
  "revalidated": true,
  "path": "/blog/post-1",
  "timestamp": "2024-12-22T07:00:00.000Z"
}
```

##### 錯誤回應

| 狀態碼 | 錯誤訊息 | 說明 |
|:------:|----------|------|
| `400` | `Invalid JSON body` | 請求 Body 不是有效的 JSON |
| `400` | `Missing or invalid 'path' field` | 缺少 path 欄位或格式錯誤 |
| `400` | `Missing or invalid 'content' field` | 缺少 content 欄位或格式錯誤 |
| `401` | `Missing X-Global-Secret header` | 缺少全域密鑰 Header |
| `403` | `Invalid global secret` | 全域密鑰驗證失敗 |
| `500` | `Server configuration error` | 伺服器環境變數未設定 |
| `500` | `Failed to update content cache` | Supabase 寫入失敗 |
| `500` | `Failed to revalidate path` | ISR 重新驗證失敗 |
| `500` | `Internal server error` | 未預期的伺服器錯誤 |

#### 範例

##### cURL

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "X-Global-Secret: your_global_secret" \
  -d '{
    "path": "/blog/post-1",
    "content": {
      "title": "Hello World",
      "blocks": [
        { "type": "h1", "data": { "text": "歡迎" } },
        { "type": "paragraph", "data": { "text": "這是內容..." } }
      ]
    }
  }'
```

##### JavaScript (fetch)

```javascript
const response = await fetch('/api/revalidate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Global-Secret': process.env.GLOBAL_ISR_SECRET,
  },
  body: JSON.stringify({
    path: '/blog/post-1',
    content: {
      title: 'Hello World',
      blocks: [],
    },
  }),
});

const data = await response.json();
console.log(data); // { revalidated: true, path: '/blog/post-1', timestamp: '...' }
```

---

### GET /api/revalidate

此端點有兩種用途：

1. **健康檢查** - 不帶任何參數時，回傳 API 狀態
2. **取得內容** - 帶 `path` 參數時，從 Supabase 取得該路徑的內容

---

#### 用法 1：健康檢查

```bash
curl https://your-domain.com/api/revalidate
```

##### 回應 (200)

```json
{
  "status": "ok",
  "message": "ISR Revalidation API is running",
  "usage": "Add ?path=/your-path to fetch content"
}
```

---

#### 用法 2：取得內容

##### 請求

```bash
curl https://your-domain.com/api/revalidate?path=/portfolio
```

| 參數 | 類型 | 必填 | 說明 |
|------|------|:----:|------|
| `path` | `string` | ✅ | 要取得內容的頁面路徑 |

##### 成功回應 (200)

```json
{
  "path": "/portfolio",
  "content": {
    "title": "我的作品集",
    "blocks": [...]
  },
  "updated_at": "2024-12-25T06:00:00.000Z"
}
```

##### 錯誤回應

| 狀態碼 | 錯誤訊息 | 說明 |
|:------:|----------|------|
| `404` | `Content not found for this path` | 該路徑尚無內容 |
| `500` | `Failed to fetch content` | Supabase 讀取失敗 |

---

## 驗證機制說明

此 API 採用單一密鑰驗證：

### X-Global-Secret (全域密鑰)

- **來源**: 環境變數 `GLOBAL_ISR_SECRET`
- **用途**: 驗證請求來源的合法性，阻擋未授權的外部請求
- **範例**: `my-super-secret-key-12345`

### 驗證流程

```
請求進入
    │
    ▼
┌───────────────────────┐
│ 驗證 X-Global-Secret  │
│ (Header vs 環境變數)   │
└───────────────────────┘
    │
    ├──✗──▶ 401/403 錯誤
    │
    │ ✓
    ▼
  繼續處理請求
```

---

## 環境變數

使用此 API 需要設定以下環境變數：

```env
# Supabase 連線
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ISR 驗證
GLOBAL_ISR_SECRET=your-global-secret-key
```

---

## Supabase 資料表

### pushed_content_cache

儲存推送的內容快取。

```sql
CREATE TABLE pushed_content_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 相關檔案

- [route.ts](../src/app/api/revalidate/route.ts) - API 路由實作
- [supabase.ts](../src/lib/supabase.ts) - Supabase 客戶端
