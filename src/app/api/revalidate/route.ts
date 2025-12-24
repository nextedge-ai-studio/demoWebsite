import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// ===== 類型定義 =====

/** Request Body 的型別 */
interface RevalidateRequestBody {
    path: string;
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

        const { path } = body;

        // 驗證必要欄位
        if (!path || typeof path !== "string") {
            return errorResponse("Missing or invalid 'path' field", 400);
        }

        // 4. 觸發 ISR 重新驗證
        try {
            revalidatePath(path);
        } catch (revalidateError) {
            console.error("[Revalidate API] Revalidation error:", revalidateError);
            return errorResponse("Failed to revalidate path", 500);
        }

        // 5. 回傳成功結果
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

// ===== GET 請求處理 (用於健康檢查) =====

export async function GET() {
    return NextResponse.json({
        status: "ok",
        message: "ISR Revalidation API is running",
    });
}
