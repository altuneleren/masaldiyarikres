import {
  ClassGroup,
  Student,
  DailyReport,
  ClassActivity,
  MediaItem,
  RegistrationApplication,
  Announcement,
  MealMenuItem,
  Teacher,
  MonthlyDue,
  DuePaymentStatus,
  ChatMessage,
  TeacherSalary,
  SalaryPaymentStatus,
  KindergartenExpense,
} from "../types";

export const INITIAL_CLASSES: ClassGroup[] = [
  {
    id: 1,
    name: "1. Sınıf: Minik Tırtıllar",
    shortName: "Minik Tırtıllar",
    ageGroup: "1 - 2 Yaş (Oyun & Keşif)",
    teacher: "Merve Güneş",
    teacherTitle: "Bebek & Erken Çocukluk Gelişim Uzmanı",
    room: "Papatya Salonu (Zemin Kat)",
    capacity: 10,
    color: "from-amber-400 to-orange-400",
    bgGradient: "bg-amber-50 border-amber-200",
    accentColor: "#F59E0B",
    icon: "🐛",
    description: "İlk adımlar, duyusal oyun havuzları, sevgi dolu bakım ve güvenli bağlanma odaklı sıcacık bir yuva.",
    scheduleHighlights: ["Duyusal Keşif Saati", "Şarkılı Ritim Oyunları", "Yumuşak Minder Parkuru", "Açık Hava Çim Saati"],
  },
  {
    id: 2,
    name: "2. Sınıf: Sevimli Kelebekler",
    shortName: "Sevimli Kelebekler",
    ageGroup: "2 - 3 Yaş (Dil & Hareket)",
    teacher: "Zeynep Çelik",
    teacherTitle: "Çocuk Gelişimi & Montessori Eğitmeni",
    room: "Gökkuşağı Sınıfı (1. Kat)",
    capacity: 12,
    color: "from-pink-400 to-rose-400",
    bgGradient: "bg-pink-50 border-pink-200",
    accentColor: "#EC4899",
    icon: "🦋",
    description: "Sözcüklerin zenginleştiği, parmak boyası ve özgür hareketlerle kendi benliğini keşfettiği renkli bir dünya.",
    scheduleHighlights: ["Parmak Boyası Atölyesi", "Hikaye Masal Çemberi", "Müzikli Jimnastik", "Bahçede Kum Oyunu"],
  },
  {
    id: 3,
    name: "3. Sınıf: Neşeli Sincaplar",
    shortName: "Neşeli Sincaplar",
    ageGroup: "3 - 4 Yaş (Sosyalleşme & Doğa)",
    teacher: "Elif Doğan",
    teacherTitle: "Okul Öncesi Öğretmeni & Doğa Pedagoğu",
    room: "Orman Atölyesi (1. Kat)",
    capacity: 14,
    color: "from-emerald-400 to-teal-500",
    bgGradient: "bg-emerald-50 border-emerald-200",
    accentColor: "#10B981",
    icon: "🐿️",
    description: "Paylaşma, işbirliği, doğayı gözlemleme, tohum ekme ve yaratıcı masal canlandırmalarıyla dolu bir grup.",
    scheduleHighlights: ["Botanik Bahçe Bakımı", "Rol Yapma & Drama", "Bilişsel Eşleştirme Oyunları", "Ahşap Blok İnşası"],
  },
  {
    id: 4,
    name: "4. Sınıf: Minik Mucitler",
    shortName: "Minik Mucitler",
    ageGroup: "4 - 5 Yaş (STEM & Deney)",
    teacher: "Selin Yılmaz",
    teacherTitle: "Okul Öncesi STEM & Zeka Oyunları Eğitmeni",
    room: "Mucitler Laboratuvarı (2. Kat)",
    capacity: 16,
    color: "from-sky-400 to-blue-500",
    bgGradient: "bg-sky-50 border-sky-200",
    accentColor: "#38BDF8",
    icon: "🔬",
    description: "Meraklı sorular, su ve yanardağ deneyleri, İngilizce şarkılar ve kavram gelişiminin zirve yaptığı sınıf.",
    scheduleHighlights: ["Eğlenceli Fen Deneyi", "İngilizce Oyun & Şarkı", "Origami & Seramik", "Minderli Yoga & Esneme"],
  },
  {
    id: 5,
    name: "5. Sınıf: Masal Kahramanları",
    shortName: "Masal Kahramanları",
    ageGroup: "5 - 6 Yaş (Yaratıcı Sanat & Kodlama)",
    teacher: "Gamze Karaca",
    teacherTitle: "Sanat Eğitmeni & Masal Terapisti",
    room: "Sanat & Düşler Odası (2. Kat)",
    capacity: 16,
    color: "from-purple-400 to-indigo-500",
    bgGradient: "bg-purple-50 border-purple-200",
    accentColor: "#8B5CF6",
    icon: "🧙‍♂️",
    description: "Ekranız algoritma oyunları, tiyatro çalışmaları, tuval boyama ve ilkokul öncesi özgüven güçlendirme.",
    scheduleHighlights: ["Kukla & Tiyatro Gösterisi", "Fiziksel Kodlama Matı", "Ritim & Orff Çalgıları", "Satranç Temelleri"],
  },
  {
    id: 6,
    name: "6. Sınıf: Geleceğin Yıldızları",
    shortName: "Geleceğin Yıldızları",
    ageGroup: "6 Yaş (İlkokula Hazırlık & Mezuniyet)",
    teacher: "Ahmet Özdemir",
    teacherTitle: "Kıdemli Okul Öncesi Eğitim Koordinatörü",
    room: "Yıldızlar Salonu (3. Kat)",
    capacity: 18,
    color: "from-amber-500 to-red-500",
    bgGradient: "bg-orange-50 border-orange-200",
    accentColor: "#F97316",
    icon: "⭐",
    description: "Çizgi çalışmaları, ses farkındalığı, temel matematik, sorumluluk bilinci ve görkemli mezuniyet yılı.",
    scheduleHighlights: ["Ses & Çizgi Çalışmaları", "Matematik & Mantık Atölyesi", "Sosyal Sorumluluk Kulübü", "İlkokul Oryantasyonu"],
  },
];

