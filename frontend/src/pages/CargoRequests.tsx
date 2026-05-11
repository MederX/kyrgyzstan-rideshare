import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import CitySelector from "../components/CitySelector";

const mockCargo = [
  {
    id: "1",
    user_id: "test1",
    user_name: "Айбек К.",
    from_city: "Бишкек",
    to_city: "Ош",
    description: "Коробки с одеждой",
    weight_kg: 15,
    notes: "Хрупкое, аккуратно",
    status: "open" as const,
    created_at: "2024-05-10T10:00:00Z"
  },
  {
    id: "2",
    user_id: "test2", 
    user_name: "Гүлнара А.",
    from_city: "Ош",
    to_city: "Джалал-Абад",
    description: "Документы",
    weight_kg: 1,
    notes: "",
    status: "open" as const,
    created_at: "2024-05-10T11:00:00Z"
  }
];

export default function CargoRequests() {
  const [items] = useState(mockCargo);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { language } = useAuthStore();
  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const t = {
    ru: {
      cargo: "Груз",
      add: "➕ Добавить",
      cancel: "Отмена",
      create: "Создать",
      creating: "Создание...",
      from: "Откуда",
      to: "Куда", 
      description: "Описание груза",
      weight: "Вес (кг)",
      notes: "Примечания",
      noRequests: "Нет запросов на груз",
      loading: "Загрузка...",
      created: "Запрос создан!"
    },
    en: {
      cargo: "Cargo",
      add: "➕ Add",
      cancel: "Cancel",
      create: "Create",
      creating: "Creating...",
      from: "From",
      to: "To",
      description: "Cargo description", 
      weight: "Weight (kg)",
      notes: "Notes",
      noRequests: "No cargo requests",
      loading: "Loading...",
      created: "Request created!"
    }
  };

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      alert(t[language].created);
      reset();
      setShowForm(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">{t[language].cargo}</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? t[language].cancel : t[language].add}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-lg p-4 mb-4 space-y-3">
          <CitySelector
            value={watch("from_city") || ""}
            onChange={(v) => setValue("from_city", v)}
            placeholder={t[language].from}
          />
          <CitySelector
            value={watch("to_city") || ""}
            onChange={(v) => setValue("to_city", v)}
            placeholder={t[language].to}
          />
          <input
            type="text"
            placeholder={t[language].description}
            {...register("description", { required: true })}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="number"
            step="0.1"
            placeholder={t[language].weight}
            {...register("weight_kg", { required: true, min: 0 })}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          />
          <textarea
            placeholder={t[language].notes}
            {...register("notes")}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            rows={2}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? t[language].creating : t[language].create}
          </button>
        </form>
      )}

      {loading && !showForm ? (
        <div className="text-center py-8 text-gray-400">{t[language].loading}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-8 text-gray-400">{t[language].noRequests}</div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg p-4 shadow-sm mb-3 border border-gray-700">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">📦</span>
                <span className="font-semibold text-white">
                  {item.from_city} → {item.to_city}
                </span>
              </div>
              <div className="text-gray-300">{item.description}</div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>⚖️ {item.weight_kg} kg</span>
                <span>👤 {item.user_name}</span>
              </div>
              {item.notes && (
                <div className="text-sm text-gray-400 italic">"{item.notes}"</div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
