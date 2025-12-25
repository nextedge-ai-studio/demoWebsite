import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../../lib/supabase";

// ===== 類型定義 =====

/** Request Body 的型別 */
interface RevalidateRequestBody {
    path: string;
    content?: Record<string, unknown>;
}

// ===== 錯誤回應輔助函式 =====

function errorResponse(message: string, status: number) {
    return NextResponse.json(
        { error: message, revalidated: false },
        { status }
    );
}

// ===== API 路由處理 =====

export async function POST(request: NextRequest) {
    try {
        // 1. 讀取環境變數
        const GLOBAL_ISR_SECRET = process.env.GLOBAL_ISR_SECRET;

        // 檢查必要的環境變數
        if (!GLOBAL_ISR_SECRET) {
            console.error("[Revalidate API] Missing GLOBAL_ISR_SECRET");
            return errorResponse("Server configuration error", 500);
        }

        // 2. 驗證 Global Secret (從 Header)
        const globalSecret = request.headers.get("X-Global-Secret");

        if (!globalSecret) {
            return errorResponse("Missing X-Global-Secret header", 401);
        }

        if (globalSecret !== GLOBAL_ISR_SECRET) {
            return errorResponse("Invalid global secret", 403);
        }

        // 3. 解析 Request Body
        let body: RevalidateRequestBody;

        try {
            body = await request.json();
        } catch {
            return errorResponse("Invalid JSON body", 400);
        }

        const { path, content } = body;

        // 驗證必要欄位
        if (!path || typeof path !== "string") {
            return errorResponse("Missing or invalid 'path' field", 400);
        }

        if (!content || typeof content !== "object") {
            return errorResponse("Missing or invalid 'content' field", 400);
        }

        // 4. 儲存內容到 Supabase (Upsert)
        const { error: supabaseError } = await supabaseAdmin
            .from("pushed_content_cache")
            .upsert(
                { path, content },
                { onConflict: "path" }
            );

        if (supabaseError) {
            console.error("[Revalidate API] Supabase error:", supabaseError);
            return NextResponse.json(
                {
                    error: "Failed to update content cache",
                    revalidated: false,
                    details: supabaseError.message,
                    hint: supabaseError.hint || "Check if table exists and env vars are set"
                },
                { status: 500 }
            );
        }

        // 5. 觸發 ISR 重新驗證
        try {
            revalidatePath(path);
        } catch (revalidateError) {
            console.error("[Revalidate API] Revalidation error:", revalidateError);
            return errorResponse("Failed to revalidate path", 500);
        }

        // 6. 回傳成功結果
        return NextResponse.json({
            revalidated: true,
            path,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error("[Revalidate API] Unexpected error:", error);
        return errorResponse("Internal server error", 500);
    }
}

// ===== GET 請求處理 =====

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    // 如果沒有 path 參數，回傳健康檢查
    if (!path) {
        return NextResponse.json({
            status: "ok",
            message: "ISR Revalidation API is running",
            usage: "Add ?path=/your-path to fetch content",
        });
    }

    // 從 Supabase 取得內容
    const { data, error } = await supabaseAdmin
        .from("pushed_content_cache")
        .select("path, content, updated_at")
        .eq("path", path)
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return NextResponse.json(
                { error: "Content not found for this path" },
                { status: 404 }
            );
        }
        console.error("[Revalidate API] Supabase fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch content" },
            { status: 500 }
        );
    }

    return NextResponse.json({
        path: data.path,
        content: data.content,
        updated_at: data.updated_at,
    });
}