export const INITIAL_STUDENTS: Student[] = [
  // 1. Sınıf
  {
    id: "stu-101",
    classId: 1,
    name: "Ali",
    surname: "Demir",
    studentCode: "MD-101",
    username: "MD-101",
    password: "1234",
    gender: "erkek",
    avatar: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&auto=format&fit=crop&q=80",
    birthDate: "2024-03-12",
    parentName: "Hakan Demir (Baba)",
    parentPhone: "0532 111 22 33",
    parentEmail: "hakan.demir@example.com",
    emergencyContact: "0533 999 88 77 (Anneanne)",
    bloodType: "A Rh+",
    allergies: "Çilek alerjisi var",
    notes: "Uyku öncesi tavşan peluşunu seviyor.",
  },
  {
    id: "stu-102",
    classId: 1,
    name: "Ada",
    surname: "Kaya",
    studentCode: "MD-102",
    username: "MD-102",
    password: "1234",
    gender: "kız",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    birthDate: "2024-05-20",
    parentName: "Selin Kaya (Anne)",
    parentPhone: "0542 333 44 55",
    parentEmail: "selin.kaya@example.com",
    emergencyContact: "0543 222 11 00 (Baba)",
    bloodType: "0 Rh+",
    notes: "Müzikli oyunlarda çok enerjik.",
  },

  // 2. Sınıf
  {
    id: "stu-201",
    classId: 2,
    name: "Can",
    surname: "Yıldız",
    studentCode: "MD-201",
    username: "MD-201",
    password: "1234",
    gender: "erkek",
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&auto=format&fit=crop&q=80",
    birthDate: "2023-08-15",
    parentName: "Mehmet Yıldız (Baba)",
    parentPhone: "0555 444 55 66",
    parentEmail: "mehmet.yildiz@example.com",
    emergencyContact: "0555 111 33 22 (Anne)",
    bloodType: "B Rh+",
    notes: "Boyama yapmayı çok seviyor.",
  },
  {
    id: "stu-202",
    classId: 2,
    name: "Defne",
    surname: "Aydın",
    studentCode: "MD-202",
    username: "MD-202",
    password: "1234",
    gender: "kız",
    avatar: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=150&auto=format&fit=crop&q=80",
    birthDate: "2023-11-04",
    parentName: "Büşra Aydın (Anne)",
    parentPhone: "0535 777 88 99",
    parentEmail: "busra.aydin@example.com",
    emergencyContact: "0535 666 44 33 (Teyze)",
    bloodType: "AB Rh+",
    allergies: "Laktoz hassasiyeti var (Badem sütü verilebilir)",
  },

  // 3. Sınıf
  {
    id: "stu-301",
    classId: 3,
    name: "Efe",
    surname: "Öztürk",
    studentCode: "MD-301",
    username: "MD-301",
    password: "1234",
    gender: "erkek",
    avatar: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=150&auto=format&fit=crop&q=80",
    birthDate: "2022-04-10",
    parentName: "Cem Öztürk (Baba)",
    parentPhone: "0536 222 33 44",
    parentEmail: "cem.ozturk@example.com",
    emergencyContact: "0536 888 77 66 (Anne)",
    bloodType: "A Rh-",
    notes: "Bahçede böcek incelemeyi çok seviyor.",
  },
  {
    id: "stu-302",
    classId: 3,
    name: "Zeynep",
    surname: "Arslan",
    studentCode: "MD-302",
    username: "MD-302",
    password: "1234",
    gender: "kız",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    birthDate: "2022-09-22",
    parentName: "Derya Arslan (Anne)",
    parentPhone: "0544 555 66 77",
    parentEmail: "derya.arslan@example.com",
    emergencyContact: "0544 111 22 33 (Baba)",
    bloodType: "0 Rh+",
  },

  // 4. Sınıf
  {
    id: "stu-401",
    classId: 4,
    name: "Kerem",
    surname: "Şahin",
    studentCode: "MD-401",
    username: "MD-401",
    password: "1234",
    gender: "erkek",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    birthDate: "2021-02-18",
    parentName: "Murat Şahin (Baba)",
    parentPhone: "0533 777 66 55",
    parentEmail: "murat.sahin@example.com",
    emergencyContact: "0533 111 44 22 (Anne)",
    bloodType: "A Rh+",
    notes: "Legolarla kale yapma ustası.",
  },
  {
    id: "stu-402",
    classId: 4,
    name: "Elif",
    surname: "Koç",
    studentCode: "MD-402",
    username: "MD-402",
    password: "1234",
    gender: "kız",
    avatar: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=150&auto=format&fit=crop&q=80",
    birthDate: "2021-07-30",
    parentName: "Nuray Koç (Anne)",
    parentPhone: "0541 888 99 00",
    parentEmail: "nuray.koc@example.com",
    emergencyContact: "0541 333 55 44 (Baba)",
    bloodType: "B Rh+",
  },

  // 5. Sınıf
  {
    id: "stu-501",
    classId: 5,
    name: "Mert",
    surname: "Gül",
    studentCode: "MD-501",
    username: "MD-501",
    password: "1234",
    gender: "erkek",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    birthDate: "2020-03-05",
    parentName: "Oğuz Gül (Baba)",
    parentPhone: "0538 444 33 22",
    parentEmail: "oguz.gul@example.com",
    emergencyContact: "0538 999 11 22 (Anne)",
    bloodType: "0 Rh-",
  },
  {
    id: "stu-502",
    classId: 5,
    name: "Lara",
    surname: "Aksoy",
    studentCode: "MD-502",
    username: "MD-502",
    password: "1234",
    gender: "kız",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    birthDate: "2020-08-14",
    parentName: "Banu Aksoy (Anne)",
    parentPhone: "0537 666 55 44",
    parentEmail: "banu.aksoy@example.com",
    emergencyContact: "0537 222 33 11 (Baba)",
    bloodType: "A Rh+",
    allergies: "Fındık/Fıstık alerjisi var",
  },

  // 6. Sınıf
  {
    id: "stu-601",
    classId: 6,
    name: "Emir",
    surname: "Polat",
    studentCode: "MD-601",
    username: "MD-601",
    password: "1234",
    gender: "erkek",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    birthDate: "2019-01-25",
    parentName: "Kemal Polat (Baba)",
    parentPhone: "0539 333 22 11",
    parentEmail: "kemal.polat@example.com",
    emergencyContact: "0539 777 88 66 (Anne)",
    bloodType: "AB Rh-",
    notes: "Satranç kulübünde şampiyonluk adayı.",
  },
  {
    id: "stu-602",
    classId: 6,
    name: "Beren",
    surname: "Çetin",
    studentCode: "MD-602",
    username: "MD-602",
    password: "1234",
    gender: "kız",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    birthDate: "2019-06-11",
    parentName: "Gülizar Çetin (Anne)",
    parentPhone: "0545 222 11 99",
    parentEmail: "gulizar.cetin@example.com",
    emergencyContact: "0545 444 88 77 (Baba)",
    bloodType: "0 Rh+",
    notes: "Kitap okuma saatlerinde arkadaşlarına hikaye anlatıyor.",
  },
];

export const INITIAL_DAILY_REPORTS: DailyReport[] = [
  {
    id: "rep-101",
    studentId: "stu-101",
    date: "2026-09-16",
    meals: {
      breakfast: "hepsini_yedi",
      lunch: "yarisini_yedi",
      snack: "hepsini_yedi",
      notes: "Öğle yemeğindeki sebze çorbasını çok beğendi.",
    },
    sleep: {
      slept: true,
      durationMinutes: 90,
      notes: "13:00 - 14:30 arası kesintisiz ve huzurlu uyudu.",
    },
    mood: "cok_mutlu",
    activitiesAttended: ["Duyusal Keşif Saati", "Şarkılı Ritim Oyunları"],
    teacherNote: "Ali bugün parmak oyunlarında çok heyecanlıydı. Arkadaşlarına sarılarak gülümsedi. Harika bir gün geçirdi!",
  },
  {
    id: "rep-102",
    studentId: "stu-102",
    date: "2026-09-16",
    meals: {
      breakfast: "hepsini_yedi",
      lunch: "hepsini_yedi",
      snack: "hepsini_yedi",
      notes: "Meyve tabağındaki elmaları neşeyle tüketti.",
    },
    sleep: {
      slept: true,
      durationMinutes: 75,
      notes: "Masal eşliğinde kolayca uykuya daldı.",
    },
    mood: "neseli",
    activitiesAttended: ["Yumuşak Minder Parkuru", "Duyusal Keşif Saati"],
    teacherNote: "Ada bugün jimnastik minderinde dengede durma oyununu büyük bir başarıyla tamamladı.",
  },
  {
    id: "rep-201",
    studentId: "stu-201",
    date: "2026-09-16",
    meals: {
      breakfast: "yarisini_yedi",
      lunch: "hepsini_yedi",
      snack: "hepsini_yedi",
    },
    sleep: {
      slept: true,
      durationMinutes: 80,
    },
    mood: "cok_mutlu",
    activitiesAttended: ["Parmak Boyası Atölyesi", "Hikaye Masal Çemberi"],
    teacherNote: "Can kelebek resmini gökkuşağı renkleriyle boyadı. Sanat çalışmasını panomuza astık!",
  },
  {
    id: "rep-301",
    studentId: "stu-301",
    date: "2026-09-16",
    meals: {
      breakfast: "hepsini_yedi",
      lunch: "hepsini_yedi",
      snack: "hepsini_yedi",
    },
    sleep: {
      slept: true,
      durationMinutes: 60,
    },
    mood: "neseli",
    activitiesAttended: ["Botanik Bahçe Bakımı", "Rol Yapma & Drama"],
    teacherNote: "Efe okul bahçesindeki nane fidanlarını suladı. Doğaya olan ilgisi hepimizi hayran bırakıyor.",
  },
  {
    id: "rep-401",
    studentId: "stu-401",
    date: "2026-09-16",
    meals: {
      breakfast: "hepsini_yedi",
      lunch: "hepsini_yedi",
      snack: "hepsini_yedi",
    },
    sleep: {
      slept: false,
      durationMinutes: 0,
      notes: "Sessiz kitap okuma köşesinde dinlendi.",
    },
    mood: "cok_mutlu",
    activitiesAttended: ["Eğlenceli Fen Deneyi", "İngilizce Oyun"],
    teacherNote: "Kerem volkan deneyi sırasında en önde gözlem yaptı. 'Lava' sözcüğünü hemen öğrendi!",
  },
  {
    id: "rep-501",
    studentId: "stu-501",
    date: "2026-09-16",
    meals: {
      breakfast: "hepsini_yedi",
      lunch: "hepsini_yedi",
      snack: "hepsini_yedi",
    },
    sleep: {
      slept: false,
      durationMinutes: 0,
      notes: "Serbest dinlenme saati uygulandı.",
    },
    mood: "cok_mutlu",
    activitiesAttended: ["Kukla & Tiyatro", "Fiziksel Kodlama Matı"],
    teacherNote: "Mert kodlama matında robot arkadaşını doğru yönergelerle hedefe ulaştırdı. Tebrikler!",
  },
  {
    id: "rep-601",
    studentId: "stu-601",
    date: "2026-09-16",
    meals: {
      breakfast: "hepsini_yedi",
      lunch: "hepsini_yedi",
      snack: "hepsini_yedi",
    },
    sleep: {
      slept: false,
      durationMinutes: 0,
    },
    mood: "cok_mutlu",
    activitiesAttended: ["Ses & Çizgi Çalışmaları", "Matematik & Mantık"],
    teacherNote: "Emir çizgi labirentini hatasız tamamladı. İlkokul odaklanma becerisi çok yüksek seviyede.",
  },
];

