import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { translations } from "../utils/translations";

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language } = useAuthStore();
  const t = translations[language];

  const tabs = [
    { path: "/", icon: "🏠", label: t.home },
    { path: "/cargo", icon: "📦", label: t.cargoPage },
    { path: "/profile", icon: "👤", label: t.profile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-800 border-t border-gray-700 flex">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors
            ${pathname === tab.path ? "text-blue-400" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">{tab.icon}</span>
          <span className="text-white">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
