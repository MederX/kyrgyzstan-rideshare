import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createRide } from "../api/rides";
import { createPassengerPost } from "../api/requests";
import CitySelector from "../components/CitySelector";
import { haptic } from "../utils/telegram";

type Tab = "ride" | "request";

export default function CreateRide() {
  const [tab, setTab] = useState<Tab>("ride");
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Создать</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("ride")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            tab === "ride" ? "bg-tg-blue text-white" : "bg-white text-gray-700"
          }`}
        >
          Поездка
        </button>
        <button
          onClick={() => setTab("request")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            tab === "request" ? "bg-tg-blue text-white" : "bg-white text-gray-700"
          }`}
        >
          Запрос
        </button>
      </div>

      {tab === "ride" ? <RideForm navigate={navigate} /> : <RequestForm navigate={navigate} />}
    </div>
  );
}

function RideForm({ navigate }: { navigate: any }) {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    haptic();
    createRide(data)
      .then(() => {
        alert("Поездка создана!");
        navigate("/");
      })
      .catch(() => alert("Ошибка"))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <CitySelector
        value={watch("from_city") || ""}
        onChange={(v) => setValue("from_city", v)}
        placeholder="Откуда"
      />
      <CitySelector
        value={watch("to_city") || ""}
        onChange={(v) => setValue("to_city", v)}
        placeholder="Куда"
      />
      <input
        type="date"
        {...register("departure_date", { required: true })}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input
        type="time"
        {...register("departure_time", { required: true })}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input
        type="number"
        placeholder="Количество мест"
        {...register("seats_total", { required: true, min: 1 })}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input
        type="number"
        placeholder="Цена за место (KGS)"
        {...register("price_per_seat", { required: true, min: 0 })}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Тип авто (опционально)"
        {...register("vehicle_type")}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("cargo_allowed")} />
        <span>Можно с грузом</span>
      </label>
      <textarea
        placeholder="Примечания"
        {...register("notes")}
        className="w-full px-4 py-3 border rounded-lg"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-tg-blue text-white py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Создание..." : "Создать поездку"}
      </button>
    </form>
  );
}

function RequestForm({ navigate }: { navigate: any }) {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    haptic();
    createPassengerPost(data)
      .then(() => {
        alert("Запрос создан!");
        navigate("/");
      })
      .catch(() => alert("Ошибка"))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <CitySelector
        value={watch("from_city") || ""}
        onChange={(v) => setValue("from_city", v)}
        placeholder="Откуда"
      />
      <CitySelector
        value={watch("to_city") || ""}
        onChange={(v) => setValue("to_city", v)}
        placeholder="Куда"
      />
      <input
        type="date"
        {...register("desired_date", { required: true })}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input
        type="number"
        placeholder="Количество мест"
        {...register("seats_needed", { required: true, min: 1 })}
        className="w-full px-4 py-3 border rounded-lg"
      />
      <textarea
        placeholder="Примечания"
        {...register("notes")}
        className="w-full px-4 py-3 border rounded-lg"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-tg-blue text-white py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Создание..." : "Создать запрос"}
      </button>
    </form>
  );
}