export const INITIAL_ACTIVITIES: ClassActivity[] = [
  {
    id: "act-101",
    classId: 1,
    title: "Duyusal Su ve Jöle Oyunları",
    time: "10:30 - 11:15",
    date: "Bugün",
    category: "Oyun",
    description: "Farklı dokulardaki organik nesneleri keşfetme, el kaslarını ve duyu bütünlüğünü güçlendirme.",
    instructor: "Merve Güneş",
  },
  {
    id: "act-102",
    classId: 1,
    title: "Minik Sesler Ritim Atölyesi",
    time: "15:00 - 15:45",
    date: "Bugün",
    category: "Müzik",
    description: "Marakas ve tefler eşliğinde neşeli çocuk şarkıları dinleme ve alkış tutma.",
    instructor: "Merve Güneş",
  },
  {
    id: "act-201",
    classId: 2,
    title: "Gökkuşağı Parmak Boyası",
    time: "10:00 - 11:00",
    date: "Bugün",
    category: "Sanat",
    description: "Büyük kağıtlar üzerinde eller ve süngerlerle renkleri karıştırarak özgür ifade.",
    instructor: "Zeynep Çelik",
  },
  {
    id: "act-202",
    classId: 2,
    title: "Masal Minderi & Hayvan Sesleri",
    time: "14:30 - 15:15",
    date: "Bugün",
    category: "Dil",
    description: "Büyük resimli masal kitabından orman hayvanlarını tanıma ve seslerini taklit etme.",
    instructor: "Zeynep Çelik",
  },
  {
    id: "act-301",
    classId: 3,
    title: "Ekolojik Bahçe ve Tohum Ekimi",
    time: "10:15 - 11:30",
    date: "Bugün",
    category: "Fen & Doğa",
    description: "Bahçemizde kendi minik saksılarımıza domates ve lavanta tohumları ekiyoruz.",
    instructor: "Elif Doğan",
  },
  {
    id: "act-302",
    classId: 3,
    title: "Orff Çalgıları ile Ritim Çemberi",
    time: "15:30 - 16:15",
    date: "Bugün",
    category: "Müzik",
    description: "Ksilofon ve üçgen zillerle ritim kalıpları çıkarma ve takım uyumu.",
    instructor: "Elif Doğan",
  },
  {
    id: "act-401",
    classId: 4,
    title: "Renkli Köpüren Yanardağ Deneyi",
    time: "11:00 - 12:00",
    date: "Bugün",
    category: "Fen & Doğa",
    description: "Karbonat ve sirke tepkimesini güvenli şekilde gözlemleme, kimya merakı.",
    instructor: "Selin Yılmaz",
  },
  {
    id: "act-402",
    classId: 4,
    title: "İngilizce Drama: 'The Little Bear'",
    time: "14:45 - 15:30",
    date: "Bugün",
    category: "Dil",
    description: "İngilizce diyaloglar eşliğinde ayı kostümü ve arkadaşları canlandırması.",
    instructor: "Selin Yılmaz",
  },
  {
    id: "act-501",
    classId: 5,
    title: "Algoritma ve Labirent Matı",
    time: "10:30 - 11:30",
    date: "Bugün",
    category: "Bilişsel & Kodlama",
    description: "Ok yönleri ve komut kartları kullanarak arkadaşını hazineye ulaştırma oyunu.",
    instructor: "Gamze Karaca",
  },
  {
    id: "act-502",
    classId: 5,
    title: "Kil ve Seramik Çömlek Atölyesi",
    time: "15:15 - 16:15",
    date: "Bugün",
    category: "Sanat",
    description: "Doğal seramik çamuru ile sevimli hayvan figürleri ve tabaklar tasarlama.",
    instructor: "Gamze Karaca",
  },
  {
    id: "act-601",
    classId: 6,
    title: "Fonolojik Farkındalık & Ses Avı",
    time: "09:30 - 10:30",
    date: "Bugün",
    category: "Bilişsel & Kodlama",
    description: "Kelimelerin ilk ve son seslerini bulma, ilkokul okuma-yazma hazırlık egzersizleri.",
    instructor: "Ahmet Özdemir",
  },
  {
    id: "act-602",
    classId: 6,
    title: "Satranç Stratejisi: Şah & Vezir",
    time: "14:00 - 15:00",
    date: "Bugün",
    category: "Bilişsel & Kodlama",
    description: "Büyük satranç tahtasında taşların hareket mantığı ve hamle planlama.",
    instructor: "Ahmet Özdemir",
  },
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "med-1",
    type: "image",
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    title: "Bahar Şenliği ve Açık Hava Oyunları",
    description: "Çocuklarımız kreşimizin yemyeşil bahçesinde doğanın tadını çıkarırken.",
    date: "2026-09-15",
    classId: null,
    isPublic: true,
    category: "Bahçe Oyunları",
  },
  {
    id: "med-2",
    type: "image",
    url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
    title: "Minik Parmaklar Renkli Dünyalar",
    description: "2. Sınıf Kelebekler grubumuzun eğlenceli parmak boyama serüveni.",
    date: "2026-09-14",
    classId: 2,
    isPublic: true,
    category: "Sanat Atölyesi",
  },
  {
    id: "med-3",
    type: "image",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    title: "Kitap Kurdu Masal Saati",
    description: "Masal köşemizde öğretmenimiz eşliğinde sihirli bir serüvene yolculuk.",
    date: "2026-09-12",
    classId: 3,
    isPublic: true,
    category: "Özel Günler",
  },
  {
    id: "med-4",
    type: "image",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
    title: "Minik Mucitler STEM Laboratuvarı",
    description: "4. Sınıf öğrencilerimiz fen deneyleriyle suyun kaldırma kuvvetini keşfediyor.",
    date: "2026-09-11",
    classId: 4,
    isPublic: true,
    category: "Doğa & Bilim",
  },
  {
    id: "med-5",
    type: "image",
    url: "https://images.unsplash.com/photo-1596464716127-f2a829822391?w=800&auto=format&fit=crop&q=80",
    title: "Masal Kahramanları Tiyatro Provası",
    description: "5. Sınıfımızın hazırladığı Orman Dostları tiyatro oyununun kostümlü provası.",
    date: "2026-09-10",
    classId: 5,
    isPublic: true,
    category: "Sanat Atölyesi",
  },
  {
    id: "med-6",
    type: "image",
    url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
    title: "Geleceğin Yıldızları Mezuniyet Heyecanı",
    description: "6. Sınıf mezun adaylarımız kepleriyle ilkokula gururla adım atıyor.",
    date: "2026-09-08",
    classId: 6,
    isPublic: true,
    category: "Özel Günler",
  },
  {
    id: "med-7",
    type: "video",
    url: "https://assets.mixkit.co/videos/preview/mixkit-children-playing-with-plasticine-at-kindergarten-43309-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
    title: "Oyun Hamuru ve Heykel Sanatı Videosu",
    description: "Çocuklarımızın parmak kaslarını geliştiren renkli oyun hamuru çalışması anları.",
    date: "2026-09-15",
    classId: null,
    isPublic: true,
    category: "Sanat Atölyesi",
  },
  {
    id: "med-8",
    type: "video",
    url: "https://assets.mixkit.co/videos/preview/mixkit-kids-playing-in-a-kindergarten-classroom-43307-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    title: "Kreşimizde Bir Gün - Tanıtım Filmi",
    description: "Masal Diyarı'nda neşe dolu sabah karşılamasından gün sonu oyunlarına renkli kesitler.",
    date: "2026-09-16",
    classId: null,
    isPublic: true,
    category: "Genel",
  },
];

