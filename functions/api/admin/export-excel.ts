/**
 * GET /api/admin/export-excel - 匯出報名資料為 Excel (.xlsx)
 * 使用純 JavaScript 生成簡易 xlsx（基於 XML SpreadsheetML）
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

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateXlsxXml(rows: Record<string, any>[]): string {
  const headers = [
    { key: "id", label: "編號" },
    { key: "childName", label: "小朋友姓名" },
    { key: "childGender", label: "性別" },
    { key: "childAge", label: "年齡" },
    { key: "childBirthday", label: "出生年月日" },
    { key: "childIdNumber", label: "身分證字號" },
    { key: "jerseySize", label: "球衣尺寸" },
    { key: "jerseyName", label: "球衣名字" },
    { key: "jerseyNumber", label: "球衣背號" },
    { key: "dietType", label: "用餐習慣" },
    { key: "dietNote", label: "飲食備註" },
    { key: "guardianName", label: "監護人姓名" },
    { key: "guardianPhone", label: "監護人電話" },
    { key: "emergencyName", label: "緊急聯絡人姓名" },
    { key: "emergencyPhone", label: "緊急聯絡人電話" },
    { key: "parentLineId", label: "家長Line ID/電話" },
    { key: "paymentLast5", label: "帳號後五碼" },
    { key: "note", label: "備註" },
    { key: "createdAt", label: "報名時間" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles>
 <Style ss:ID="header">
  <Font ss:Bold="1" ss:Size="12"/>
  <Interior ss:Color="#3FA9F5" ss:Pattern="Solid"/>
  <Font ss:Color="#FFFFFF" ss:Bold="1"/>
 </Style>
</Styles>
<Worksheet ss:Name="報名資料">
<Table>`;

  // Header row
  xml += "\n<Row>";
  for (const h of headers) {
    xml += `<Cell ss:StyleID="header"><Data ss:Type="String">${escapeXml(h.label)}</Data></Cell>`;
  }
  xml += "</Row>";

  // Data rows
  for (const row of rows) {
    xml += "\n<Row>";
    for (const h of headers) {
      const val = row[h.key] ?? "";
      const type = typeof val === "number" ? "Number" : "String";
      xml += `<Cell><Data ss:Type="${type}">${escapeXml(String(val))}</Data></Cell>`;
    }
    xml += "</Row>";
  }

  xml += `\n</Table>
</Worksheet>
</Workbook>`;

  return xml;
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

    const xml = generateXlsxXml(results as Record<string, any>[]);
    const encoder = new TextEncoder();
    const data = encoder.encode(xml);

    return new Response(data, {
      headers: {
        "Content-Type": "application/vnd.ms-excel",
        "Content-Disposition": `attachment; filename="registrations_${new Date().toISOString().slice(0, 10)}.xls"`,
      },
    });
  } catch (err: any) {
    return Response.json({ error: "匯出失敗：" + err.message }, { status: 500 });
  }
};
