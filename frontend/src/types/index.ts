export interface User {
  id: string;
  telegram_id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
  photo_url?: string;
  phone_number: string;
  role: "driver" | "passenger";
  created_at: string;
  updated_at: string;
}

export interface Ride {
  id: string;
  driver_id: string;
  driver_name: string;
  driver_phone?: string;
  driver_photo: string;
  from_city: string;
  to_city: string;
  departure_date: string;
  departure_time: string;
  seats_total: number;
  seats_available: number;
  price_per_seat: number;
  currency: string;
  vehicle_type: string;
  cargo_allowed: boolean;
  notes: string;
  status: "active" | "completed" | "cancelled";
  created_at: string;
}

export interface RideRequest {
  id: string;
  ride_id: string;
  passenger_id: string;
  passenger_name: string;
  passenger_photo: string;
  seats_needed: number;
  notes: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  created_at: string;
}

export interface PassengerPost {
  id: string;
  passenger_id: string;
  passenger_name: string;
  from_city: string;
  to_city: string;
  desired_date: string;
  seats_needed: number;
  notes: string;
  status: "open" | "closed";
  created_at: string;
}

export interface CargoRequest {
  id: string;
  user_id: string;
  user_name: string;
  from_city: string;
  to_city: string;
  description: string;
  weight_kg: number;
  notes: string;
  status: "open" | "closed";
  created_at: string;
}

export const CITIES = [
  "Бишкек", "Ош", "Джалал-Абад", "Нарын",
  "Талас", "Каракол", "Балыкчы", "Токмок",
  "Кант", "Кара-Балта", "Узген", "Кара-Куль",
  "Майлуу-Суу", "Сулюкта", "Кочкор", "Чолпон-Ата",
  "Боконбаево", "Ат-Башы", "Баткен", "Исфана",
];

export const CITIES_EN = [
  "Bishkek", "Osh", "Jalal-Abad", "Naryn",
  "Talas", "Karakol", "Balykchy", "Tokmok", 
  "Kant", "Kara-Balta", "Uzgen", "Kara-Kul",
  "Mailuu-Suu", "Sulukta", "Kochkor", "Cholpon-Ata",
  "Bokonbaevo", "At-Bashy", "Batken", "Isfana",
];
