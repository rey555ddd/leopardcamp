/**
 * 報名問卷頁面 - Cloudflare 版本
 * 使用原生 fetch API 取代 tRPC
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/leopard_logo_f5505ee4.png";

const JERSEY_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

const initialForm = {
  childName: "",
  childGender: "",
  childAge: "",
  childBirthday: "",
  childIdNumber: "",
  jerseySize: "",
  jerseyName: "",
  jerseyNumber: "",
  dietType: "",
  dietNote: "",
  guardianName: "",
  guardianPhone: "",
  emergencyName: "",
  emergencyPhone: "",
  parentLineId: "",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.childName.trim()) errs.childName = "請填寫小朋友姓名";
    if (!form.childGender) errs.childGender = "請選擇性別";
    if (!form.childAge || isNaN(Number(form.childAge))) errs.childAge = "請填寫年齡";
    if (!form.childBirthday) errs.childBirthday = "請填寫出生年月日";
    if (!form.childIdNumber.trim()) errs.childIdNumber = "請填寫身分證字號";
    if (!form.jerseySize) errs.jerseySize = "請選擇球衣尺寸";
    if (!form.jerseyName.trim()) errs.jerseyName = "請填寫球衣名字";
    if (!form.jerseyNumber.trim()) errs.jerseyNumber = "請填寫球衣背號";
    if (!form.dietType) errs.dietType = "請選擇用餐習慣";
    if (form.dietType === "其他" && !form.dietNote.trim()) errs.dietNote = "請填寫飲食說明";
    if (!form.guardianName.trim()) errs.guardianName = "請填寫監護人姓名";
    if (!form.guardianPhone.trim()) errs.guardianPhone = "請填寫監護人電話";
    if (!form.emergencyName.trim()) errs.emergencyName = "請填寫緊急聯絡人姓名";
    if (!form.emergencyPhone.trim()) errs.emergencyPhone = "請填寫緊急聯絡人電話";
    if (!form.parentLineId.trim()) errs.parentLineId = "請填寫 Line ID 或電話號碼";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("請檢查並填寫所有必填欄位");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          childAge: Number(form.childAge),
          dietNote: form.dietNote || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "報名失敗");
      setSubmitted(true);
      toast.success("報名成功！");
    } catch (err: any) {
      toast.error("報名失敗：" + (err.message || "未知錯誤"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const ACCOUNT = "440540628159";
    const copyAccount = async () => {
      try {
        await navigator.clipboard.writeText(ACCOUNT);
        toast.success("帳號已複製");
      } catch {
        toast.error("複製失敗，請手動複製");
      }
    };
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-lg w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">報名成功！</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              感謝您報名 2026 豹子腿棒球夏令營！<br />
              請依下方資訊完成匯款，我們會透過 Line 聯繫確認。
            </p>
          </div>

          {/* 匯款資訊 */}
          <div className="bg-gradient-to-br from-[#3FA9F5]/10 to-[#FCEE21]/10 border-2 border-[#3FA9F5]/20 rounded-xl p-5 sm:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💰</span>
              <h3 className="text-lg font-black text-gray-900">匯款資訊</h3>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-500 text-center mb-3">活動費用（每位學員）</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#FCEE21]/30 to-[#FCEE21]/10 border-2 border-[#FCEE21] rounded-lg p-3 text-center relative">
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FCEE21] text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">早鳥優惠</span>
                  <p className="text-2xl font-black text-gray-900 mt-1">NT$ 11,500</p>
                  <p className="text-[11px] text-gray-600 mt-1">5 / 20 前完成匯款</p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gray-500 font-bold mb-1">原價</p>
                  <p className="text-2xl font-black text-gray-700 mt-1">NT$ 12,800</p>
                  <p className="text-[11px] text-gray-600 mt-1">6 / 15 前完成匯款</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">2026 / 7 / 23 – 7 / 26　四日營</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-start gap-3">
                <span className="text-gray-500 shrink-0">銀行</span>
                <span className="font-bold text-gray-900 text-right">（822）中國信託　中華分行</span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-gray-500 shrink-0">戶名</span>
                <span className="font-bold text-gray-900 text-right">豹子腿工作室</span>
              </div>
              <div className="flex justify-between items-center gap-3">
                <span className="text-gray-500 shrink-0">帳號</span>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="font-mono font-bold text-gray-900 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 px-3 py-1 rounded flex items-center gap-2 transition-colors"
                  title="點擊複製帳號"
                >
                  <span className="tracking-wider">4405-4062-8159</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#3FA9F5]/20 text-xs text-gray-600 leading-relaxed space-y-1">
              <p>📌 <strong>匯款備註</strong>請填小朋友姓名，方便對帳</p>
              <p>✉️ 聯絡信箱：fcy0129@yahoo.com</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center bg-[#3FA9F5] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2a8fd4] transition-colors">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const fieldClass = (name: string) =>
    `w-full px-4 py-3 rounded-lg border-2 ${errors[name] ? "border-red-400 bg-red-50" : "border-gray-200"} focus:border-[#3FA9F5] focus:outline-none transition-colors`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-lg font-black text-gray-900">豹子腿棒球夏令營</span>
          </Link>
          <Link to="/" className="text-gray-600 hover:text-[#3FA9F5] font-semibold text-sm transition-colors">
            ← 返回首頁
          </Link>
        </div>
      </div>

      <div className="container py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">2026 豹子腿棒球夏令營報名表</h1>
            <p className="text-gray-600">請填寫以下資料完成報名，所有欄位皆為必填</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: 小朋友基本資料 */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#3FA9F5] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                小朋友基本資料
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">姓名 *</label>
                  <input type="text" name="childName" value={form.childName} onChange={handleChange} className={fieldClass("childName")} placeholder="請輸入小朋友姓名" />
                  {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">性別 *</label>
                    <select name="childGender" value={form.childGender} onChange={handleChange} className={fieldClass("childGender")}>
                      <option value="">請選擇</option>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                    {errors.childGender && <p className="text-red-500 text-xs mt-1">{errors.childGender}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">年齡 *</label>
                    <input type="number" name="childAge" value={form.childAge} onChange={handleChange} className={fieldClass("childAge")} placeholder="例：10" min="8" max="16" />
                    {errors.childAge && <p className="text-red-500 text-xs mt-1">{errors.childAge}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">出生年月日 *</label>
                  <input type="date" name="childBirthday" value={form.childBirthday} onChange={handleChange} className={fieldClass("childBirthday")} min="2010-01-01" max="2018-08-31" />
                  <p className="text-xs text-gray-500 mt-1">
                    保團體保險時使用。僅接受 2010/01/01 至 2018/08/31 出生（即年滿 8~16 歲，至少於 2026/08/31 前滿 8 歲）的學員報名。
                  </p>
                  {errors.childBirthday && <p className="text-red-500 text-xs mt-1">{errors.childBirthday}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">身分證字號 *</label>
                  <input type="text" name="childIdNumber" value={form.childIdNumber} onChange={handleChange} className={fieldClass("childIdNumber")} placeholder="保險用途" />
                  <p className="text-xs text-gray-500 mt-1">僅供保團體保險使用，不做其他用途。</p>
                  {errors.childIdNumber && <p className="text-red-500 text-xs mt-1">{errors.childIdNumber}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: 客製球衣資訊 */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#FCEE21] text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                客製球衣資訊
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800 font-semibold mb-2">尺寸表參考說明</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  請留意尺寸表參考！因客製化無法退換貨！<br />
                  0=XL；X0=XXL；X02=3XL；X03=4XL；X04=5XL；X05=6XL。<br />
                  以下表格上的數字都是英吋，1 英吋 = 2.54 公分。<br />
                  家長可以實際丈量孩子的胸圍，可對應左邊「全扣上衣」表格中的「胸圍(實量)」的尺寸，尺寸請寫尺碼(XXS~X05)；<br />
                  或是右邊表格「開全扣」最左行的括號中的數字(即120(24")中的24"，代表孩子胸圍實量為24吋)，可忽略「完成胸圍」那一格，尺寸請寫120/130/140。
                </p>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">球衣尺寸 *</label>
                  <select name="jerseySize" value={form.jerseySize} onChange={handleChange} className={fieldClass("jerseySize")}>
                    <option value="">請選擇尺寸</option>
                    {JERSEY_SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="120">120</option>
                    <option value="130">130</option>
                    <option value="140">140</option>
                    <option value="150">150</option>
                  </select>
                  {errors.jerseySize && <p className="text-red-500 text-xs mt-1">{errors.jerseySize}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">球衣上的名字 *</label>
                    <input type="text" name="jerseyName" value={form.jerseyName} onChange={handleChange} className={fieldClass("jerseyName")} placeholder="可以跟姓名不同" />
                    <p className="text-xs text-gray-500 mt-1">印在球衣上的名字，可以跟本名不同</p>
                    {errors.jerseyName && <p className="text-red-500 text-xs mt-1">{errors.jerseyName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">球衣背號 *</label>
                    <input type="text" name="jerseyNumber" value={form.jerseyNumber} onChange={handleChange} className={fieldClass("jerseyNumber")} placeholder="例：17" />
                    {errors.jerseyNumber && <p className="text-red-500 text-xs mt-1">{errors.jerseyNumber}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: 用餐習慣 */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#3FA9F5] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                用餐習慣
              </h2>
              <p className="text-xs text-gray-500 mb-4">餐點會以健康餐盒為主</p>
              <div className="space-y-4">
                <div className="flex gap-6">
                  {["葷食", "素食", "其他"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dietType"
                        value={opt}
                        checked={form.dietType === opt}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#3FA9F5]"
                      />
                      <span className="text-gray-700 font-semibold">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.dietType && <p className="text-red-500 text-xs">{errors.dietType}</p>}
                {form.dietType === "其他" && (
                  <div>
                    <textarea
                      name="dietNote"
                      value={form.dietNote}
                      onChange={handleChange}
                      className={fieldClass("dietNote")}
                      placeholder="請說明飲食需求，如：不吃牛；對花生/堅果類過敏等"
                      rows={3}
                    />
                    {errors.dietNote && <p className="text-red-500 text-xs mt-1">{errors.dietNote}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: 聯絡人資訊 */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#FCEE21] text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                聯絡人資訊
              </h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">監護人姓名 *</label>
                    <input type="text" name="guardianName" value={form.guardianName} onChange={handleChange} className={fieldClass("guardianName")} placeholder="監護人姓名" />
                    {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">監護人電話 *</label>
                    <input type="tel" name="guardianPhone" value={form.guardianPhone} onChange={handleChange} className={fieldClass("guardianPhone")} placeholder="09XX-XXX-XXX" />
                    {errors.guardianPhone && <p className="text-red-500 text-xs mt-1">{errors.guardianPhone}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">緊急聯絡人姓名 *</label>
                    <input type="text" name="emergencyName" value={form.emergencyName} onChange={handleChange} className={fieldClass("emergencyName")} placeholder="緊急聯絡人姓名" />
                    {errors.emergencyName && <p className="text-red-500 text-xs mt-1">{errors.emergencyName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">緊急聯絡人電話 *</label>
                    <input type="tel" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} className={fieldClass("emergencyPhone")} placeholder="09XX-XXX-XXX" />
                    {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">家長 Line ID 或電話號碼 *</label>
                  <input type="text" name="parentLineId" value={form.parentLineId} onChange={handleChange} className={fieldClass("parentLineId")} placeholder="Line ID 或電話號碼" />
                  <p className="text-xs text-gray-500 mt-1">
                    會幫大家加 Line 社群，方便通知及聯絡事宜，以及日後分享照片使用（若有）
                  </p>
                  {errors.parentLineId && <p className="text-red-500 text-xs mt-1">{errors.parentLineId}</p>}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#3FA9F5] text-white px-12 py-4 rounded-lg font-bold text-xl hover:bg-[#2a8fd4] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "提交中..." : "確認報名"}
              </button>
              <p className="text-xs text-gray-500 mt-4">
                提交後如需修改，請聯繫營隊工作人員
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
