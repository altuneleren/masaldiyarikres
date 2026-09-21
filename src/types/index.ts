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
  iban?: string;
  baseSalary?: number;
}

export type DuePaymentStatus = "odendi" | "odenmedi" | "beklemede";

export interface MonthlyDue {
  id: string;
  studentId: string;
  classId: number;
  academicYear?: string; // e.g. "2026-2027", "2027-2028", "2028-2029", "2029-2030"
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

export type SalaryPaymentStatus = "odendi" | "odenmedi";

export interface TeacherSalary {
  id: string;
  teacherId: string;
  academicYear?: string; // e.g. "2026-2027", "2027-2028", "2028-2029", "2029-2030"
  month: string; // "Eylül 2026", "Ekim 2026", vb.
  monthIndex: number; // 1 - 10
  amount: number; // Net maaş (TL)
  bonus?: number; // Ek prim / nöbet ücreti
  deduction?: number; // Kesinti
  netTotal: number; // Toplam ele geçen net tutar
  status: SalaryPaymentStatus; // "odendi" | "odenmedi"
  dueDate: string; // Planlanan maaş günü (Örn: "2026-09-15")
  paidDate?: string; // Gerçekleşen ödeme tarihi
  paymentMethod?: "Banka Transferi / EFT" | "Nakit";
  dekontNo?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  studentId: string; // Hangi öğrencinin velisiyle sohbet edildiği
  classId: number; // Hangi sınıf
  senderType: "teacher" | "parent";
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string; // örn: "10:45" veya "Bugün 10:45"
  date: string; // YYYY-MM-DD
  read: boolean;
}

export type ExpenseCategory =
  | "market_gida" // Market, Mutfak & Gıda Alışverişi
  | "kirtasiye_egitim" // Kırtasiye, Sanat & Eğitici Materyaller
  | "temizlik_hijyen" // Temizlik, Deterjan & Hijyen Ürünleri
  | "faturalar" // Elektrik, Su, Doğalgaz, İnternet
  | "kira_aidat" // Bina Kirası & Tesis Aidatı
  | "bakim_onanim" // Bina, Bahçe & Donanım Bakımı
  | "ulasim_servis" // Servis Akaryakıt & Araç Bakım
  | "diger"; // Diğer İşletme Harcamaları

export interface KindergartenExpense {
  id: string;
  title: string; // Harcama başlığı: örn "Haftalık Taze Sebze & Meyve Market Alışverişi"
  category: ExpenseCategory;
  amount: number; // Tutar (TL)
  date: string; // YYYY-MM-DD
  academicYear?: string; // e.g. "2026-2027", "2027-2028", "2028-2029", "2029-2030"
  month: string; // "Eylül 2026", "Ekim 2026", vb.
  paymentMethod: "Kurumsal Kredi Kartı" | "Nakit / Kasa" | "Banka Havalesi / EFT";
  receiptNo?: string; // Fiş / Fatura No
  supplier?: string; // Alışveriş yapılan kurum / market (Örn: "Migros Toptan", "Metro Market")
  receiptImage?: string; // Fiş/fatura fotoğrafı (Base64 data URL veya görsel URL)
  recordedBy?: string; // Harcamayı sisteme giren yönetici / personel
  notes?: string;
  createdAt: string;
}