export const INITIAL_MENU: MealMenuItem[] = [
  {
    day: "Pazartesi",
    breakfast: "Köy yumurtalı omlet, tulum peyniri, ev yapımı zeytin ezmesi, ıhlamur çayı, tam buğday ekmeği",
    lunch: "Süzme mercimek çorbası, fırında sebzeli köfte, bulgur pilavı, ev yapımı probiyotik yoğurt",
    snack: "Fırınlanmış tarçınlı elma dilimleri ve ceviz içi",
  },
  {
    day: "Salı",
    breakfast: "Organik yulaf lapası, taze muz ve böğürtlen parçaları, kaşar peyniri, ılık süt",
    lunch: "Tarhana çorbası, nohutlu taze köy tavuğu yahnisi, basmati pirinç pilavı, mevsim salatası",
    snack: "Ev yapımı havuçlu kek ve taze sıkılmış portakal suyu",
  },
  {
    day: "Çarşamba",
    breakfast: "Peynirli mini gül böreği, domates-salatalık söğüş, haşlanmış yumurta, taze nane çayı",
    lunch: "Balkabağı çorbası, ev yapımı kıymalı mantı, taze nane soslu yoğurt",
    snack: "Kuru kayısı, kuru incir ve kavrulmamış çiğ badem",
  },
  {
    day: "Perşembe",
    breakfast: "Menemen, lor peynirli taze yeşillikler, zeytin, kepekli tost ekmeği, açık papatya çayı",
    lunch: "Kremasız sebze çorbası, fırında somon balığı, fırın patates, limonlu yeşil salata",
    snack: "Ev yapımı muzlu puding (şekersiz, hurma özlü)",
  },
  {
    day: "Cuma",
    breakfast: "Pankek (organik un & yumurta), doğal çiçek balı, labne peyniri, ceviz, taze süt",
    lunch: "Şehriye çorbası, zeytinyağlı taze fasulye, arpa şehriyeli pirinç pilavı, cacık",
    snack: "Fırından yeni çıkmış simit ve taze tulum peyniri",
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "🎉 Bahar Dönemi Masal Şenliği ve Sanat Sergisi",
    content: "Öğrencilerimizin yıl boyunca yaptığı kil heykeller ve tuval tabloları bu Cuma saat 15:00'te kreşimizin fuayesinde sergilenecektir. Tüm velilerimiz davetlidir!",
    date: "2026-09-15",
    important: true,
    targetAudience: "tumu",
  },
  {
    id: "ann-2",
    title: "🦷 Çocuk Diş Hekimi Kontrolü & Sağlık Taraması",
    content: "Pazartesi günü anlaşmalı uzman pedodontistimiz tüm sınıflarımızda minik diş kontrolü gerçekleştirecektir. Raporlar veli sistemine yüklenecektir.",
    date: "2026-09-14",
    important: false,
    targetAudience: "veliler",
  },
  {
    id: "ann-3",
    title: "🌿 4 ve 5. Sınıflar Botanik Park Gezisi",
    content: "Minik Mucitler ve Masal Kahramanları sınıflarımız Çarşamba günü Atatürk Arboretumu'nda doğa keşfinde olacaklardır. Lütfen rahat spor ayakkabı giydiriniz.",
    date: "2026-09-13",
    important: true,
    targetAudience: "veliler",
  },
];

export const INITIAL_APPLICATIONS: RegistrationApplication[] = [
  {
    id: "app-1",
    parentName: "Ayşe Yücel",
    parentPhone: "0532 999 11 22",
    parentEmail: "ayse.yucel@example.com",
    childName: "Deniz Yücel",
    childAge: "3 Yaş",
    preferredClassId: 3,
    notes: "Tam gün program istiyoruz. Servis imkanı var mı?",
    createdAt: "2026-09-16 14:20",
    status: "beklemede",
  },
  {
    id: "app-2",
    parentName: "Tolga Erdem",
    parentPhone: "0542 888 77 66",
    parentEmail: "tolga.erdem@example.com",
    childName: "Melis Erdem",
    childAge: "4 Yaş",
    preferredClassId: 4,
    notes: "Montessori ağırlıklı sınıfınız için görüşmek istiyoruz.",
    createdAt: "2026-09-15 18:45",
    status: "arandi",
  },
];

export const DEFAULT_ACADEMIC_YEAR = "2026-2027";

export const AVAILABLE_ACADEMIC_YEARS = [
  "2026-2027",
  "2027-2028",
  "2028-2029",
  "2029-2030",
  "2030-2031",
];

export const getAcademicMonthsForYear = (academicYear: string): string[] => {
  const parts = academicYear.split("-");
  const startYear = parseInt(parts[0], 10) || 2026;
  const endYear = parseInt(parts[1], 10) || startYear + 1;

  return [
    `Eylül ${startYear}`,
    `Ekim ${startYear}`,
    `Kasım ${startYear}`,
    `Aralık ${startYear}`,
    `Ocak ${endYear}`,
    `Şubat ${endYear}`,
    `Mart ${endYear}`,
    `Nisan ${endYear}`,
    `Mayıs ${endYear}`,
    `Haziran ${endYear}`,
  ];
};

export const getAcademicYearFromDate = (dateStr: string): string => {
  if (!dateStr) return DEFAULT_ACADEMIC_YEAR;
  const parts = dateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (isNaN(year) || isNaN(month)) return DEFAULT_ACADEMIC_YEAR;
  if (month >= 9) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
};

export const ACADEMIC_MONTHS = getAcademicMonthsForYear(DEFAULT_ACADEMIC_YEAR);

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: "tch-1",
    classId: 1,
    name: "Merve Güneş",
    title: "Bebek & Erken Çocukluk Gelişim Uzmanı",
    username: "ogretmen1",
    password: "1234",
    phone: "0532 101 00 01",
    email: "merve.gunes@masaldiyari.k12.tr",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    iban: "TR34 0001 0090 1023 4567 8901 01",
    baseSalary: 42500,
  },
  {
    id: "tch-2",
    classId: 2,
    name: "Zeynep Çelik",
    title: "Çocuk Gelişimi & Montessori Eğitmeni",
    username: "ogretmen2",
    password: "1234",
    phone: "0532 101 00 02",
    email: "zeynep.celik@masaldiyari.k12.tr",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    iban: "TR56 0006 2000 1234 5678 9012 34",
    baseSalary: 41000,
  },
  {
    id: "tch-3",
    classId: 3,
    name: "Elif Doğan",
    title: "Okul Öncesi Öğretmeni & Doğa Pedagoğu",
    username: "ogretmen3",
    password: "1234",
    phone: "0532 101 00 03",
    email: "elif.dogan@masaldiyari.k12.tr",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    iban: "TR78 0006 4000 0011 2233 4455 66",
    baseSalary: 43500,
  },
  {
    id: "tch-4",
    classId: 4,
    name: "Selin Yılmaz",
    title: "Okul Öncesi STEM & Zeka Oyunları Eğitmeni",
    username: "ogretmen4",
    password: "1234",
    phone: "0532 101 00 04",
    email: "selin.yilmaz@masaldiyari.k12.tr",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    iban: "TR90 0001 5001 5566 7788 9900 11",
    baseSalary: 42000,
  },
  {
    id: "tch-5",
    classId: 5,
    name: "Gamze Karaca",
    title: "Sanat Eğitmeni & Masal Terapisti",
    username: "ogretmen5",
    password: "1234",
    phone: "0532 101 00 05",
    email: "gamze.karaca@masaldiyari.k12.tr",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    iban: "TR12 0006 7000 9988 7766 5544 33",
    baseSalary: 40500,
  },
  {
    id: "tch-6",
    classId: 6,
    name: "Ahmet Özdemir",
    title: "Kıdemli Okul Öncesi Eğitim Koordinatörü",
    username: "ogretmen6",
    password: "1234",
    phone: "0532 101 00 06",
    email: "ahmet.ozdemir@masaldiyari.k12.tr",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    iban: "TR34 0001 2009 8877 6655 4433 22",
    baseSalary: 46000,
  },
];

