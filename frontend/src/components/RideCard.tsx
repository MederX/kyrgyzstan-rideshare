import { useAuthStore } from "../store/useAuthStore";
import { translations } from "../utils/translations";
import { haptic, sendNotification } from "../utils/telegram";
import type { Ride } from "../types";

interface Props {
  ride: Ride & { driver_phone?: string };
}

export default function RideCard({ ride }: Props) {
  const { language } = useAuthStore();
  const t = translations[language];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = language === "ru" 
      ? ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleBooking = () => {
    haptic();
    const phone = ride.driver_phone || "+996 XXX XXXXXX";
    const message = language === "ru" 
      ? `Вы забронировали место в поездке ${ride.from_city} → ${ride.to_city}\n\nВодитель: ${ride.driver_name}\nТелефон: ${phone}`
      : `You booked a seat for ${ride.from_city} → ${ride.to_city}\n\nDriver: ${ride.driver_name}\nPhone: ${phone}`;
    
    sendNotification(message, phone);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-sm mb-3 border border-gray-700">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚗</span>
          <span className="text-white font-medium">{t.driverLabel}:</span>
          <span className="text-gray-300">{ride.driver_name}</span>
          {ride.vehicle_type && (
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded ml-2">
              {ride.vehicle_type}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg">📍</span>
          <span className="text-white font-medium">{t.from}:</span>
          <span className="text-gray-300">{ride.from_city}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg">📍</span>
          <span className="text-white font-medium">{t.to}:</span>
          <span className="text-gray-300">{ride.to_city}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg">🕖</span>
          <span className="text-white font-medium">{t.when}:</span>
          <span className="text-gray-300">
            {formatDate(ride.departure_date)}, {ride.departure_time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg">👤</span>
          <span className="text-white font-medium">{t.seats}:</span>
          <span className="text-gray-300">{ride.seats_available}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <span className="text-white font-medium">{t.price}:</span>
          <span className="text-blue-400 font-bold">
            {ride.price_per_seat} {ride.currency}
          </span>
        </div>

        {ride.cargo_allowed && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-800 text-green-300 px-2 py-1 rounded">
              {t.cargoAllowed}
            </span>
          </div>
        )}

        {ride.notes && (
          <div className="text-sm text-gray-400 mt-2 italic">
            "{ride.notes}"
          </div>
        )}

        <div className="pt-3 border-t border-gray-700">
          <button
            onClick={handleBooking}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {t.bookSeat}
          </button>
        </div>
      </div>
    </div>
  );
}
