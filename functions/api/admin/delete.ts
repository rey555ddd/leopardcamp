/**
 * POST /api/admin/delete - 刪除報名資料
 * Body: { id: number }
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!verifyToken(request.headers.get("Authorization"), env)) {
    return Response.json({ error: "未授權" }, { status: 401 });
  }

  try {
    const { id } = await request.json() as { id?: number };
    if (!id || !Number.isInteger(id)) {
      return Response.json({ error: "缺少或無效的 id" }, { status: 400 });
    }

    const result = await env.DB.prepare(
      "DELETE FROM registrations WHERE id = ?"
    ).bind(id).run();

    if (!result.success) {
      return Response.json({ error: "刪除失敗" }, { status: 500 });
    }

    return Response.json({ success: true, id });
  } catch (err: any) {
    return Response.json({ error: "刪除失敗：" + err.message }, { status: 500 });
  }
};
