import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getTelegramInitData, expandApp } from "./utils/telegram";
import { useAuthStore } from "./store/useAuthStore";
import client from "./api/client";
import BottomNav from "./components/BottomNav";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/Home";
import FindRide from "./pages/FindRide";
import CreateRide from "./pages/CreateRide";
import CargoRequests from "./pages/CargoRequests";
import Profile from "./pages/Profile";

export default function App() {
  const { setAuth, token } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    expandApp();
    const initData = getTelegramInitData();
    if (initData && !token) {
      client
        .post("/auth/telegram", { init_data: initData })
        .then(({ data }) => {
          setAuth(data.token, data.user);
        })
        .catch((err) => {
          console.error("Auth failed:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto min-h-screen bg-gray-900 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cargo" element={<CargoRequests />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