// Helper to generate 10-month dues for any academic year (2026-2027, 2027-2028, 2028-2029, 2029-2030, etc.)
export const generateDuesForYear = (
  academicYear: string,
  students: Student[] = INITIAL_STUDENTS
): MonthlyDue[] => {
  const dues: MonthlyDue[] = [];
  const months = getAcademicMonthsForYear(academicYear);
  const parts = academicYear.split("-");
  const startYear = parseInt(parts[0], 10) || 2026;
  const endYear = parseInt(parts[1], 10) || startYear + 1;

  const monthDueDates = [
    `${startYear}-09-05`,
    `${startYear}-10-05`,
    `${startYear}-11-05`,
    `${startYear}-12-05`,
    `${endYear}-01-05`,
    `${endYear}-02-05`,
    `${endYear}-03-05`,
    `${endYear}-04-05`,
    `${endYear}-05-05`,
    `${endYear}-06-05`,
  ];

  students.forEach((student) => {
    months.forEach((monthName, idx) => {
      const monthIndex = idx + 1;
      const dueDate = monthDueDates[idx];
      const dueId = `due-${academicYear}-${student.id}-${monthIndex}`;
      let status: DuePaymentStatus = "odenmedi";
      let paidDate: string | undefined = undefined;
      let paymentMethod: "Havale / EFT" | "Kredi Kartı" | "Nakit" | undefined = undefined;
      let receiptNo: string | undefined = undefined;
      let notes: string | undefined = undefined;

      // Realistic mock payment records for the active 2026-2027 seed year
      if (academicYear === "2026-2027") {
        if (monthIndex === 1) {
          // September (current month): most paid, 1 pending, 1 unpaid
          if (student.id === "stu-202") {
            status = "beklemede";
            notes = "Veli havale dekontu gönderecek";
          } else if (student.id === "stu-602") {
            status = "odenmedi";
            notes = "Gecikmede - Hatırlatma SMS'i iletildi";
          } else {
            status = "odendi";
            paidDate = `2026-09-0${(parseInt(student.id.replace(/\D/g, "")) % 4) + 1}`;
            paymentMethod = idx % 2 === 0 ? "Havale / EFT" : "Kredi Kartı";
            receiptNo = `MAK-2026-09-${student.id.replace("stu-", "")}`;
            notes = "Eylül aidatı zamanında tahsil edildi";
          }
        } else if (monthIndex === 2) {
          // October: a few early payers
          if (student.id === "stu-101" || student.id === "stu-301" || student.id === "stu-501") {
            status = "odendi";
            paidDate = "2026-09-15";
            paymentMethod = "Havale / EFT";
            receiptNo = `MAK-2026-10-${student.id.replace("stu-", "")}`;
            notes = "Erken dönem peşin ödendi";
          } else if (student.id === "stu-102") {
            status = "beklemede";
            notes = "Kredi kartı otomatik talimatında";
          } else {
            status = "odenmedi";
          }
        } else {
          status = "odenmedi";
        }
      }

      dues.push({
        id: dueId,
        studentId: student.id,
        classId: student.classId,
        academicYear,
        month: monthName,
        monthIndex,
        amount: 12500, // 12.500 TL
        status,
        dueDate,
        paidDate,
        paymentMethod,
        receiptNo,
        notes,
      });
    });
  });

  return dues;
};

// Seed initial dues across all available academic years (2026-2027, 2027-2028, 2028-2029, 2029-2030, 2030-2031)
export const INITIAL_DUES: MonthlyDue[] = AVAILABLE_ACADEMIC_YEARS.flatMap((yr) =>
  generateDuesForYear(yr, INITIAL_STUDENTS)
);

export const INITIAL_MESSAGES: ChatMessage[] = [
  // 1. Sınıf - Ali Demir (stu-101) & Merve Öğretmen
  {
    id: "msg-101-1",
    studentId: "stu-101",
    classId: 1,
    senderType: "parent",
    senderName: "Hakan Demir (Veli)",
    text: "Merhaba Merve Öğretmenim, Ali sabah kahvaltısını evde biraz az yaptı, meyve saatinde elmasını yerse çok seviniriz.",
    timestamp: "10:15",
    date: "2026-09-17",
    read: true,
  },
  {
    id: "msg-101-2",
    studentId: "stu-101",
    classId: 1,
    senderType: "teacher",
    senderName: "Merve Güneş (Öğretmen)",
    text: "Merhaba Hakan Bey, merak etmeyin az önce meyve saatinde arkadaşlarıyla neşeyle elmasını ve cevizini afiyetle yedi 🍏",
    timestamp: "10:30",
    date: "2026-09-17",
    read: true,
  },
  {
    id: "msg-101-3",
    studentId: "stu-101",
    classId: 1,
    senderType: "parent",
    senderName: "Hakan Demir (Veli)",
    text: "Harika, çok sevindik! Bugün saat 16:30 gibi okuldan amcası alacak, bilginize sunarım.",
    timestamp: "11:05",
    date: "2026-09-17",
    read: true,
  },
  {
    id: "msg-101-4",
    studentId: "stu-101",
    classId: 1,
    senderType: "teacher",
    senderName: "Merve Güneş (Öğretmen)",
    text: "Notumu aldım Hakan Bey, hazırlayacağız. İyi günler dilerim 😊",
    timestamp: "11:15",
    date: "2026-09-17",
    read: true,
  },

  // 1. Sınıf - Ada Kaya (stu-102) & Merve Öğretmen
  {
    id: "msg-102-1",
    studentId: "stu-102",
    classId: 1,
    senderType: "parent",
    senderName: "Selin Kaya (Veli)",
    text: "Merve Hanım iyi günler, Ada'nın sırt çantasında pembe hırkası var, bahçe etkinliğine çıkarken giydirirseniz çok sevinirim.",
    timestamp: "09:40",
    date: "2026-09-17",
    read: true,
  },
  {
    id: "msg-102-2",
    studentId: "stu-102",
    classId: 1,
    senderType: "teacher",
    senderName: "Merve Güneş (Öğretmen)",
    text: "İyi günler Selin Hanım! Notumu aldım, bahçe saatinde hırkasını giydireceğim, keyfi çok yerinde merak etmeyiniz 🌸",
    timestamp: "09:55",
    date: "2026-09-17",
    read: true,
  },

  // 2. Sınıf - Can Yıldız (stu-201) & Zeynep Öğretmen
  {
    id: "msg-201-1",
    studentId: "stu-201",
    classId: 2,
    senderType: "parent",
    senderName: "Mehmet Yıldız (Veli)",
    text: "Zeynep Öğretmenim merhaba, Can parmak boyası dersini dört gözle bekliyordu, boya yapabildi mi?",
    timestamp: "11:20",
    date: "2026-09-17",
    read: true,
  },
  {
    id: "msg-201-2",
    studentId: "stu-201",
    classId: 2,
    senderType: "teacher",
    senderName: "Zeynep Çelik (Öğretmen)",
    text: "Merhaba Mehmet Bey! Can harika bir gökkuşağı tablosu yaptı, çıkışta panoda sergilenecek, birlikte görebilirsiniz 🎨",
    timestamp: "11:45",
    date: "2026-09-17",
    read: true,
  },
];

