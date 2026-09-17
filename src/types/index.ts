export type MealStatus = "hepsini_yedi" | "yarisini_yedi" | "az_yedi" | "yemedi";
export type MoodType = "cok_mutlu" | "neseli" | "sakin" | "biraz_yorgun" | "huzursuz";

export interface ClassGroup {
  id: number; // 1 to 6
  name: string;
  shortName: string;
  ageGroup: string;
  teacher: string;
  teacherTitle: string;
  room: string;
  capacity: number;
  color: string;
  bgGradient: string;
  accentColor: string;
  icon: string;
  description: string;
  scheduleHighlights: string[];
}

export interface Student {
  id: string;
  classId: number; // 1 to 6
  name: string;
  surname: string;
  studentCode: string; // e.g. "MD-101"
  username: string; // e-okul giriş kullanıcı adı
  password: string; // e-okul giriş şifresi
  gender: "kız" | "erkek";
  avatar: string;
  birthDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact: string;
  bloodType: string;
  allergies?: string;
  notes?: string;
}

export interface DailyReport {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  meals: {
    breakfast: MealStatus;
    lunch: MealStatus;
    snack: MealStatus;
    notes?: string;
  };
  sleep: {
    slept: boolean;
    durationMinutes: number;
    notes?: string;
  };
  mood: MoodType;
  activitiesAttended: string[];
  teacherNote: string;
  medicationGiven?: string;
}

export interface ClassActivity {
  id: string;
  classId: number; // 1 to 6
  title: string;
  time: string;
  date: string;
  category: "Sanat" | "Müzik" | "Oyun" | "Fen & Doğa" | "Dil" | "Bilişsel & Kodlama" | "Beden & Jimnastik";
  description: string;
  instructor: string;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  date: string;
  classId?: number | null; // null: Genel vitrin galerisi, 1-6: sınıfa özel
  isPublic: boolean; // Vitrin tanıtım sayfasında görünsün mü?
  category: string;
}

export interface RegistrationApplication {
  id: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  childName: string;
  childAge: string;
  preferredClassId: number;
  notes?: string;
  createdAt: string;
  status: "beklemede" | "arandi" | "onaylandi" | "reddedildi";
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  targetAudience: "tumu" | "veliler";
}

export interface MealMenuItem {
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
}

export interface Teacher {
  id: string;
  classId: number; // 1 to 6
  name: string;
  title: string;
  username: string; // Giriş kullanıcı adı, örn: "ogretmen1", "merve"
  password: string; // Şifre, örn: "1234"
  phone: string;
  email: string;
  avatar: string;
}

export type DuePaymentStatus = "odendi" | "odenmedi" | "beklemede";

export interface MonthlyDue {
  id: string;
  studentId: string;
  classId: number;
  month: string; // "Eylül 2026", "Ekim 2026", vb.
  monthIndex: number; // 1 - 10
  amount: number; // Tutar (TL)
  status: DuePaymentStatus;
  dueDate: string; // Son ödeme tarihi
  paidDate?: string; // Ödenme tarihi
  paymentMethod?: "Havale / EFT" | "Kredi Kartı" | "Nakit";
  receiptNo?: string;
  notes?: string;
}

