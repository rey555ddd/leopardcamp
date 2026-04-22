/**
 * 後台 - 報名資料查看頁面（含 Excel 匯出）
 * Cloudflare 版本 - 使用原生 fetch API
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/leopard_logo_f5505ee4.png";

interface Registration {
  id: number;
  childName: string;
  childGender: string;
  childAge: number;
  childBirthday: string;
  childIdNumber: string;
  jerseySize: string;
  jerseyName: string;
  jerseyNumber: string;
  dietType: string;
  dietNote: string | null;
  guardianName: string;
  guardianPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  parentLineId: string;
  paymentLast5: string | null;
  note: string | null;
  createdAt: string;
}

export default function AdminRegistrations() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`確定要刪除「#${id} ${name}」的報名資料嗎？此操作無法復原。`)) return;
    setDeletingId(id);
    try {
      const token = sessionStorage.getItem("admin-token");
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "刪除失敗");
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert("刪除失敗：" + (err.message || "請重試"));
    } finally {
      setDeletingId(null);
    }
  };

  // Check if already logged in
  useEffect(() => {
    const token = sessionStorage.getItem("admin-token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch registrations when logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    const token = sessionStorage.getItem("admin-token");
    setIsLoading(true);
    fetch("/api/admin/registrations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("載入失敗");
        return res.json();
      })
      .then((data) => {
        setRegistrations(data.registrations || []);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        if (err.message.includes("401") || err.message.includes("Unauthorized")) {
          sessionStorage.removeItem("admin-token");
          setIsLoggedIn(false);
        }
      })
      .finally(() => setIsLoading(false));
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "登入失敗");
      sessionStorage.setItem("admin-token", data.token);
      setIsLoggedIn(true);
    } catch (err: any) {
      setLoginError(err.message || "登入失敗");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-token");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setRegistrations([]);
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const token = sessionStorage.getItem("admin-token");
      const res = await fetch("/api/admin/export-excel", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("匯出失敗");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `報名資料_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("匯出失敗：" + (err.message || "未知錯誤"));
    } finally {
      setExporting(false);
    }
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src={LOGO} alt="Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-black text-gray-900">後台管理登入</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">帳號</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3FA9F5] focus:outline-none transition-colors"
                placeholder="請輸入管理員帳號"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3FA9F5] focus:outline-none transition-colors"
                placeholder="請輸入管理員密碼"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-[#3FA9F5] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#2a8fd4] transition-colors disabled:opacity-50"
            >
              {loggingIn ? "登入中..." : "登入"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gray-500 hover:text-[#3FA9F5] text-sm transition-colors">
              ← 返回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-lg font-black text-gray-900">後台管理</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-[#3FA9F5] font-semibold text-sm transition-colors">
              ← 返回首頁
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
            >
              登出
            </button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">報名資料管理</h1>
            <p className="text-gray-600">
              共 {registrations.length} 筆報名資料
            </p>
          </div>
          {registrations.length > 0 && (
            <button
              onClick={handleExportExcel}
              disabled={exporting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {exporting ? "匯出中..." : "一鍵匯出 Excel"}
            </button>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#3FA9F5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">載入報名資料中...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            載入失敗：{error}
          </div>
        )}

        {!isLoading && !error && registrations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">目前尚無報名資料</p>
          </div>
        )}

        {registrations.length > 0 && (
          <div className="space-y-6">
            {registrations.map((reg) => (
              <div key={reg.id} className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border-l-4 border-[#3FA9F5]">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <h3 className="text-xl font-black text-gray-900">
                    #{reg.id} {reg.childName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      {new Date(reg.createdAt).toLocaleString("zh-TW")}
                    </span>
                    <button
                      onClick={() => handleDelete(reg.id, reg.childName)}
                      disabled={deletingId === reg.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      {deletingId === reg.id ? "刪除中…" : "🗑 刪除"}
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">性別：</span>
                    <span className="font-semibold text-gray-900">{reg.childGender}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">年齡：</span>
                    <span className="font-semibold text-gray-900">{reg.childAge} 歲</span>
                  </div>
                  <div>
                    <span className="text-gray-500">生日：</span>
                    <span className="font-semibold text-gray-900">{reg.childBirthday}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">身分證：</span>
                    <span className="font-semibold text-gray-900">{reg.childIdNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">球衣尺寸：</span>
                    <span className="font-semibold text-gray-900">{reg.jerseySize}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">球衣名字：</span>
                    <span className="font-semibold text-gray-900">{reg.jerseyName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">球衣背號：</span>
                    <span className="font-semibold text-gray-900">{reg.jerseyNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">用餐：</span>
                    <span className="font-semibold text-gray-900">{reg.dietType}{reg.dietNote ? `（${reg.dietNote}）` : ""}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">監護人：</span>
                    <span className="font-semibold text-gray-900">{reg.guardianName} / {reg.guardianPhone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">緊急聯絡人：</span>
                    <span className="font-semibold text-gray-900">{reg.emergencyName} / {reg.emergencyPhone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Line ID：</span>
                    <span className="font-semibold text-gray-900">{reg.parentLineId}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">帳號後五碼：</span>
                    <span className={`font-semibold ${reg.paymentLast5 ? "text-green-700" : "text-gray-400"}`}>
                      {reg.paymentLast5 || "未填寫"}
                    </span>
                  </div>
                  {reg.note && (
                    <div className="sm:col-span-2 lg:col-span-3">
                      <span className="text-gray-500">備註：</span>
                      <span className="font-semibold text-gray-900">{reg.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
