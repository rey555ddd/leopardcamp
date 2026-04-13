import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">找不到此頁面</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-[#3FA9F5] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2a8fd4] transition-colors"
        >
          返回首頁
        </Link>
      </div>
    </div>
  );
}
