/**
 * GET /api/admin/registrations - 取得所有報名資料
 */
interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
}

function verifyToken(authHeader: string | null, env: Env): boolean {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  try {
    const decoded = atob(token);
    const [user] = decoded.split(":");
    return user === (env.ADMIN_USERNAME || "ABC2026");
  } catch {
    return false;
  }
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!verifyToken(request.headers.get("Authorization"), env)) {
    return Response.json({ error: "未授權" }, { status: 401 });
  }

  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM registrations ORDER BY id DESC"
    ).all();

    return Response.json({ registrations: results });
  } catch (err: any) {
    return Response.json({ error: "查詢失敗：" + err.message }, { status: 500 });
  }
};
