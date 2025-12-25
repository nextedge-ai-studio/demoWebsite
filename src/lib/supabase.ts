import { createClient } from "@supabase/supabase-js";

// 環境變數
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Supabase Admin 客戶端
 * 使用 Service Role Key，具有完整權限，僅限伺服器端使用
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
