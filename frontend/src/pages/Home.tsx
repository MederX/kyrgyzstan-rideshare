import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { translations } from "../utils/translations";
import RideCard from "../components/RideCard";
import CitySelector from "../components/CitySelector";
import type { Ride } from "../types";

export default function Home() {
  const { language } = useAuthStore();
  const [rides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [activeTab, setActiveTab] = useState<"search" | "create">("search");
  const [loading, setLoading] = useState(false);
  const t = translations[language];

  // Search filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // Create ride form
  const [newRide, setNewRide] = useState({
    from_city: "",
    to_city: "",
    departure_date: "",
    departure_time: "",
    seats_total: "",
    price_per_seat: "",
    vehicle_type: "",
    notes: ""
  });

  // Update rides when language changes
  useEffect(() => {
    // Will be replaced by API call
  }, [language]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = rides;
      if (from) filtered = filtered.filter(r => r.from_city === from);
      if (to) filtered = filtered.filter(r => r.to_city === to);
      if (date) filtered = filtered.filter(r => r.departure_date === date);
      setFilteredRides(filtered);
      setLoading(false);
    }, 500);
  };

  const handleCreateRide = () => {
    setLoading(true);
    setTimeout(() => {
      alert(language === "ru" ? "Поездка создана!" : "Ride created!");
      setNewRide({
        from_city: "",
        to_city: "",
        departure_date: "",
        departure_time: "",
        seats_total: "",
        price_per_seat: "",
        vehicle_type: "",
        notes: ""
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">{t.rides}</h1>
      
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("search")}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "search" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-700 text-gray-300"
          }`}
        >
          🔍 {t.findRide}
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "create" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-700 text-gray-300"
          }`}
        >
          ➕ {t.createRide}
        </button>
      </div>

      {/* Search Tab */}
      {activeTab === "search" && (
        <div>
          <div className="bg-gray-800 rounded-lg p-4 mb-4 space-y-3">
            <CitySelector 
              value={from} 
              onChange={setFrom} 
              placeholder={language === "ru" ? "Откуда" : "From"} 
            />
            <CitySelector 
              value={to} 
              onChange={setTo} 
              placeholder={language === "ru" ? "Куда" : "To"} 
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
            >
              {language === "ru" ? "Искать" : "Search"}
            </button>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-white">
            {filteredRides.length > 0 
              ? `${language === "ru" ? "Найдено" : "Found"} (${filteredRides.length})`
              : t.activeRides
            }
          </h2>
          
          {loading ? (
            <div className="text-center py-8 text-gray-400">{t.loading}</div>
          ) : filteredRides.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === "ru" ? "Поездки не найдены" : "No rides found"}
            </div>
          ) : (
            filteredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          )}
        </div>
      )}

      {/* Create Tab */}
      {activeTab === "create" && (
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white mb-3">
            {language === "ru" ? "Создать поездку" : "Create Ride"}
          </h2>
          
          <CitySelector
            value={newRide.from_city}
            onChange={(v) => setNewRide({...newRide, from_city: v})}
            placeholder={language === "ru" ? "Откуда" : "From"}
          />
          <CitySelector
            value={newRide.to_city}
            onChange={(v) => setNewRide({...newRide, to_city: v})}
            placeholder={language === "ru" ? "Куда" : "To"}
          />
          <input
            type="date"
            value={newRide.departure_date}
            onChange={(e) => setNewRide({...newRide, departure_date: e.target.value})}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="time"
            value={newRide.departure_time}
            onChange={(e) => setNewRide({...newRide, departure_time: e.target.value})}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder={language === "ru" ? "Количество мест" : "Number of seats"}
            value={newRide.seats_total}
            onChange={(e) => setNewRide({...newRide, seats_total: e.target.value})}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="number"
            placeholder={language === "ru" ? "Цена за место (KGS)" : "Price per seat (KGS)"}
            value={newRide.price_per_seat}
            onChange={(e) => setNewRide({...newRide, price_per_seat: e.target.value})}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder={language === "ru" ? "Марка авто (например: Toyota Camry)" : "Car model (e.g. Toyota Camry)"}
            value={newRide.vehicle_type}
            onChange={(e) => setNewRide({...newRide, vehicle_type: e.target.value})}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <textarea
            placeholder={language === "ru" ? "Примечания" : "Notes"}
            value={newRide.notes}
            onChange={(e) => setNewRide({...newRide, notes: e.target.value})}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            rows={3}
          />
          <button
            onClick={handleCreateRide}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading 
              ? (language === "ru" ? "Создание..." : "Creating...") 
              : (language === "ru" ? "Создать поездку" : "Create Ride")
            }
          </button>
        </div>
      )}
    </div>
  );
}
