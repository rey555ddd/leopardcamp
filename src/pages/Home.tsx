/**
 * 豹子腿棒球夏令營 - 完整單頁網站（手機版優化）
 * 設計風格：白底、天藍色 #3FA9F5 + 黃色 #FCEE21 配色
 * 字體：Noto Sans TC + DM Sans + Playfair Display
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// === CDN Image URLs ===
const IMAGES = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/leopard_logo_f5505ee4.png",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/hero_image_v2-gdhdjMvsXkgaHr2xYBrbSs.webp",
  coach: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032574653/HucFMfPfbOWFMxEe.png",
  confidence: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/team_battle_81e080f1.png",
  teamwork: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/teamwork_cooperation-3LCnDQxGX6BZxPSTuRqpqn.webp",
  achievement: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/award_ceremony_14be78cd.png",
  social: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/social_interaction_d66cc9b7.png",
  growth: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/personal_growth-DySY5vpxCrLuZRReEGS8vp.webp",
  family: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/family_interaction-A4zWKThLcqnUAxumivhKz5.webp",
  customJersey: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/custom_jersey_chinese-WWeiVLstTJDBtyWkLDfjg6.webp",
  parentGame: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/parent_game_chinese-AwQKjjcZxk523RAm3otc7X.webp",
  teamBattle: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/team_battle_chinese-EmJg2jmK7uukwdaXaG73gc.webp",
  character: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/85tmRxight7MqCZuJtwyGq/character_education_v2_370f9bdb.png",
  jerseyFront: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/EoYx3yyZpo75SnwC8tPPjA/pasted_file_E9wzwC_image_144e07c2.webp",
  jerseyBack: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/EoYx3yyZpo75SnwC8tPPjA/pasted_file_L1Yq9E_image_f06166e9.webp",
  cardFront: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/EoYx3yyZpo75SnwC8tPPjA/player_card_front_standard_1e6969aa.png",
  cardBack: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032574653/EoYx3yyZpo75SnwC8tPPjA/player_card_back_correct_fd44add7.png",
  hat: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032574653/juNCuXfwBkOvtqda.png",
  socks: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032574653/UmVQpcYRisCgyiPF.png",
};

// === FAQ Data ===
const faqs = [
  { question: "營隊適合什麼年齡的孩子？", answer: "適合 8-16 歲對棒球有興趣的孩子。無論是初學者或有基礎的球員都歡迎報名。" },
  { question: "需要自備球具嗎？", answer: "需要自備棒球手套、球褲、皮帶、球鞋（釘鞋）。營隊會提供其他必要的球具與裝備。" },
  { question: "家長可以觀看訓練嗎？", answer: "可以！第四天的冠軍戰與家長 PK 賽歡迎家長到場觀看與參與。" },
];

// === 「我們在意的不只是打球」Grid Data ===
const values = [
  { num: "1", title: "建立自信", desc: "透過完成挑戰、獲得認可，讓每個孩子都能體驗成功的喜悅。", img: IMAGES.confidence, color: "bg-[#3FA9F5]", textColor: "text-white" },
  { num: "2", title: "培養合作", desc: "透過分組對抗，讓孩子學會團隊精神與互相支持的重要性。", img: IMAGES.teamwork, color: "bg-[#FCEE21]", textColor: "text-gray-900" },
  { num: "3", title: "成就感", desc: "完成訓練、贏得比賽、獲得獎項，每一步都是成長的證明。", img: IMAGES.achievement, color: "bg-[#3FA9F5]", textColor: "text-white" },
  { num: "4", title: "交友與社交", desc: "在安全、友善的環境中建立友誼，遠離 3C，享受真實互動。", img: IMAGES.social, color: "bg-[#FCEE21]", textColor: "text-gray-900" },
  { num: "5", title: "自我成長", desc: "透過品格教育與責任培養，讓孩子成為更好的自己。", img: IMAGES.growth, color: "bg-[#3FA9F5]", textColor: "text-white" },
  { num: "6", title: "親子互動", desc: "家長可以一起參與比賽，創造家庭回憶與共同的棒球故事。", img: IMAGES.family, color: "bg-[#FCEE21]", textColor: "text-gray-900" },
];

// === 課程規劃簡易大綱 ===
const scheduleOutline = [
  { day: "DAY 1", theme: "基礎建立與數據紀錄", highlights: ["報到與暖身", "跑壘練習與規則講解", "傳接球與守備基本訓練", "室內課程：棒球規則與力學", "打擊訓練", "小遊戲與總結"] },
  { day: "DAY 2", theme: "實戰模擬與熱身賽", highlights: ["傳接球與守備練習", "分組打擊練習", "室內課程與公布分隊", "分組對抗熱身賽", "小遊戲與總結"] },
  { day: "DAY 3", theme: "榮耀決戰與親子同樂", highlights: ["傳接球與守備練習", "分組打擊練習", "室內課程：進階戰術", "分組對抗積分賽", "小遊戲與總結"] },
  { day: "DAY 4", theme: "冠軍賽與結業式", highlights: ["傳接球與守備練習", "分組打擊練習", "室內課程：總複習", "冠軍隊伍 vs 家長隊對抗賽", "結業式、頒發證書"] },
];

// === 營隊亮點 ===
const highlights = [
  { title: "客製化球衣與背號", emoji: "🎖️", desc: "每個孩子都會獲得印有自己名字與背號的客製化球衣，讓孩子感受到被重視與歸屬感。", img: IMAGES.customJersey, border: "border-[#3FA9F5]/20" },
  { title: "親子共同參賽", emoji: "👨‍👩‍👧‍👦", desc: "家長可以一起上場比賽，與孩子並肩作戰，創造一生難忘的家庭回憶。", img: IMAGES.parentGame, border: "border-[#3FA9F5]/20" },
  { title: "分組對抗與獎項", emoji: "🏆", desc: "均衡分隊進行四天分組對抗，每個孩子都有機會贏得獎項，體驗勝利的喜悅。", img: IMAGES.teamBattle, border: "border-[#FCEE21]/20" },
  { title: "品格教育與規則", emoji: "📚", desc: "室內課程教授棒球規則與戰術，培養孩子的責任感與運動家精神。", img: IMAGES.character, border: "border-[#FCEE21]/20" },
];

// === Collapsible Section Component (for mobile) ===
function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-lg font-bold text-gray-900">{title}</span>
        <ChevronDown className={`w-5 h-5 text-[#3FA9F5] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllValues, setShowAllValues] = useState(false);
  const [expandedHighlight, setExpandedHighlight] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== Navigation ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
            <img src={IMAGES.logo} alt="豹子腿棒球夏令營 Logo" className="w-9 h-9 sm:w-12 sm:h-12 object-contain" />
            <span className="text-base sm:text-xl font-black text-gray-900">2026 豹子腿棒球夏令營</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#highlights" className="text-gray-700 font-semibold hover:text-[#3FA9F5] transition-colors">營隊亮點</a>
            <a href="#schedule" className="text-gray-700 font-semibold hover:text-[#3FA9F5] transition-colors">課程規劃</a>
            <a href="#merchandise" className="text-gray-700 font-semibold hover:text-[#3FA9F5] transition-colors">周邊商品</a>
            <a href="#faq" className="text-gray-700 font-semibold hover:text-[#3FA9F5] transition-colors">常見問題</a>
            <Link to="/register" className="bg-[#3FA9F5] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#2a8fd4] transition-colors">
              立刻報名
            </Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
            <a href="#highlights" className="block text-gray-700 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>營隊亮點</a>
            <a href="#schedule" className="block text-gray-700 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>課程規劃</a>
            <a href="#merchandise" className="block text-gray-700 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>周邊商品</a>
            <a href="#faq" className="block text-gray-700 font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>常見問題</a>
            <Link to="/register" className="block w-full text-center bg-[#3FA9F5] text-white px-6 py-3 rounded-lg font-bold mt-2" onClick={() => setMobileMenuOpen(false)}>
              立刻報名
            </Link>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section
          className="relative min-h-[420px] sm:min-h-[600px] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/70 via-black/50 to-black/20 sm:to-transparent" />
          <div className="relative z-10 container flex flex-col justify-center min-h-[340px] sm:min-h-[500px]">
            <span className="inline-block bg-[#FCEE21] text-gray-900 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 w-fit">
              2026 SUMMER
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 sm:mb-6 max-w-2xl drop-shadow-lg">
              2026 豹子腿<br />棒球夏令營
            </h1>
            <p className="text-base sm:text-xl text-white/90 max-w-xl mb-6 sm:mb-10 leading-relaxed drop-shadow">
              由職棒選手方昶詠教授，集結科學數據、職棒師資、運動精神於一身，四天體驗棒球精神
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/register" className="inline-flex items-center justify-center bg-[#FCEE21] text-gray-900 px-6 sm:px-8 py-3.5 sm:py-3 rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-300 transition-colors shadow-lg">
                立刻報名
              </Link>
              <a href="#coach" className="inline-flex items-center justify-center bg-white/20 backdrop-blur text-white px-6 sm:px-8 py-3.5 sm:py-3 rounded-lg font-bold text-base sm:text-lg hover:bg-white/30 transition-colors border border-white/30">
                了解更多
              </a>
            </div>
          </div>
        </section>

        {/* ===== Coach Section ===== */}
        <section id="coach" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">職棒選手親授</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#FCEE21] rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
              <div className="flex justify-center md:order-2">
                <div className="w-full max-w-xs sm:max-w-md rounded-2xl overflow-hidden shadow-xl border-2 border-[#3FA9F5]/20">
                  <img src={IMAGES.coach} alt="方昶詠教練" className="w-full h-64 sm:h-96 object-cover" />
                </div>
              </div>
              <div className="md:order-1">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4">方昶詠教練</h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  方昶詠教練深信，棒球不只是一項運動，更是品格教育的最佳載體。他希望透過這次夏令營，讓每一位參與的孩子都能體驗到棒球的魅力，並在過程中建立自信、學會堅持、懂得感恩。
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed hidden sm:block">
                  方教練擁有豐富的職棒經驗，致力於培養下一代棒球人才。他不僅傳授技術，更重視品格與團隊精神的培養。每一位學員都是他眼中的未來之星。
                </p>
              </div>
            </div>

            {/* 職業生涯亮點 & 教學理念 */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
              <div className="bg-gradient-to-br from-[#3FA9F5]/10 to-[#FCEE21]/10 p-5 sm:p-8 rounded-2xl border-2 border-[#3FA9F5]/20">
                <div className="hidden md:block">
                  <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">🏆</span> 職業生涯亮點
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: "超過20年棒球生涯", desc: "從國小到職棒，歷程完整，職業級訓練" },
                      { title: "前統一獅外野手", desc: "以速度著稱，人稱「豹子腿」" },
                      { title: "青少年培育", desc: "致力於培養下一代棒球人才" },
                      { title: "用心教學", desc: "用最簡單易懂的方式，讓每個孩子都能享受棒球的樂趣" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#FCEE21] rounded-full flex items-center justify-center text-gray-900 font-bold">✓</div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <CollapsibleSection title="🏆 職業生涯亮點">
                  <div className="space-y-3">
                    {[
                      { title: "超過20年棒球生涯", desc: "從國小到職棒，歷程完整" },
                      { title: "前統一獅外野手", desc: "以速度著稱，人稱「豹子腿」" },
                      { title: "青少年培育", desc: "致力於培養下一代棒球人才" },
                      { title: "用心教學", desc: "讓每個孩子都能享受棒球樂趣" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#FCEE21] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">✓</div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-gray-600 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>

              <div className="bg-gradient-to-br from-[#FCEE21]/10 to-[#3FA9F5]/10 p-5 sm:p-8 rounded-2xl border-2 border-[#FCEE21]/20">
                <div className="hidden md:block">
                  <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">💡</span> 教學理念
                  </h3>
                  <div className="space-y-6">
                    {[
                      { num: "1", title: "技術與品格並重", desc: "棒球技能是基礎，品格教育是靈魂。每一堂課都融合運動精神與人生智慧。" },
                      { num: "2", title: "科學化訓練", desc: "運用數據分析與科技工具，讓每個孩子都能看到自己的進步。" },
                      { num: "3", title: "個性化指導", desc: "根據每個孩子的特點與進度調整教學，確保每位學員都能有所收穫。" },
                      { num: "4", title: "親子互動", desc: "鼓勵家長參與，讓棒球成為家庭共同的回憶與故事。" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#3FA9F5] rounded-full flex items-center justify-center text-white font-bold">{item.num}</div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <CollapsibleSection title="💡 教學理念">
                  <div className="space-y-3">
                    {[
                      { num: "1", title: "技術與品格並重", desc: "融合運動精神與人生智慧" },
                      { num: "2", title: "科學化訓練", desc: "運用數據分析與科技工具" },
                      { num: "3", title: "個性化指導", desc: "根據每個孩子的特點調整教學" },
                      { num: "4", title: "親子互動", desc: "鼓勵家長參與，創造共同回憶" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#3FA9F5] rounded-full flex items-center justify-center text-white font-bold text-sm">{item.num}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-gray-600 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">家長心得 × 孩子成長</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#FCEE21] rounded-full" />
            </div>
            <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {[
                { text: "「孩子早上 5 點就主動起床，從沒看過他這麼興奮！回來後變得更自信、更懂得團隊合作。」", author: "— 李媽媽", border: "border-[#3FA9F5]/20" },
                { text: "「營隊結束時孩子哭著不想離開。這是他假期最棒的活動，已經報名下一期了！」", author: "— 王爸爸", border: "border-[#FCEE21]/20" },
                { text: "「內向的孩子變得外向，學會了責任感與運動精神。方教練真的很用心！」", author: "— 陳媽媽", border: "border-[#3FA9F5]/20" },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 sm:p-8 rounded-2xl border-2 ${item.border} shadow-lg flex-shrink-0 w-[280px] sm:w-auto snap-center`}>
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-2xl">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 font-semibold mb-3 sm:mb-4 leading-relaxed">{item.text}</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold">{item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Values Grid ===== */}
        <section className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container">
            <div className="mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">我們在意的不只是打球</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#FCEE21] rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 auto-rows-fr">
              {values.map((item, i) => (
                <div key={i} className={`bg-white rounded-2xl border-2 border-gray-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col ${!showAllValues && i >= 3 ? "hidden md:flex" : "flex"}`}>
                  <div className="aspect-[16/10] overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 ${item.color} rounded-full flex items-center justify-center ${item.textColor} font-bold text-sm sm:text-lg`}>
                        {item.num}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {!showAllValues && (
              <div className="md:hidden mt-4 text-center">
                <button onClick={() => setShowAllValues(true)} className="text-[#3FA9F5] font-bold text-sm flex items-center gap-1 mx-auto">
                  查看全部 6 項 <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
            {showAllValues && (
              <div className="md:hidden mt-4 text-center">
                <button onClick={() => setShowAllValues(false)} className="text-[#3FA9F5] font-bold text-sm flex items-center gap-1 mx-auto">
                  收起 <ChevronDown className="w-4 h-4 rotate-180" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ===== Camp Highlights ===== */}
        <section id="highlights" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container">
            <div className="mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">營隊亮點 × 獨特體驗</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#FCEE21] rounded-full" />
            </div>
            <div className="hidden md:grid md:grid-cols-2 gap-8 auto-rows-fr">
              {highlights.map((item, i) => (
                <div key={i} className={`bg-white p-8 rounded-2xl border-2 ${item.border} shadow-lg flex flex-col`}>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">{item.emoji} {item.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed flex-1">{item.desc}</p>
                  <div className="aspect-[16/9] overflow-hidden rounded-lg flex-shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
            <div className="md:hidden space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className={`bg-white rounded-xl border-2 ${item.border} shadow-sm overflow-hidden`}>
                  <button
                    onClick={() => setExpandedHighlight(expandedHighlight === i ? null : i)}
                    className="w-full p-4 flex items-center gap-3 text-left"
                  >
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-black text-gray-900">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{item.desc}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#3FA9F5] transition-transform flex-shrink-0 ${expandedHighlight === i ? "rotate-180" : ""}`} />
                  </button>
                  {expandedHighlight === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{item.desc}</p>
                      <div className="aspect-[16/9] overflow-hidden rounded-lg">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Schedule ===== */}
        <section id="schedule" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container">
            <div className="mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">黃金四日課程規劃</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#FCEE21] rounded-full" />
              <p className="text-sm sm:text-lg text-gray-600 mt-3 sm:mt-4">
                採用測速槍、碼表、智慧棒球等專業設備，讓學習更數據化
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {scheduleOutline.map((day, i) => (
                <div key={i} className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#3FA9F5]/20 shadow-lg flex flex-col">
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block bg-[#3FA9F5] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm">{day.day}</span>
                  </div>
                  <h3 className="text-sm sm:text-xl font-black text-gray-900 mb-2 sm:mb-4 leading-snug">{day.theme}</h3>
                  <div className="space-y-1.5 sm:space-y-2 flex-1">
                    {day.highlights.map((item, j) => (
                      <div key={j} className="flex items-start gap-1.5 sm:gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FCEE21] rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                        <p className="text-gray-700 text-xs sm:text-sm leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-6 sm:mt-8 text-xs sm:text-sm">
              每日 08:00 - 17:00 ｜ 含午餐休息與點心時間
            </p>
          </div>
        </section>

        {/* ===== Merchandise ===== */}
        <section id="merchandise" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="container">
            <div className="mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">限定商品 × 超值贈品</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#FCEE21] rounded-full" />
            </div>

            <div className="space-y-6 sm:space-y-12">
              {/* Jersey */}
              <div className="bg-gradient-to-br from-[#3FA9F5]/5 to-[#FCEE21]/5 p-5 sm:p-8 rounded-2xl flex flex-col border-2 border-[#3FA9F5]/20">
                <div className="mb-4 sm:mb-6">
                  <span className="bg-gray-900 text-[#FCEE21] px-3 py-1 text-xs font-bold tracking-widest rounded">EXCLUSIVE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4">職業等級訂製球衣</h3>
                <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8">頂級吸濕排汗材質，專為台灣夏季氣候設計。每件球衣都是獨一無二的營隊紀念。</p>
                <div className="flex gap-4 sm:gap-8 mb-4 sm:mb-8 justify-center items-center flex-wrap">
                  <div className="w-40 h-52 sm:w-64 sm:h-80 rounded-lg overflow-hidden shadow-2xl border-4 border-[#3FA9F5]/30">
                    <img src={IMAGES.jerseyFront} alt="球衣正面" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-40 h-52 sm:w-64 sm:h-80 rounded-lg overflow-hidden shadow-2xl border-4 border-[#3FA9F5]/30">
                    <img src={IMAGES.jerseyBack} alt="球衣背面" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {["正面與背面設計", "高級吸濕排汗面料", "永久紀念收藏"].map((text, i) => (
                    <div key={i} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-[#3FA9F5] rounded-full flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700 font-semibold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Cards + Hat + Socks */}
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                  <div className="bg-white p-5 sm:p-8 rounded-2xl border-2 border-gray-200 h-full">
                    <h4 className="text-xl sm:text-3xl font-black text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="text-2xl sm:text-4xl">🏆</span>
                      <span>小球員 MVP 閃卡專屬定制</span>
                      <span className="text-sm sm:text-base font-medium text-gray-500">（紀錄成長軌跡）</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-8 items-start">
                      {/* 正面 — 去除包裝背景，圖片直出，與背面同寬 */}
                      <div>
                        <img src={IMAGES.cardFront} alt="球員卡正面" className="w-full h-auto block rounded-lg shadow-lg" />
                        <p className="text-xs sm:text-sm font-bold text-gray-900 text-center mt-2 sm:mt-3">球員卡正面</p>
                      </div>

                      {/* 背面 — 疊加 6 項模擬數據 + 方昶詠簽名 + 修正 typo */}
                      <div>
                        <div className="relative w-full">
                          <img src={IMAGES.cardBack} alt="球員卡背面" className="w-full h-auto block rounded-lg shadow-lg" />

                          {/* 修正「右打打/投」typo → 用深藍 bg 蓋掉，再寫正確的「右打 / 右投」*/}
                          <div
                            className="absolute -translate-x-1/2 pointer-events-none flex items-center justify-center"
                            style={{
                              top: "21%",
                              left: "50%",
                              width: "48%",
                              height: "4.5%",
                              background: "#1c2f4d",
                            }}
                          >
                            <span className="text-white font-bold text-[2.6vw] sm:text-base tracking-wide">右打 / 右投</span>
                          </div>

                          {/* 6 項模擬數值（放到中文字標籤的正下方）*/}
                          {[
                            { v: 62, top: "36%", left: "50%" }, /* 投球速度 正下方 */
                            { v: 71, top: "45%", left: "74%" }, /* 打擊速度 下方 */
                            { v: 76, top: "60%", left: "74%" }, /* 反應速度 下方 */
                            { v: 80, top: "69%", left: "50%" }, /* 跑壘速度 下方 */
                            { v: 68, top: "60%", left: "26%" }, /* 防守能力 下方 */
                            { v: 85, top: "45%", left: "26%" }, /* 體能 下方 */
                          ].map((s, i) => (
                            <span
                              key={i}
                              className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-[#FCEE21] text-[2.8vw] sm:text-lg leading-none pointer-events-none"
                              style={{
                                top: s.top,
                                left: s.left,
                                textShadow: "0 0 4px rgba(0,0,0,0.85), 0 1px 0 #000",
                              }}
                            >
                              {s.v}
                            </span>
                          ))}

                          {/* 方昶詠簽名（緊貼卡片右下角）*/}
                          <span
                            className="absolute text-white/95 font-bold italic text-[2.4vw] sm:text-sm pointer-events-none"
                            style={{
                              bottom: "3%",
                              right: "4%",
                              transform: "rotate(-8deg)",
                              fontFamily: "'Liu Jian Mao Cao','Ma Shan Zheng',cursive,serif",
                              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                              letterSpacing: "0.06em",
                            }}
                          >
                            方昶詠
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900 text-center mt-2 sm:mt-3">球員卡背面</p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 font-semibold mb-1 sm:mb-2">獨一無二 / 數據紀錄</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      每位參加者都會獲得個人專屬的定製球員卡，記錄四天的進步數據。
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border-l-4 border-[#3FA9F5]">
                    <h4 className="text-lg sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">專屬球帽</h4>
                    <div className="w-28 h-22 sm:w-40 sm:h-32 mx-auto mb-3 sm:mb-4 rounded-lg overflow-hidden shadow-lg">
                      <img src={IMAGES.hat} alt="專屬球帽" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs sm:text-base text-gray-600 font-semibold">立體刺繡 / 可調式</p>
                  </div>
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border-l-4 border-[#FCEE21]">
                    <h4 className="text-lg sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">專業球襪</h4>
                    <div className="w-28 h-22 sm:w-40 sm:h-32 mx-auto mb-3 sm:mb-4 rounded-lg overflow-hidden shadow-lg">
                      <img src={IMAGES.socks} alt="專業球襪" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs sm:text-base text-gray-600 font-semibold">加厚底 / 黑色長襪</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4">常見問答</h2>
              <div className="w-16 sm:w-24 h-2 sm:h-3 bg-[#3FA9F5] rounded-full" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 text-left">{faq.question}</h3>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#3FA9F5] transition-transform flex-shrink-0 ml-3 sm:ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Bottom CTA ===== */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3FA9F5] to-[#2a8fd4] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6">準備好成為棒球之星了嗎？</h2>
            <p className="text-base sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-95 leading-relaxed">
              四天的營隊，將改變孩子的一生。<br className="sm:hidden" />建立自信、學會合作、創造回憶。
            </p>
            <Link to="/register" className="inline-flex items-center justify-center bg-[#FCEE21] text-gray-900 px-10 sm:px-12 py-4 rounded-lg font-bold text-lg sm:text-xl hover:bg-yellow-300 transition-colors shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none">
              立刻報名
            </Link>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">豹子腿棒球夏令營</h3>
              <p className="text-gray-400 text-xs sm:text-sm">由職棒選手方昶詠親授的專業棒球營隊，致力於培養下一代棒球人才。</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">聯絡方式</h3>
              <p className="text-gray-400 text-xs sm:text-sm">電話：(02) XXXX-XXXX</p>
              <p className="text-gray-400 text-xs sm:text-sm">信箱：info@leopardcamp.com</p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">追蹤我們</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#3FA9F5] transition-colors text-xs sm:text-sm">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-[#3FA9F5] transition-colors text-xs sm:text-sm">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-[#3FA9F5] transition-colors text-xs sm:text-sm">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-gray-500 text-xs sm:text-sm">© 2026 豹子腿棒球夏令營．版權所有。</p>
          </div>
        </div>
      </footer>

      {/* ===== Mobile Sticky CTA ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 safe-area-pb">
        <Link to="/register" className="flex items-center justify-center w-full bg-[#3FA9F5] text-white py-3.5 rounded-xl font-bold text-base shadow-lg active:bg-[#2a8fd4] transition-colors">
          立刻報名
        </Link>
      </div>
    </div>
  );
}
