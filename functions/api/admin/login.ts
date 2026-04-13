/**
 * POST /api/admin/login - 管理員登入
 */
interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const { username, password } = await request.json() as { username: string; password: string };

    const adminUser = env.ADMIN_USERNAME || "ABC2026";
    const adminPass = env.ADMIN_PASSWORD || "2026ABC";

    if (username !== adminUser || password !== adminPass) {
      return Response.json({ error: "帳號或密碼錯誤" }, { status: 401 });
    }

    // Simple token: base64 encode username + timestamp
    const token = btoa(`${adminUser}:${Date.now()}`);

    return Response.json({ success: true, token });
  } catch (err: any) {
    return Response.json({ error: "登入失敗：" + err.message }, { status: 500 });
  }
};
