import { useState } from "react";
import { getRides } from "../api/rides";
import type { Ride } from "../types";
import RideCard from "../components/RideCard";
import CitySelector from "../components/CitySelector";

export default function FindRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setSearched(true);
    getRides({ from, to, date })
      .then(setRides)
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Найти поездку</h1>

      <div className="space-y-3 mb-4">
        <CitySelector value={from} onChange={setFrom} placeholder="Откуда" />
        <CitySelector value={to} onChange={setTo} placeholder="Куда" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tg-blue"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-tg-blue text-white py-3 rounded-lg font-medium"
        >
          Искать
        </button>
      </div>

      {loading && <div className="text-center py-8 text-gray-500">Поиск...</div>}
      
      {!loading && searched && rides.length === 0 && (
        <div className="text-center py-8 text-gray-500">Поездки не найдены</div>
      )}

      {!loading && rides.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Результаты ({rides.length})</h2>
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}