// Helper to generate 10-month salary slips for any academic year
export const generateSalariesForYear = (
  academicYear: string,
  teachers: Teacher[] = INITIAL_TEACHERS
): TeacherSalary[] => {
  const salaries: TeacherSalary[] = [];
  const months = getAcademicMonthsForYear(academicYear);
  const parts = academicYear.split("-");
  const startYear = parseInt(parts[0], 10) || 2026;
  const endYear = parseInt(parts[1], 10) || startYear + 1;

  const salaryPayDates = [
    `${startYear}-09-15`,
    `${startYear}-10-15`,
    `${startYear}-11-15`,
    `${startYear}-12-15`,
    `${endYear}-01-15`,
    `${endYear}-02-15`,
    `${endYear}-03-15`,
    `${endYear}-04-15`,
    `${endYear}-05-15`,
    `${endYear}-06-15`,
  ];

  teachers.forEach((teacher) => {
    const base = teacher.baseSalary || 42000;

    months.forEach((month, mIdx) => {
      const monthNum = mIdx + 1;
      const dueDate = salaryPayDates[mIdx];
      let status: SalaryPaymentStatus = "odenmedi";
      let paidDate: string | undefined = undefined;
      let dekontNo: string | undefined = undefined;
      let notes: string | undefined = undefined;
      let bonus = 0;
      const deduction = 0;

      // Realistic mock statuses for the active 2026-2027 seed year
      if (academicYear === "2026-2027") {
        if (monthNum === 1) {
          status = "odendi";
          paidDate = "2026-09-15";
          dekontNo = `BORD-2026-09-0${teacher.classId}`;
          bonus = teacher.classId === 1 || teacher.classId === 6 ? 2000 : 1000;
          notes = "Eylül ayı net maaşı ve eğitim-öğretime hazırlık ödeneği Ziraat Bankası maaş hesabına aktarıldı.";
        } else if (monthNum === 2) {
          if (teacher.classId <= 4) {
            status = "odendi";
            paidDate = "2026-10-15";
            dekontNo = `BORD-2026-10-0${teacher.classId}`;
            notes = "Ekim ayı net maaşı banka transferi ile yatırıldı.";
          } else {
            status = "odenmedi";
            notes = "Ekim ayı maaş bordrosu muhasebe onayında bekliyor.";
          }
        } else {
          status = "odenmedi";
          notes = "Planlanan maaş ödeme günü her ayın 15'idir.";
        }
      } else {
        status = "odenmedi";
        notes = "Planlanan maaş ödeme günü her ayın 15'idir.";
      }

      salaries.push({
        id: `sal-${academicYear}-${teacher.id}-${monthNum}`,
        teacherId: teacher.id,
        academicYear,
        month,
        monthIndex: monthNum,
        amount: base,
        bonus,
        deduction,
        netTotal: base + bonus - deduction,
        status,
        dueDate,
        paidDate,
        paymentMethod: "Banka Transferi / EFT",
        dekontNo,
        notes,
      });
    });
  });

  return salaries;
};

// Seed initial teacher salaries across all available academic years (2026-2027, 2027-2028, 2028-2029, 2029-2030, 2030-2031)
export const INITIAL_TEACHER_SALARIES: TeacherSalary[] = AVAILABLE_ACADEMIC_YEARS.flatMap((yr) =>
  generateSalariesForYear(yr, INITIAL_TEACHERS)
);

// Helper to generate realistic SVG thermal receipt / invoice data URLs
export const createReceiptSvgDataUrl = (
  storeName: string,
  receiptNo: string,
  date: string,
  items: { name: string; price: number }[],
  total: number,
  categoryLabel: string
): string => {
  const itemsXml = items
    .map(
      (item, idx) => `
    <text x="24" y="${175 + idx * 22}" font-family="monospace" font-size="11" fill="#334155">${item.name.slice(0, 24)}</text>
    <text x="356" y="${175 + idx * 22}" font-family="monospace" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="end">${item.price.toLocaleString("tr-TR")} ₺</text>
  `
    )
    .join("");

  const totalY = 185 + items.length * 22;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 490" width="380" height="490">
    <rect width="100%" height="100%" fill="#f8fafc"/>
    <rect x="10" y="10" width="360" height="470" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <path d="M 10 10 L 370 10" stroke="#cbd5e1" stroke-dasharray="4 4" stroke-width="2"/>
    
    <!-- Store Header -->
    <text x="190" y="42" font-family="sans-serif" font-size="15" font-weight="900" fill="#0f172a" text-anchor="middle">${storeName.toUpperCase()}</text>
    <text x="190" y="60" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="middle">ÖZEL MASAL DİYARI KREŞİ HARCAMA BELGESİ</text>
    <text x="190" y="74" font-family="sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">KURUMSAL HARCAMA VE GİDER FİŞİ</text>
    
    <line x1="24" y1="88" x2="356" y2="88" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="2 2"/>
    
    <!-- Meta Info -->
    <text x="24" y="108" font-family="monospace" font-size="11" fill="#475569">TARİH : ${date}</text>
    <text x="356" y="108" font-family="monospace" font-size="11" fill="#475569" text-anchor="end">FİŞ NO: ${receiptNo}</text>
    <text x="24" y="125" font-family="monospace" font-size="11" fill="#475569">KATEG : ${categoryLabel}</text>
    <text x="356" y="125" font-family="monospace" font-size="11" fill="#16a34a" font-weight="bold" text-anchor="end">✓ ÖDENDİ</text>
    
    <line x1="24" y1="138" x2="356" y2="138" stroke="#cbd5e1" stroke-width="1"/>
    <text x="24" y="154" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b">ÜRÜN / AÇIKLAMA</text>
    <text x="356" y="154" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end">TUTAR</text>
    <line x1="24" y1="162" x2="356" y2="162" stroke="#cbd5e1" stroke-width="1"/>
    
    <!-- Items -->
    ${itemsXml}
    
    <line x1="24" y1="${totalY}" x2="356" y2="${totalY}" stroke="#0f172a" stroke-width="1.5"/>
    <text x="24" y="${totalY + 24}" font-family="sans-serif" font-size="13" font-weight="900" fill="#0f172a">TOPLAM TUTAR</text>
    <text x="356" y="${totalY + 24}" font-family="monospace" font-size="15" font-weight="900" fill="#059669" text-anchor="end">${total.toLocaleString("tr-TR")} ₺</text>
    <text x="24" y="${totalY + 40}" font-family="sans-serif" font-size="9" fill="#64748b">KDV DAHİLDİR (KURUMSAL HARCAMA KARTI)</text>
    
    <!-- Barcode simulation -->
    <rect x="90" y="${totalY + 54}" width="4" height="24" fill="#1e293b"/>
    <rect x="98" y="${totalY + 54}" width="7" height="24" fill="#1e293b"/>
    <rect x="109" y="${totalY + 54}" width="3" height="24" fill="#1e293b"/>
    <rect x="115" y="${totalY + 54}" width="6" height="24" fill="#1e293b"/>
    <rect x="124" y="${totalY + 54}" width="8" height="24" fill="#1e293b"/>
    <rect x="136" y="${totalY + 54}" width="4" height="24" fill="#1e293b"/>
    <rect x="144" y="${totalY + 54}" width="7" height="24" fill="#1e293b"/>
    <rect x="155" y="${totalY + 54}" width="3" height="24" fill="#1e293b"/>
    <rect x="162" y="${totalY + 54}" width="8" height="24" fill="#1e293b"/>
    <rect x="174" y="${totalY + 54}" width="5" height="24" fill="#1e293b"/>
    <rect x="183" y="${totalY + 54}" width="4" height="24" fill="#1e293b"/>
    <rect x="191" y="${totalY + 54}" width="9" height="24" fill="#1e293b"/>
    <rect x="204" y="${totalY + 54}" width="3" height="24" fill="#1e293b"/>
    <rect x="211" y="${totalY + 54}" width="7" height="24" fill="#1e293b"/>
    <rect x="222" y="${totalY + 54}" width="5" height="24" fill="#1e293b"/>
    <rect x="231" y="${totalY + 54}" width="8" height="24" fill="#1e293b"/>
    <rect x="243" y="${totalY + 54}" width="4" height="24" fill="#1e293b"/>
    <rect x="251" y="${totalY + 54}" width="6" height="24" fill="#1e293b"/>
    <rect x="261" y="${totalY + 54}" width="8" height="24" fill="#1e293b"/>
    <rect x="273" y="${totalY + 54}" width="4" height="24" fill="#1e293b"/>
    <text x="190" y="${totalY + 90}" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">* * TEŞEKKÜR EDERİZ * *</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const SAMPLE_RECEIPT_PRESETS = [
  {
    name: "Migros Toptan Market Fişi (Mutfak & Kahvaltı)",
    supplier: "Migros Ticaret A.Ş.",
    category: "market_gida" as const,
    getDataUrl: (amount: number, receiptNo: string, date: string) =>
      createReceiptSvgDataUrl(
        "MİGROS TOPTAN TİCARET",
        receiptNo || "MGR-2026-8841",
        date || "2026-09-08",
        [
          { name: "Taze Günlük Süt 30L", price: Math.round(amount * 0.22) },
          { name: "Köy Yumurtası 120 Adet", price: Math.round(amount * 0.18) },
          { name: "Taze Kaşar & Peynir", price: Math.round(amount * 0.25) },
          { name: "Mevsim Meyveleri", price: Math.round(amount * 0.2) },
          { name: "Taş Fırın Ekmek & Simit", price: amount - Math.round(amount * 0.85) },
        ],
        amount,
        "Market & Gıda"
      ),
  },
  {
    name: "Metro Grossmarket (Kuru Gıda & Bakliyat Fişi)",
    supplier: "Metro Gross Market Bakırköy",
    category: "market_gida" as const,
    getDataUrl: (amount: number, receiptNo: string, date: string) =>
      createReceiptSvgDataUrl(
        "METRO GROSSMARKET",
        receiptNo || "MTR-2026-4412",
        date || "2026-09-12",
        [
          { name: "Baldo Pirinç 25 kg Çuval", price: Math.round(amount * 0.28) },
          { name: "Kırmızı Mercimek 15 kg", price: Math.round(amount * 0.18) },
          { name: "Sızma Zeytinyağı 20 Litre", price: Math.round(amount * 0.32) },
          { name: "Durum Buğdayı Makarna", price: amount - Math.round(amount * 0.78) },
        ],
        amount,
        "Kuru Gıda Stok"
      ),
  },
  {
    name: "Nezih Kırtasiye (Boya, Kağıt & Sanat Faturası)",
    supplier: "Nezih Kırtasiye & Sanat",
    category: "kirtasiye_egitim" as const,
    getDataUrl: (amount: number, receiptNo: string, date: string) =>
      createReceiptSvgDataUrl(
        "NEZİH KIRTASİYE A.Ş.",
        receiptNo || "NZH-2026-1049",
        date || "2026-09-05",
        [
          { name: "Faber Parmak Boyası 60lı", price: Math.round(amount * 0.35) },
          { name: "PlayDoh Oyun Hamuru Set", price: Math.round(amount * 0.25) },
          { name: "Resim Kağıdı & Karton", price: Math.round(amount * 0.22) },
          { name: "Güvenli Çocuk Makasları", price: amount - Math.round(amount * 0.82) },
        ],
        amount,
        "Kırtasiye & Sanat"
      ),
  },
  {
    name: "Enerjisa Elektrik Faturası",
    supplier: "Enerjisa Dağıtım A.Ş.",
    category: "faturalar" as const,
    getDataUrl: (amount: number, receiptNo: string, date: string) =>
      createReceiptSvgDataUrl(
        "ENERJİSA ELEKTRİK A.Ş.",
        receiptNo || "ENR-2026-5519",
        date || "2026-09-22",
        [
          { name: "Aktif Enerji Tüketim Bedeli", price: Math.round(amount * 0.65) },
          { name: "Dağıtım ve İletim Bedeli", price: Math.round(amount * 0.2) },
          { name: "Enerji Fonu & KDV", price: amount - Math.round(amount * 0.85) },
        ],
        amount,
        "Elektrik Faturası"
      ),
  },
  {
    name: "Eczacıbaşı Profesyonel Hijyen & Temizlik Fişi",
    supplier: "Eczacıbaşı Tüketim Ürünleri",
    category: "temizlik_hijyen" as const,
    getDataUrl: (amount: number, receiptNo: string, date: string) =>
      createReceiptSvgDataUrl(
        "ECZACIBAŞI PROFESYONEL",
        receiptNo || "ECZ-2026-3021",
        date || "2026-09-10",
        [
          { name: "Antibakteriyel Sıvı Sabun 30L", price: Math.round(amount * 0.32) },
          { name: "Yüzey Dezenfektanı 20L", price: Math.round(amount * 0.38) },
          { name: "Sens Kağıt Rulo Havlu 24lü", price: amount - Math.round(amount * 0.7) },
        ],
        amount,
        "Temizlik & Hijyen"
      ),
  },
];

