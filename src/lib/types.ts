export type UserRole = "patient" | "admin" | "therapist";

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  address: string | null;
  gender: string | null;
  family_doctor: string | null;
  allergies: string | null;
  ramq: string | null;
  insurance_provider: string | null;
  created_at: string;
  updated_at: string;
}

export interface Therapist {
  id: string;
  profile_id: string | null;
  name: string;
  title: string;
  specialties: string[];
  bio_fr: string | null;
  photo_url: string | null;
  years_experience: number;
  is_active: boolean;
}

export interface Service {
  id: string;
  name_fr: string;
  description_fr: string | null;
  duration_minutes: number;
  price: number | null;
  category: string | null;
  is_active: boolean;
}

export interface Appointment {
  id: string;
  confirmation_number: string;
  patient_id: string;
  therapist_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patient_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  therapist?: Therapist;
  service?: Service;
  patient?: Profile;
}

export interface Availability {
  id: string;
  therapist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export const TIME_SLOTS = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "14:00",
  "14:45",
  "15:30",
  "16:15",
  "17:00",
];

export const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  cancelled: "Annulé",
  completed: "Terminé",
};
