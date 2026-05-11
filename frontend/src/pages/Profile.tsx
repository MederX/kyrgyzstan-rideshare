import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getTelegramUser } from "../utils/telegram";
import { translations } from "../utils/translations";

// Mock user trips data
const mockUserTrips = [
  {
    id: "1",
    from_city: "Бишкек",
    to_city: "Ош", 
    departure_date: "2024-05-15",
    departure_time: "08:00",
    seats_total: 4,
    seats_available: 2,
    price_per_seat: 800,
    vehicle_type: "Toyota Camry",
    status: "active"
  },
  {
    id: "3",
    from_city: "Каракол",
    to_city: "Бишкек",
    departure_date: "2024-05-17", 
    departure_time: "06:00",
    seats_total: 4,
    seats_available: 4,
    price_per_seat: 600,
    vehicle_type: "Lexus GX 470",
    status: "active"
  }
];

const mockUserTripsEn = [
  {
    id: "1",
    from_city: "Bishkek",
    to_city: "Osh", 
    departure_date: "2024-05-15",
    departure_time: "08:00",
    seats_total: 4,
    seats_available: 2,
    price_per_seat: 800,
    vehicle_type: "Toyota Camry",
    status: "active"
  },
  {
    id: "3",
    from_city: "Karakol",
    to_city: "Bishkek",
    departure_date: "2024-05-17", 
    departure_time: "06:00",
    seats_total: 4,
    seats_available: 4,
    price_per_seat: 600,
    vehicle_type: "Lexus GX 470",
    status: "active"
  }
];

export default function Profile() {
  const { user, language, setLanguage } = useAuthStore();
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"driver" | "passenger">("passenger");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "trips">("profile");
  const [userTrips, setUserTrips] = useState(language === "en" ? mockUserTripsEn : mockUserTrips);
  const [editingTrip, setEditingTrip] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    departure_time: "",
    seats_available: "",
    price_per_seat: ""
  });

  // Get Telegram user data
  const telegramUser = getTelegramUser();

  useEffect(() => {
    if (user) {
      setPhone(user.phone_number || "");
      setRole(user.role);
    }
  }, [user]);

  // Update trips when language changes
  useEffect(() => {
    const currentTrips = language === "en" ? mockUserTripsEn : mockUserTrips;
    setUserTrips(currentTrips);
  }, [language]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      alert(translations[language].profileUpdated);
      setLoading(false);
    }, 1000);
  };

  const handleEditTrip = (trip: any) => {
    setEditingTrip(trip.id);
    setEditForm({
      departure_time: trip.departure_time,
      seats_available: trip.seats_available.toString(),
      price_per_seat: trip.price_per_seat.toString()
    });
  };

  const handleSaveTrip = () => {
    setUserTrips(trips => trips.map(trip => 
      trip.id === editingTrip 
        ? {
            ...trip,
            departure_time: editForm.departure_time,
            seats_available: parseInt(editForm.seats_available),
            price_per_seat: parseInt(editForm.price_per_seat)
          }
        : trip
    ));
    setEditingTrip(null);
    alert(language === "ru" ? "Поездка обновлена!" : "Trip updated!");
  };

  const handleDeleteTrip = (tripId: string) => {
    if (confirm(language === "ru" ? "Удалить поездку?" : "Delete trip?")) {
      setUserTrips(trips => trips.filter(trip => trip.id !== tripId));
      alert(language === "ru" ? "Поездка удалена!" : "Trip deleted!");
    }
  };

  // Use Telegram user data or fallback
  const displayUser = telegramUser || user || {
    first_name: "Test",
    last_name: "User", 
    username: "testuser",
    photo_url: "",
  };

  const t = translations[language];

  return (
    <div className="p-4 min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">{t.profile}</h1>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          👤 {language === "ru" ? "Профиль" : "Profile"}
        </button>
        <button
          onClick={() => setActiveTab("trips")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            activeTab === "trips" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          🚗 {language === "ru" ? "Мои поездки" : "My Trips"}
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            {displayUser.photo_url ? (
              <img 
                src={displayUser.photo_url} 
                alt="Profile" 
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {displayUser.first_name?.[0] || "U"}
              </div>
            )}
            <div>
              <div className="font-semibold text-lg text-white">
                {displayUser.first_name} {displayUser.last_name || ""}
              </div>
              <div className="text-sm text-gray-400">
                @{displayUser.username || "unknown"}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">{t.language}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage("ru")}
                  className={`flex-1 py-2 rounded-lg ${
                    language === "ru" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                  }`}
                >
                  Русский
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`flex-1 py-2 rounded-lg ${
                    language === "en" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">{t.phone}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+996 700 123456"
                className="w-full px-4 py-3 border rounded-lg bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">{t.role}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("passenger")}
                  className={`flex-1 py-2 rounded-lg ${
                    role === "passenger" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {t.passenger}
                </button>
                <button
                  type="button"
                  onClick={() => setRole("driver")}
                  className={`flex-1 py-2 rounded-lg ${
                    role === "driver" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {t.driver}
                </button>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? t.saving : t.save}
            </button>
          </div>
        </div>
      )}

      {/* My Trips Tab */}
      {activeTab === "trips" && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-white">
            {language === "ru" ? "Мои объявления" : "My Trip Announcements"}
          </h2>
          
          {userTrips.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === "ru" ? "У вас нет активных поездок" : "You have no active trips"}
            </div>
          ) : (
            userTrips.map((trip) => (
              <div key={trip.id} className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700">
                {editingTrip === trip.id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <div className="text-white font-medium">
                      {trip.from_city} → {trip.to_city}
                    </div>
                    <div className="text-sm text-gray-400">{trip.departure_date}</div>
                    
                    <div>
                      <label className="block text-sm text-white mb-1">
                        {language === "ru" ? "Время отправления" : "Departure Time"}
                      </label>
                      <input
                        type="time"
                        value={editForm.departure_time}
                        onChange={(e) => setEditForm({...editForm, departure_time: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white mb-1">
                        {language === "ru" ? "Свободных мест" : "Available Seats"}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={trip.seats_total}
                        value={editForm.seats_available}
                        onChange={(e) => setEditForm({...editForm, seats_available: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-white mb-1">
                        {language === "ru" ? "Цена за место" : "Price per Seat"}
                      </label>
                      <input
                        type="number"
                        value={editForm.price_per_seat}
                        onChange={(e) => setEditForm({...editForm, price_per_seat: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveTrip}
                        className="flex-1 bg-green-600 text-white py-2 rounded"
                      >
                        {language === "ru" ? "Сохранить" : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingTrip(null)}
                        className="flex-1 bg-gray-600 text-white py-2 rounded"
                      >
                        {language === "ru" ? "Отмена" : "Cancel"}
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-lg text-white">
                          {trip.from_city} → {trip.to_city}
                        </div>
                        <div className="text-sm text-gray-400">
                          {trip.departure_date} в {trip.departure_time}
                        </div>
                        <div className="text-sm text-gray-400">
                          {trip.vehicle_type}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-400">{trip.price_per_seat} KGS</div>
                        <div className="text-xs text-gray-400">{trip.seats_available} мест</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEditTrip(trip)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm"
                      >
                        ✏️ {language === "ru" ? "Редактировать" : "Edit"}
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm"
                      >
                        🗑️ {language === "ru" ? "Удалить" : "Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