const BASE_INITIAL_EXPENSES: KindergartenExpense[] = [
  {
    id: "exp-1",
    title: "Haftalık Taze Sebze, Meyve & Kahvaltılık Market Alışverişi",
    category: "market_gida",
    amount: 6450,
    date: "2026-09-08",
    month: "Eylül 2026",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Migros Toptan Ticaret",
    receiptNo: "MGR-2026-8841",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Tüm sınıfların 1 haftalık taze meyve saati ve sabah kahvaltısı alışverişi.",
    createdAt: "2026-09-08T11:20:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "MİGROS TOPTAN TİCARET",
      "MGR-2026-8841",
      "2026-09-08",
      [
        { name: "Taze Günlük Süt (30 Litre)", price: 1420 },
        { name: "Köy Yumurtası (120 Adet)", price: 1150 },
        { name: "Tam Yağlı Kaşar & Peynir", price: 1620 },
        { name: "Elma, Muz & Mandalina", price: 1380 },
        { name: "Taş Fırın Ekmek & Simit", price: 880 },
      ],
      6450,
      "Market & Gıda"
    ),
  },
  {
    id: "exp-2",
    title: "Kuru Bakliyat, Zeytinyağı, Un & Mutfak Stok Alımı",
    category: "market_gida",
    amount: 8900,
    date: "2026-09-12",
    month: "Eylül 2026",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Metro Gross Market",
    receiptNo: "MTR-2026-4412",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Mutfak yemekhanesi için aylık bakliyat, ayçiçek ve zeytinyağı toptan tedariği.",
    createdAt: "2026-09-12T14:40:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "METRO GROSSMARKET",
      "MTR-2026-4412",
      "2026-09-12",
      [
        { name: "Baldo Pirinç 25 kg", price: 2450 },
        { name: "Kırmızı Mercimek 15 kg", price: 1650 },
        { name: "Sızma Zeytinyağı 20 L", price: 2900 },
        { name: "Makarna & Un 50 kg", price: 1900 },
      ],
      8900,
      "Mutfak Stok"
    ),
  },
  {
    id: "exp-3",
    title: "Yeni Eğitim Yılı Kırtasiye, Parmak Boyası & Hamur Setleri",
    category: "kirtasiye_egitim",
    amount: 14500,
    date: "2026-09-05",
    month: "Eylül 2026",
    paymentMethod: "Banka Havalesi / EFT",
    supplier: "Nezih Kırtasiye & Sanat",
    receiptNo: "NZH-2026-1049",
    recordedBy: "Elif Demir (Zümre Bşk.)",
    notes: "6 sınıfın 1. dönem tüm sanat, boyama ve etkinlik kırtasiye paketleri.",
    createdAt: "2026-09-05T09:15:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "NEZİH KIRTASİYE A.Ş.",
      "NZH-2026-1049",
      "2026-09-05",
      [
        { name: "Faber Parmak Boyası 60lı", price: 4950 },
        { name: "PlayDoh Hamur 60lı Set", price: 3750 },
        { name: "A4 Resim Kağıdı & Karton", price: 3200 },
        { name: "Güvenli Plastik Makaslar", price: 2600 },
      ],
      14500,
      "Kırtasiye & Sanat"
    ),
  },
  {
    id: "exp-4",
    title: "Aylık Endüstriyel Temizlik Malzemesi & Dezenfektan",
    category: "temizlik_hijyen",
    amount: 5750,
    date: "2026-09-10",
    month: "Eylül 2026",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Eczacıbaşı Profesyonel",
    receiptNo: "ECZ-2026-3021",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Sınıflar, mutfak ve tuvaletler için hipoalerjenik çocuk dostu temizlik ürünleri.",
    createdAt: "2026-09-10T16:00:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "ECZACIBAŞI PROFESYONEL",
      "ECZ-2026-3021",
      "2026-09-10",
      [
        { name: "Antibakteriyel Sıvı Sabun 30L", price: 1850 },
        { name: "Zemin & Oyuncak Dezenfektanı", price: 2150 },
        { name: "Rulo Kağıt Havlu 24lü x 4", price: 1750 },
      ],
      5750,
      "Temizlik & Hijyen"
    ),
  },
  {
    id: "exp-5",
    title: "Eylül Ayı Doğalgaz & Merkezi Isınma Faturası",
    category: "faturalar",
    amount: 3850,
    date: "2026-09-20",
    month: "Eylül 2026",
    paymentMethod: "Banka Havalesi / EFT",
    supplier: "Başkentgaz Dağıtım A.Ş.",
    receiptNo: "BKG-2026-9022",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Kreş binası ve yemekhane sıcak su & petek ısıtma doğalgaz bedeli.",
    createdAt: "2026-09-20T10:30:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "BAŞKENTGAZ DAĞITIM A.Ş.",
      "BKG-2026-9022",
      "2026-09-20",
      [
        { name: "Doğalgaz Tüketim Bedeli", price: 3150 },
        { name: "Sistem Kullanım & ÖTV", price: 700 },
      ],
      3850,
      "Doğalgaz Faturası"
    ),
  },
  {
    id: "exp-6",
    title: "Eylül Ayı Elektrik & Aydınlatma Faturası",
    category: "faturalar",
    amount: 4600,
    date: "2026-09-22",
    month: "Eylül 2026",
    paymentMethod: "Banka Havalesi / EFT",
    supplier: "Enerjisa Dağıtım A.Ş.",
    receiptNo: "ENR-2026-5519",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Mutfak buzdolapları, aydınlatma ve havalandırma elektrik sarfiyatı.",
    createdAt: "2026-09-22T11:00:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "ENERJİSA ELEKTRİK A.Ş.",
      "ENR-2026-5519",
      "2026-09-22",
      [
        { name: "Aktif Enerji Tüketim Bedeli", price: 2990 },
        { name: "Dağıtım ve İletim Bedeli", price: 920 },
        { name: "Enerji Fonu & KDV", price: 690 },
      ],
      4600,
      "Elektrik Faturası"
    ),
  },
  {
    id: "exp-7",
    title: "Bahçe Çim Bakımı, Kum Havuzu Yenileme & Çit Onarımı",
    category: "bakim_onanim",
    amount: 6200,
    date: "2026-09-14",
    month: "Eylül 2026",
    paymentMethod: "Banka Havalesi / EFT",
    supplier: "Park & Bahçe Peyzaj San.",
    receiptNo: "PB-2026-0881",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Çocuk oyun bahçesi steril kum yenilemesi ve ahşap koruma boyası.",
    createdAt: "2026-09-14T13:45:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "PARK & PEYZAJ SANAYİ",
      "PB-2026-0881",
      "2026-09-14",
      [
        { name: "Steril Oyun Kumu 500 kg", price: 3400 },
        { name: "Ahşap Çit Cilası ve İşçilik", price: 2800 },
      ],
      6200,
      "Bakım & Onarım"
    ),
  },
  {
    id: "exp-8",
    title: "Kreş Öğrenci Servis Araçları Eylül Ayı Mazot / Yakıt Gideri",
    category: "ulasim_servis",
    amount: 8400,
    date: "2026-09-25",
    month: "Eylül 2026",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Opet Akaryakıt İstasyonu",
    receiptNo: "OPT-2026-6632",
    recordedBy: "Ahmet Usta (Servis Şefi)",
    notes: "2 adet öğrenci servis minibüsünün Eylül ayı filo yakıt dolumu.",
    createdAt: "2026-09-25T17:10:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "OPET AKARYAKIT İSTASYONU",
      "OPT-2026-6632",
      "2026-09-25",
      [
        { name: "Motorin V/Max (210 Litre)", price: 8400 },
      ],
      8400,
      "Servis & Yakıt"
    ),
  },
  {
    id: "exp-9",
    title: "Ekim 1. Hafta Taze Süt, Yoğurt, Meyve ve Et Alışverişi",
    category: "market_gida",
    amount: 7300,
    date: "2026-10-06",
    month: "Ekim 2026",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Migros Toptan Ticaret",
    receiptNo: "MGR-2026-9210",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "Ekim ayı ilk haftası yemek menüsü et, tavuk ve taze yoğurt alışverişi.",
    createdAt: "2026-10-06T11:45:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "MİGROS TOPTAN TİCARET",
      "MGR-2026-9210",
      "2026-10-06",
      [
        { name: "Dana Kıyma & Kuşbaşı 10 kg", price: 3800 },
        { name: "Taze Yoğurt & Ayran 20 kg", price: 1350 },
        { name: "Mevsim Meyvesi & Yeşillik", price: 1250 },
        { name: "Kahvaltılık Kaşar & Tereyağ", price: 900 },
      ],
      7300,
      "Market & Gıda"
    ),
  },
  {
    id: "exp-10",
    title: "Montessori Ahşap Denge Tahtası & Zeka Oyunları",
    category: "kirtasiye_egitim",
    amount: 9800,
    date: "2026-10-10",
    month: "Ekim 2026",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Ahşap Masal Eğitici Oyuncak",
    receiptNo: "AMS-2026-7714",
    recordedBy: "Merve Güneş (Öğretmen)",
    notes: "1-3 yaş sınıfları motor beceri geliştirici ahşap oyuncak takımları.",
    createdAt: "2026-10-10T15:20:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "AHŞAP MASAL EĞİTİCİ OYUNCAK",
      "AMS-2026-7714",
      "2026-10-10",
      [
        { name: "Montessori Denge Tahtası x 4", price: 4200 },
        { name: "Geometrik Blok Takımları", price: 3100 },
        { name: "Ahşap Yapboz & Labirent", price: 2500 },
      ],
      9800,
      "Eğitici Oyuncak"
    ),
  },
];

