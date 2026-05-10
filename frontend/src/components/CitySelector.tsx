import { CITIES, CITIES_EN } from "../types";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CitySelector({ value, onChange, placeholder }: Props) {
  const { language } = useAuthStore();
  const cities = language === "en" ? CITIES_EN : CITIES;
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" className="text-gray-400">{placeholder || "Choose city"}</option>
      {cities.map((city) => (
        <option key={city} value={city} className="text-white bg-gray-700">
          {city}
        </option>
      ))}
    </select>
  );
}
