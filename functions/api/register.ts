/**
 * POST /api/register - 處理報名提交
 */
interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json() as Record<string, any>;

    // Validate required fields
    const required = [
      "childName", "childGender", "childAge", "childBirthday",
      "childIdNumber", "jerseySize", "jerseyName", "jerseyNumber",
      "dietType", "guardianName", "guardianPhone",
      "emergencyName", "emergencyPhone", "parentLineId",
      "paymentLast5",
    ];

    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return Response.json({ error: `缺少必填欄位：${field}` }, { status: 400 });
      }
    }

    const stmt = env.DB.prepare(`
      INSERT INTO registrations (
        childName, childGender, childAge, childBirthday, childIdNumber,
        jerseySize, jerseyName, jerseyNumber,
        dietType, dietNote,
        guardianName, guardianPhone,
        emergencyName, emergencyPhone,
        parentLineId, paymentLast5, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      body.childName,
      body.childGender,
      body.childAge,
      body.childBirthday,
      body.childIdNumber,
      body.jerseySize,
      body.jerseyName,
      body.jerseyNumber,
      body.dietType,
      body.dietNote || null,
      body.guardianName,
      body.guardianPhone,
      body.emergencyName,
      body.emergencyPhone,
      body.parentLineId,
      body.paymentLast5,
      body.note || null,
    ).run();

    return Response.json({ success: true, message: "報名成功" });
  } catch (err: any) {
    console.error("Registration error:", err);
    return Response.json({ error: "伺服器錯誤：" + err.message }, { status: 500 });
  }
};