// Export multi-year INITIAL_EXPENSES, preserving 2026 records and seeding future year samples
export const INITIAL_EXPENSES: KindergartenExpense[] = [
  ...BASE_INITIAL_EXPENSES.map((e) => ({
    ...e,
    academicYear: e.academicYear || getAcademicYearFromDate(e.date),
  })),
  // 2027-2028 Academic Year Sample Expense
  {
    id: "exp-2027-1",
    title: "2027-2028 Dönemi Taze Mutfak & Market Alışverişi",
    category: "market_gida",
    amount: 8200,
    date: "2027-09-08",
    academicYear: "2027-2028",
    month: "Eylül 2027",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Migros Toptan Ticaret",
    receiptNo: "MGR-2027-1102",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "2027-2028 yeni eğitim yılı ilk hafta kahvaltı ve taze meyve tedariği.",
    createdAt: "2027-09-08T10:00:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "MİGROS TOPTAN TİCARET",
      "MGR-2027-1102",
      "2027-09-08",
      [
        { name: "Taze Günlük Süt (35 L)", price: 1950 },
        { name: "Köy Yumurtası (150 Adet)", price: 1650 },
        { name: "Kahvaltılık Kaşar & Peynir", price: 2400 },
        { name: "Mevsim Meyveleri", price: 2200 },
      ],
      8200,
      "Market & Gıda"
    ),
  },
  // 2028-2029 Academic Year Sample Expense
  {
    id: "exp-2028-1",
    title: "2028-2029 Dönemi Kırtasiye, Boya & Atölye Paketleri",
    category: "kirtasiye_egitim",
    amount: 17500,
    date: "2028-09-05",
    academicYear: "2028-2029",
    month: "Eylül 2028",
    paymentMethod: "Banka Havalesi / EFT",
    supplier: "Nezih Kırtasiye & Sanat",
    receiptNo: "NZH-2028-4091",
    recordedBy: "Elif Demir (Zümre Bşk.)",
    notes: "2028-2029 dönemi tüm sınıfların yıllık sanat ve kırtasiye malzemeleri.",
    createdAt: "2028-09-05T09:30:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "NEZİH KIRTASİYE A.Ş.",
      "NZH-2028-4091",
      "2028-09-05",
      [
        { name: "Parmak Boyası ve Guaj Setleri", price: 6200 },
        { name: "Resim Kağıtları & Kartonlar", price: 4800 },
        { name: "Kil ve Seramik Çamuru", price: 3500 },
        { name: "Makas, Yapıştırıcı ve Fırçalar", price: 3000 },
      ],
      17500,
      "Kırtasiye & Sanat"
    ),
  },
  // 2029-2030 Academic Year Sample Expense
  {
    id: "exp-2029-1",
    title: "2029-2030 Dönemi Temizlik, Hijyen & Dezenfektan Alımı",
    category: "temizlik_hijyen",
    amount: 7800,
    date: "2029-09-10",
    academicYear: "2029-2030",
    month: "Eylül 2029",
    paymentMethod: "Kurumsal Kredi Kartı",
    supplier: "Eczacıbaşı Profesyonel",
    receiptNo: "ECZ-2029-5012",
    recordedBy: "Zehra Yılmaz (Müdür)",
    notes: "2029-2030 eğitim yılı başlangıç genel bina hijyen ve temizlik stokları.",
    createdAt: "2029-09-10T14:15:00Z",
    receiptImage: createReceiptSvgDataUrl(
      "ECZACIBAŞI PROFESYONEL",
      "ECZ-2029-5012",
      "2029-09-10",
      [
        { name: "Antibakteriyel Köpük Sabun", price: 2600 },
        { name: "Çocuk Dostu Zemin Dezenfektanı", price: 2900 },
        { name: "Endüstriyel Kağıt Havlu", price: 2300 },
      ],
      7800,
      "Temizlik & Hijyen"
    ),
  },
];

