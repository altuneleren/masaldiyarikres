"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { Student, Teacher } from "@/types";
import {
  Search,
  Plus,
  KeyRound,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Phone,
  Mail,
  ShieldCheck,
  RotateCcw,
  Download,
  Check,
  X,
  Sparkles,
  Users,
  GraduationCap,
  Fingerprint,
  RefreshCw,
} from "lucide-react";

export default function AdminKullanicilarPage() {
  const {
    classes,
    teachers,
    students,
    updateTeacher,
    addTeacher,
    deleteTeacher,
    updateStudent,
    addStudent,
    deleteStudent,
  } = useApp();

  // Active Database Table
  const [activeTable, setActiveTable] = useState<"ogretmenler" | "ogrenciler">("ogretmenler");

  // Global & Row Password Visibility
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<number | "all">("all");

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Modals
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Teacher Form State
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherTitle, setNewTeacherTitle] = useState("");
  const [newTeacherClassId, setNewTeacherClassId] = useState(1);
  const [newTeacherUsername, setNewTeacherUsername] = useState("");
  const [newTeacherPassword, setNewTeacherPassword] = useState("1234");
  const [newTeacherPhone, setNewTeacherPhone] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherAvatar, setNewTeacherAvatar] = useState(
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  );

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentSurname, setNewStudentSurname] = useState("");
  const [newStudentClassId, setNewStudentClassId] = useState(1);
  const [newStudentCode, setNewStudentCode] = useState("");
  const [newStudentUsername, setNewStudentUsername] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("1234");
  const [newStudentGender, setNewStudentGender] = useState<"kız" | "erkek">("kız");
  const [newStudentParentName, setNewStudentParentName] = useState("");
  const [newStudentParentPhone, setNewStudentParentPhone] = useState("");
  const [newStudentParentEmail, setNewStudentParentEmail] = useState("");
  const [newStudentEmergency, setNewStudentEmergency] = useState("");
  const [newStudentBlood, setNewStudentBlood] = useState("A Rh+");
  const [newStudentAllergies, setNewStudentAllergies] = useState("");
  const [newStudentBirthDate, setNewStudentBirthDate] = useState("2023-01-01");
  const [newStudentAvatar, setNewStudentAvatar] = useState(
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&auto=format&fit=crop&q=80"
  );

  // Filtered Teachers
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      if (selectedClassId !== "all" && t.classId !== selectedClassId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${t.name} ${t.username} ${t.phone} ${t.email} ${t.title}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [teachers, selectedClassId, searchQuery]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (selectedClassId !== "all" && s.classId !== selectedClassId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${s.name} ${s.surname} ${s.studentCode} ${s.username} ${s.parentName} ${s.parentPhone} ${s.parentEmail}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [students, selectedClassId, searchQuery]);

  // Quick reset password helper
  const handleQuickResetTeacherPass = (t: Teacher) => {
    updateTeacher(t.id, { password: "1234" });
    showToast(`✓ ${t.name} öğretmeninin şifresi başarıyla "1234" olarak sıfırlandı!`);
  };

  const handleQuickResetStudentPass = (s: Student) => {
    updateStudent(s.id, { password: "1234" });
    showToast(`✓ ${s.name} ${s.surname} öğrencisinin veli şifresi "1234" olarak sıfırlandı!`);
  };

  // Generate random password helper
  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    let res = "";
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };

  // Save Teacher Changes
  const handleSaveTeacherEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    updateTeacher(editingTeacher.id, {
      name: editingTeacher.name.trim(),
      title: editingTeacher.title.trim(),
      classId: Number(editingTeacher.classId),
      username: editingTeacher.username.trim(),
      password: editingTeacher.password.trim(),
      phone: editingTeacher.phone.trim(),
      email: editingTeacher.email.trim(),
      avatar: editingTeacher.avatar.trim(),
    });

    showToast(`✓ ${editingTeacher.name} öğretmeninin bilgileri başarıyla güncellendi!`);
    setEditingTeacher(null);
  };

  // Save Student Changes
  const handleSaveStudentEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStudent(editingStudent.id, {
      name: editingStudent.name.trim(),
      surname: editingStudent.surname.trim(),
      studentCode: editingStudent.studentCode.trim(),
      username: (editingStudent.username || editingStudent.studentCode).trim(),
      password: editingStudent.password.trim(),
      classId: Number(editingStudent.classId),
      parentName: editingStudent.parentName.trim(),
      parentPhone: editingStudent.parentPhone.trim(),
      parentEmail: editingStudent.parentEmail.trim(),
      emergencyContact: editingStudent.emergencyContact.trim(),
      bloodType: editingStudent.bloodType,
      allergies: editingStudent.allergies,
      notes: editingStudent.notes,
    });

    showToast(`✓ ${editingStudent.name} ${editingStudent.surname} öğrencisi ve veli bilgileri güncellendi!`);
    setEditingStudent(null);
  };

  // Submit New Record
  const handleCreateNewRecord = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTable === "ogretmenler") {
      if (!newTeacherName.trim() || !newTeacherUsername.trim()) return;
      addTeacher({
        name: newTeacherName.trim(),
        title: newTeacherTitle.trim() || "Okul Öncesi Eğitmeni",
        classId: Number(newTeacherClassId),
        username: newTeacherUsername.trim().toLowerCase(),
        password: newTeacherPassword.trim() || "1234",
        phone: newTeacherPhone.trim() || "0532 000 00 00",
        email: newTeacherEmail.trim() || `${newTeacherUsername.trim().toLowerCase()}@masaldiyari.k12.tr`,
        avatar: newTeacherAvatar.trim(),
      });
      showToast(`✓ "${newTeacherName}" öğretmeni sisteme başarıyla eklendi!`);
      setNewTeacherName("");
      setNewTeacherUsername("");
    } else {
      if (!newStudentName.trim() || !newStudentSurname.trim()) return;
      const code = newStudentCode.trim() || `MD-${newStudentClassId}0${students.length + 1}`;
      addStudent({
        name: newStudentName.trim(),
        surname: newStudentSurname.trim(),
        classId: Number(newStudentClassId),
        studentCode: code,
        username: newStudentUsername.trim() || code,
        password: newStudentPassword.trim() || "1234",
        gender: newStudentGender,
        birthDate: newStudentBirthDate,
        parentName: newStudentParentName.trim() || "Veli",
        parentPhone: newStudentParentPhone.trim() || "0532 000 00 00",
        parentEmail: newStudentParentEmail.trim() || "veli@example.com",
        emergencyContact: newStudentEmergency.trim() || "0532 000 00 00",
        bloodType: newStudentBlood,
        allergies: newStudentAllergies.trim(),
        avatar: newStudentAvatar.trim(),
      });
      showToast(`✓ "${newStudentName} ${newStudentSurname}" öğrencisi sisteme başarıyla eklendi!`);
      setNewStudentName("");
      setNewStudentSurname("");
      setNewStudentCode("");
    }

    setIsAddingNew(false);
  };

  // Export DB as JSON
  const handleExportDB = () => {
    const data = {
      sistemAdi: "Masal Diyarı Kreş Kullanıcı & Şifre Listesi",
      yedekTarihi: new Date().toLocaleString("tr-TR"),
      ogretmenler: teachers,
      ogrencilerVeVeliler: students,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `masal_diyari_kullanicilar_yedek_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("✓ Kullanıcı hesapları yedek dosyası (JSON) başarıyla indirildi!");
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-slate-900 border-2 border-emerald-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <p className="text-xs font-black text-emerald-400">İşlem Başarılı</p>
              <p className="text-xs font-semibold text-slate-200">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Yönetici Özel Denetim Paneli</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <span>Kullanıcı & Şifre Yönetim Merkezi</span>
            <span className="text-base px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              ● Aktif & Güvenli
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
            Kreşteki tüm öğretmenlerin, öğrencilerin ve velilerin giriş kullanıcı adlarını,
            şifrelerini, iletişim ve profil bilgilerini tek bir ekrandan kolayca yönetin.
            Yapılan değişiklikler ilgili portallara anında yansır.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
          <button
            onClick={handleExportDB}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-2xl text-xs font-bold transition-all shadow-sm"
            title="Tüm kullanıcı ve şifre listesini yedek olarak JSON dosyasında indir"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>Hesap Listesini İndir (Yedek)</span>
          </button>

          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black transition-all shadow-md hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Kullanıcı Ekle</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Teachers */}
        <div
          onClick={() => setActiveTable("ogretmenler")}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
            activeTable === "ogretmenler"
              ? "bg-purple-50/50 border-purple-500 shadow-md"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
              Öğretmen Hesapları
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">{teachers.length} Öğretmen</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              1-6. Sınıf Sorumlu Eğitimcileri
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Total Students & Parents */}
        <div
          onClick={() => setActiveTable("ogrenciler")}
          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
            activeTable === "ogrenciler"
              ? "bg-sky-50/50 border-sky-500 shadow-md"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
              Öğrenci & Veli Hesapları
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">{students.length} Kayıt</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              E-Okul & Veli Portalı Girişleri
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* System Status */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Sistem Durumu
            </span>
            <p className="text-xl font-black text-emerald-600 mt-1">Canlı & Senkronize</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Anlık Otomatik Güncelleme
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table Switcher Tabs & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Table selector buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTable("ogretmenler")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTable === "ogretmenler"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Öğretmenler ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTable("ogrenciler")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTable === "ogrenciler"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Öğrenciler & Veliler ({students.length})</span>
          </button>
        </div>

        {/* Filters & Visibility */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Show all passwords toggle */}
          <button
            type="button"
            onClick={() => setShowAllPasswords(!showAllPasswords)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              showAllPasswords
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
            title="Tablodaki tüm şifreleri açık metin olarak göster veya gizle"
          >
            {showAllPasswords ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-slate-600" />}
            <span>{showAllPasswords ? "Şifreleri Gizle" : "Tüm Şifreleri Göster"}</span>
          </button>

          {/* Class Filter */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
            <span>Sınıf:</span>
            <select
              value={selectedClassId}
              onChange={(e) =>
                setSelectedClassId(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="bg-transparent font-black text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="all">Tüm Sınıflar (1-6)</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id}. Sınıf
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ad, kullanıcı adı, tel ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* TABLE 1: ÖĞRETMENLER TABLOSU */}
      {activeTable === "ogretmenler" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-2">
          {/* Table Header Info */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="text-sm font-black text-white">
                  Öğretmen Kadrosu Giriş & İletişim Bilgileri
                </h3>
                <span className="text-[11px] text-slate-400">
                  {filteredTeachers.length} Eğitmen Listeleniyor
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Giriş kullanıcı adı ve şifreleri doğrudan düzenleyebilirsiniz
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="p-3 w-12 text-center"># No</th>
                  <th className="p-3">Sınıfı</th>
                  <th className="p-3">Öğretmen Adı Soyadı</th>
                  <th className="p-3">Unvan / Görev</th>
                  <th className="p-3 bg-purple-50 text-purple-900 font-black">Kullanıcı Adı</th>
                  <th className="p-3 bg-purple-50 text-purple-900 font-black">Giriş Şifresi</th>
                  <th className="p-3">Telefon</th>
                  <th className="p-3">E-Posta</th>
                  <th className="p-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-400">
                      Kriterlere uygun öğretmen kaydı bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map((t) => {
                    const cls = classes.find((c) => c.id === t.classId);
                    const isPassVisible = showAllPasswords || visiblePasswords[t.id];

                    return (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* ID */}
                        <td className="p-3 text-[11px] text-slate-400 text-center font-bold">
                          #{t.id}
                        </td>

                        {/* Class */}
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 font-bold text-[11px]">
                            <span>{cls?.icon}</span>
                            <span>{t.classId}. Sınıf</span>
                          </span>
                        </td>

                        {/* Teacher Name & Avatar */}
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={t.avatar}
                              alt={t.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <span className="font-black text-slate-900">{t.name}</span>
                          </div>
                        </td>

                        {/* Title */}
                        <td className="p-3 text-slate-600 font-medium max-w-[150px] truncate">
                          {t.title}
                        </td>

                        {/* Username */}
                        <td className="p-3 bg-purple-50/50 font-bold text-purple-900 font-mono">
                          {t.username}
                        </td>

                        {/* Password with Eye & Reset */}
                        <td className="p-3 bg-purple-50/50">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-slate-900 bg-white px-2 py-1 rounded-lg border border-purple-200 text-xs">
                              {isPassVisible ? t.password : "••••••••"}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(t.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-purple-700 hover:bg-purple-100"
                              title={isPassVisible ? "Şifreyi Gizle" : "Şifreyi Göster"}
                            >
                              {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickResetTeacherPass(t)}
                              className="text-[10px] text-purple-600 hover:text-purple-800 underline font-semibold ml-1"
                              title="Şifreyi hızlıca 1234 yap"
                            >
                              Sıfırla
                            </button>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="p-3 font-mono text-slate-700 font-medium">
                          {t.phone}
                        </td>

                        {/* Email */}
                        <td className="p-3 text-slate-500 font-medium">
                          {t.email}
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingTeacher(t)}
                              className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-bold transition-colors"
                              title="Kullanıcı & Şifre Bilgilerini Düzenle"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${t.name}" öğretmen kaydını sistemden silmek istediğinize emin misiniz?`)) {
                                  deleteTeacher(t.id);
                                  showToast(`✓ "${t.name}" öğretmeni sistemden silindi.`);
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                              title="Kaydı Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TABLE 2: ÖĞRENCİLER VE VELİLER TABLOSU */}
      {activeTable === "ogrenciler" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-2">
          {/* Table Header Info */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-sky-400" />
              <div>
                <h3 className="text-sm font-black text-white">
                  Öğrenci & Veli Giriş ve İletişim Bilgileri
                </h3>
                <span className="text-[11px] text-slate-400">
                  {filteredStudents.length} Kayıt Listeleniyor
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Veli portalı ve E-Okul şifreleri tek panelde
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="p-3 w-10 text-center">Öğrenci No</th>
                  <th className="p-3">Sınıfı</th>
                  <th className="p-3">Öğrenci Adı Soyadı</th>
                  <th className="p-3 bg-sky-50 text-sky-900 font-black">E-Okul Kullanıcı Adı</th>
                  <th className="p-3 bg-sky-50 text-sky-900 font-black">Veli Giriş Şifresi</th>
                  <th className="p-3">Veli Adı Soyadı</th>
                  <th className="p-3 bg-emerald-50 text-emerald-900 font-black">Veli Cep Telefonu</th>
                  <th className="p-3">Acil Durum İletişim</th>
                  <th className="p-3">Sağlık & Alerji</th>
                  <th className="p-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-400">
                      Kriterlere uygun öğrenci kaydı bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => {
                    const cls = classes.find((c) => c.id === s.classId);
                    const isPassVisible = showAllPasswords || visiblePasswords[s.id];

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Student Code */}
                        <td className="p-3 font-mono font-black text-amber-700 text-center">
                          {s.studentCode}
                        </td>

                        {/* Class */}
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-100 text-sky-800 font-bold text-[11px]">
                            <span>{cls?.icon}</span>
                            <span>{s.classId}. Sınıf</span>
                          </span>
                        </td>

                        {/* Student Name & Avatar */}
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={s.avatar}
                              alt={s.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="font-black text-slate-900 block">
                                {s.name} {s.surname}
                              </span>
                              <span className="text-[10px] text-slate-400 capitalize">
                                {s.gender} • D: {s.birthDate}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Username */}
                        <td className="p-3 bg-sky-50/50 font-mono font-bold text-sky-900">
                          {s.username || s.studentCode}
                        </td>

                        {/* Password with Eye & Reset */}
                        <td className="p-3 bg-sky-50/50">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-slate-900 bg-white px-2 py-1 rounded-lg border border-sky-200 text-xs">
                              {isPassVisible ? s.password || "1234" : "••••••••"}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(s.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-sky-700 hover:bg-sky-100"
                              title={isPassVisible ? "Şifreyi Gizle" : "Şifreyi Göster"}
                            >
                              {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickResetStudentPass(s)}
                              className="text-[10px] text-sky-600 hover:text-sky-800 underline font-semibold ml-1"
                              title="Şifreyi hızlıca 1234 yap"
                            >
                              Sıfırla
                            </button>
                          </div>
                        </td>

                        {/* Parent Name */}
                        <td className="p-3 font-bold text-slate-800">
                          {s.parentName}
                        </td>

                        {/* Parent Phone */}
                        <td className="p-3 bg-emerald-50/50">
                          <a
                            href={`tel:${s.parentPhone}`}
                            className="inline-flex items-center gap-1 font-mono font-bold text-emerald-800 hover:underline"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{s.parentPhone}</span>
                          </a>
                        </td>

                        {/* Emergency Phone */}
                        <td className="p-3 font-mono text-slate-500">
                          {s.emergencyContact}
                        </td>

                        {/* Blood & Allergies */}
                        <td className="p-3">
                          <span className="font-bold text-slate-900 mr-1.5">{s.bloodType}</span>
                          {s.allergies ? (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-medium">
                              {s.allergies}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Alerji yok</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingStudent(s)}
                              className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold transition-colors"
                              title="Öğrenci & Veli Bilgilerini Düzenle"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${s.name} ${s.surname}" öğrencisini sistemden silmek istediğinize emin misiniz?`)) {
                                  deleteStudent(s.id);
                                  showToast(`✓ "${s.name} ${s.surname}" sistemden silindi.`);
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                              title="Kaydı Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: EDIT TEACHER */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-purple-200 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                  Öğretmen Bilgilerini Güncelle
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Öğretmen Bilgilerini & Şifresini Düzenle
                </h3>
              </div>
              <button
                onClick={() => setEditingTeacher(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacherEdit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Öğretmen Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.name}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Sorumlu Sınıf *</label>
                  <select
                    value={editingTeacher.classId}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, classId: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.id}. Sınıf - {c.shortName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Unvan / Uzmanlık</label>
                <input
                  type="text"
                  value={editingTeacher.title}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Username & Password */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                <div className="flex items-center gap-1.5 text-purple-900 font-bold">
                  <KeyRound className="w-4 h-4 text-purple-600" />
                  <span>Öğretmen Giriş Kimlik Bilgileri</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Kullanıcı Adı (Giriş) *</label>
                    <input
                      type="text"
                      required
                      value={editingTeacher.username}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, username: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-purple-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-700 font-bold">Öğretmen Şifresi *</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingTeacher({ ...editingTeacher, password: generateRandomPassword() })
                        }
                        className="text-[10px] text-purple-600 hover:underline font-bold"
                      >
                        Rastgele Üret
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={editingTeacher.password}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, password: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Telefon Numarası</label>
                  <input
                    type="text"
                    value={editingTeacher.phone}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">E-posta Adresi</label>
                  <input
                    type="email"
                    value={editingTeacher.email}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Profil Fotoğrafı URL</label>
                <input
                  type="text"
                  value={editingTeacher.avatar}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-md hover:scale-105 transition-all"
                >
                  Bilgileri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT STUDENT & PARENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border-2 border-sky-200 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                  Öğrenci & Veli Hesabını Güncelle
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Öğrenci, Şifre & Veli İletişim Bilgilerini Düzenle
                </h3>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentEdit} className="space-y-4 text-xs font-medium">
              {/* Student Basic */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Öğrenci Adı *</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.surname}
                    onChange={(e) => setEditingStudent({ ...editingStudent, surname: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Sınıfı *</label>
                  <select
                    value={editingStudent.classId}
                    onChange={(e) => setEditingStudent({ ...editingStudent, classId: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-sky-500"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.id}. Sınıf
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Login Credentials Box */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
                <div className="flex items-center gap-1.5 text-sky-900 font-bold">
                  <KeyRound className="w-4 h-4 text-sky-600" />
                  <span>E-Okul & Veli Giriş Bilgileri</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Öğrenci No</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.studentCode}
                      onChange={(e) => setEditingStudent({ ...editingStudent, studentCode: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-amber-700 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Kullanıcı Adı</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.username || editingStudent.studentCode}
                      onChange={(e) => setEditingStudent({ ...editingStudent, username: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-sky-900 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-700 font-bold">Veli Şifresi *</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingStudent({ ...editingStudent, password: generateRandomPassword() })
                        }
                        className="text-[10px] text-sky-600 hover:underline font-bold"
                      >
                        Rastgele
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={editingStudent.password}
                      onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Veli İletişim & Sağlık Bilgileri</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Veli Adı Soyadı *</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.parentName}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Veli Cep Telefonu *</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.parentPhone}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                      placeholder="0532 111 22 33"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Veli E-posta</label>
                    <input
                      type="email"
                      value={editingStudent.parentEmail}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Acil Durum İletişim</label>
                    <input
                      type="text"
                      value={editingStudent.emergencyContact}
                      onChange={(e) => setEditingStudent({ ...editingStudent, emergencyContact: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Kan Grubu</label>
                    <select
                      value={editingStudent.bloodType}
                      onChange={(e) => setEditingStudent({ ...editingStudent, bloodType: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                    >
                      <option value="A Rh+">A Rh+</option>
                      <option value="A Rh-">A Rh-</option>
                      <option value="B Rh+">B Rh+</option>
                      <option value="B Rh-">B Rh-</option>
                      <option value="0 Rh+">0 Rh+</option>
                      <option value="0 Rh-">0 Rh-</option>
                      <option value="AB Rh+">AB Rh+</option>
                      <option value="AB Rh-">AB Rh-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Alerji / Özel Not</label>
                    <input
                      type="text"
                      value={editingStudent.allergies || ""}
                      onChange={(e) => setEditingStudent({ ...editingStudent, allergies: e.target.value })}
                      placeholder="Yok veya Çilek alerjisi"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black shadow-md hover:scale-105 transition-all"
                >
                  Bilgileri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW RECORD */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-purple-200 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                  Yeni Kayıt Oluştur
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Yeni {activeTable === "ogretmenler" ? "Öğretmen" : "Öğrenci & Veli"} Hesabı Ekle
                </h3>
              </div>
              <button
                onClick={() => setIsAddingNew(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewRecord} className="space-y-4 text-xs font-medium">
              {activeTable === "ogretmenler" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Adı Soyadı *</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Ayşe Kaya"
                        value={newTeacherName}
                        onChange={(e) => setNewTeacherName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Sınıfı *</label>
                      <select
                        value={newTeacherClassId}
                        onChange={(e) => setNewTeacherClassId(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      >
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.id}. Sınıf - {c.shortName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Unvan</label>
                    <input
                      type="text"
                      placeholder="Okul Öncesi Eğitmeni"
                      value={newTeacherTitle}
                      onChange={(e) => setNewTeacherTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kullanıcı Adı (Giriş) *</label>
                      <input
                        type="text"
                        required
                        placeholder="örn: ogretmen7"
                        value={newTeacherUsername}
                        onChange={(e) => setNewTeacherUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Giriş Şifresi *</label>
                      <input
                        type="text"
                        required
                        value={newTeacherPassword}
                        onChange={(e) => setNewTeacherPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Telefon</label>
                      <input
                        type="text"
                        placeholder="0532 000 00 00"
                        value={newTeacherPhone}
                        onChange={(e) => setNewTeacherPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">E-posta</label>
                      <input
                        type="email"
                        placeholder="ogretmen@masaldiyari.k12.tr"
                        value={newTeacherEmail}
                        onChange={(e) => setNewTeacherEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Öğrenci Adı *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ahmet"
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Soyadı *</label>
                      <input
                        type="text"
                        required
                        placeholder="Yılmaz"
                        value={newStudentSurname}
                        onChange={(e) => setNewStudentSurname(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Sınıfı *</label>
                      <select
                        value={newStudentClassId}
                        onChange={(e) => setNewStudentClassId(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      >
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.id}. Sınıf
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Öğrenci No</label>
                      <input
                        type="text"
                        placeholder={`MD-${newStudentClassId}0${students.length + 1}`}
                        value={newStudentCode}
                        onChange={(e) => setNewStudentCode(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-amber-700"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Giriş K.Adı</label>
                      <input
                        type="text"
                        placeholder="Örn: MD-..."
                        value={newStudentUsername}
                        onChange={(e) => setNewStudentUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-sky-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Veli Şifresi</label>
                      <input
                        type="text"
                        required
                        value={newStudentPassword}
                        onChange={(e) => setNewStudentPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Veli Adı Soyadı *</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Mehmet Yılmaz"
                        value={newStudentParentName}
                        onChange={(e) => setNewStudentParentName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Veli Cep Telefonu *</label>
                      <input
                        type="text"
                        required
                        placeholder="0532 000 00 00"
                        value={newStudentParentPhone}
                        onChange={(e) => setNewStudentParentPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-emerald-800"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-md hover:scale-105 transition-all"
                >
                  Sisteme Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
