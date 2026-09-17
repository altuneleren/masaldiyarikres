"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { MealStatus, MoodType } from "@/types";
import {
  GraduationCap,
  Calendar,
  Smile,
  LogOut,
  Heart,
  Phone,
  Plus,
  Trash2,
  Clock,
  X,
} from "lucide-react";

export default function OgretmenDashboard() {
  const router = useRouter();
  const {
    loggedInTeacher,
    logoutTeacher,
    classes,
    students,
    dailyReports,
    saveDailyReport,
    activities,
    addActivity,
    deleteActivity,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"karne" | "etkinlikler" | "saglik">("karne");

  // Daily Report Modal / Editor State
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [reportBreakfast, setReportBreakfast] = useState<MealStatus>("hepsini_yedi");
  const [reportLunch, setReportLunch] = useState<MealStatus>("hepsini_yedi");
  const [reportSnack, setReportSnack] = useState<MealStatus>("hepsini_yedi");
  const [reportMealNotes, setReportMealNotes] = useState("");
  const [reportSlept, setReportSlept] = useState<boolean>(true);
  const [reportSleepMinutes, setReportSleepMinutes] = useState<number>(90);
  const [reportSleepNotes, setReportSleepNotes] = useState("");
  const [reportMood, setReportMood] = useState<MoodType>("cok_mutlu");
  const [reportTeacherNote, setReportTeacherNote] = useState("");
  const [reportDate, setReportDate] = useState("2026-09-16");

  // New Activity Form State
  const [newActTitle, setNewActTitle] = useState("");
  const [newActTime, setNewActTime] = useState("");
  const [newActCategory, setNewActCategory] = useState<
    "Sanat" | "Müzik" | "Oyun" | "Fen & Doğa" | "Dil" | "Bilişsel & Kodlama" | "Beden & Jimnastik"
  >("Oyun");
  const [newActDescription, setNewActDescription] = useState("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Redirect if not logged in
  if (!loggedInTeacher) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border-2 border-purple-200 shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Öğretmen Girişi Gerekli</h2>
          <p className="text-xs text-slate-600 font-medium">
            Öğretmen portalına erişmek için lütfen kullanıcı adı ve şifrenizle giriş yapınız.
          </p>
          <div className="pt-2">
            <Link
              href="/ogretmen/login"
              className="inline-block w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-md hover:scale-105 transition-all text-sm"
            >
              Öğretmen Giriş Sayfasına Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Teacher's Assigned Class
  const myClass = classes.find((c) => c.id === loggedInTeacher.classId);

  // STRICT ISOLATION: Filter only students belonging to this teacher's class
  const myStudents = students.filter((s) => s.classId === loggedInTeacher.classId);

  // STRICT ISOLATION: Filter only activities belonging to this teacher's class
  const myActivities = activities.filter((a) => a.classId === loggedInTeacher.classId);

  // Handle open report modal for a student
  const handleOpenReportModal = (studentId: string) => {
    setSelectedStudentId(studentId);
    const existing = dailyReports.find(
      (r) => r.studentId === studentId && r.date === reportDate
    ) || dailyReports.find((r) => r.studentId === studentId);

    if (existing) {
      setReportBreakfast(existing.meals.breakfast);
      setReportLunch(existing.meals.lunch);
      setReportSnack(existing.meals.snack);
      setReportMealNotes(existing.meals.notes || "");
      setReportSlept(existing.sleep.slept);
      setReportSleepMinutes(existing.sleep.durationMinutes);
      setReportSleepNotes(existing.sleep.notes || "");
      setReportMood(existing.mood);
      setReportTeacherNote(existing.teacherNote || "");
    } else {
      // Defaults
      setReportBreakfast("hepsini_yedi");
      setReportLunch("hepsini_yedi");
      setReportSnack("hepsini_yedi");
      setReportMealNotes("");
      setReportSlept(true);
      setReportSleepMinutes(90);
      setReportSleepNotes("");
      setReportMood("cok_mutlu");
      setReportTeacherNote("Bugün çok neşeli ve arkadaş canlısıydı.");
    }
  };

  // Save report
  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    saveDailyReport({
      studentId: selectedStudentId,
      date: reportDate,
      meals: {
        breakfast: reportBreakfast,
        lunch: reportLunch,
        snack: reportSnack,
        notes: reportMealNotes,
      },
      sleep: {
        slept: reportSlept,
        durationMinutes: reportSlept ? Number(reportSleepMinutes) : 0,
        notes: reportSleepNotes,
      },
      mood: reportMood,
      activitiesAttended: ["Duyusal Oyun", "Şarkı & Ritim Saati"],
      teacherNote: reportTeacherNote,
    });

    const student = myStudents.find((s) => s.id === selectedStudentId);
    showToast(`✓ ${student?.name} ${student?.surname} için günlük karne başarıyla kaydedildi!`);
    setSelectedStudentId(null);
  };

  // Add activity
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    addActivity({
      classId: loggedInTeacher.classId,
      title: newActTitle.trim(),
      time: newActTime.trim() || "10:00 - 10:45",
      date: "Bugün",
      category: newActCategory,
      description: newActDescription.trim() || "Öğretmen rehberliğinde sınıf etkinliği.",
      instructor: loggedInTeacher.name,
    });

    setNewActTitle("");
    setNewActTime("");
    setNewActDescription("");
    showToast(`✓ "${newActTitle}" etkinliği sınıf programına eklendi!`);
  };

  const handleLogout = () => {
    logoutTeacher();
    router.push("/ogretmen/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-slate-900 border-2 border-purple-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <p className="text-xs font-black text-purple-400">Öğretmen Bildirimi</p>
              <p className="text-xs font-semibold text-slate-200">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-purple-100 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
                Öğretmen Portalı
              </span>
              <h1 className="text-sm font-black text-slate-900 leading-none">
                Masal Diyarı Kreş
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-purple-50 rounded-2xl border border-purple-200">
              <img
                src={loggedInTeacher.avatar}
                alt={loggedInTeacher.name}
                className="w-7 h-7 rounded-full object-cover border border-purple-300"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {loggedInTeacher.name}
                </p>
                <p className="text-[10px] text-purple-700 font-semibold">
                  {loggedInTeacher.classId}. Sınıf Öğretmeni
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Class Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={loggedInTeacher.avatar}
              alt={loggedInTeacher.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-white/30 shadow-xl"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
                <span>{myClass?.icon}</span>
                <span>{myClass?.name}</span>
              </div>
              <h2 className="text-2xl font-black">{loggedInTeacher.name}</h2>
              <p className="text-xs text-purple-100 font-medium">
                {loggedInTeacher.title} • {myClass?.room}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <span className="text-[10px] text-purple-200 font-bold block uppercase">
                Sınıf Mevcudu
              </span>
              <span className="text-lg font-black">{myStudents.length} Öğrenci</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <span className="text-[10px] text-purple-200 font-bold block uppercase">
                Yaş Grubu
              </span>
              <span className="text-sm font-black">{myClass?.ageGroup}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("karne")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === "karne"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Öğrencilerim & Günlük Karne ({myStudents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("etkinlikler")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === "etkinlikler"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Sınıf Etkinlikleri ({myActivities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("saglik")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === "saglik"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Sağlık, Alerji & Veli İletişim</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* TAB 1: DAILY REPORT & STUDENTS */}
        {activeTab === "karne" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Karne Düzenleme Tarihi:</span>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                💡 Öğretmen olarak sadece <strong>{myClass?.shortName}</strong> sınıfınızdaki öğrencileri görebilirsiniz.
              </p>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myStudents.map((student) => {
                const report = dailyReports.find(
                  (r) => r.studentId === student.id && r.date === reportDate
                ) || dailyReports.find((r) => r.studentId === student.id);

                return (
                  <div
                    key={student.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between space-y-4"
                  >
                    {/* Student Head */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-900">
                              {student.name} {student.surname}
                            </h3>
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                              {student.studentCode}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            Veli: {student.parentName} ({student.parentPhone})
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenReportModal(student.id)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black shadow-sm hover:scale-105 transition-all"
                      >
                        Karne Düzenle
                      </button>
                    </div>

                    {/* Report Preview */}
                    {report ? (
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2.5 text-xs">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-white rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 font-bold block">
                              Kahvaltı
                            </span>
                            <span className="font-bold text-slate-800 capitalize">
                              {report.meals.breakfast.replace("_", " ")}
                            </span>
                          </div>
                          <div className="p-2 bg-white rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 font-bold block">
                              Öğle Yemeği
                            </span>
                            <span className="font-bold text-slate-800 capitalize">
                              {report.meals.lunch.replace("_", " ")}
                            </span>
                          </div>
                          <div className="p-2 bg-white rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 font-bold block">
                              Uyku Süresi
                            </span>
                            <span className="font-bold text-slate-800">
                              {report.sleep.slept ? `${report.sleep.durationMinutes} dk` : "Uyumadı"}
                            </span>
                          </div>
                        </div>

                        {report.teacherNote && (
                          <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-slate-700">
                            <strong className="text-amber-800 block text-[10px] uppercase font-bold">
                              Öğretmen Notu:
                            </strong>
                            <p className="italic text-xs mt-0.5">{report.teacherNote}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-amber-50 text-amber-800 text-xs text-center border border-amber-200">
                        Bu öğrenci için bu tarihte henüz karne girişi yapılmadı.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CLASS ACTIVITIES */}
        {activeTab === "etkinlikler" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activities List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {myClass?.shortName} Sınıf Etkinlikleri
              </h3>

              {myActivities.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500 text-xs">
                  Henüz bu sınıfa özel etkinlik eklenmedi. Yan taraftaki formdan hemen yeni bir etkinlik ekleyebilirsiniz.
                </div>
              ) : (
                myActivities.map((act) => (
                  <div
                    key={act.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-700">
                          {act.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {act.time}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900">{act.title}</h4>
                      <p className="text-xs text-slate-600 font-medium">{act.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        deleteActivity(act.id);
                        showToast(`✓ "${act.title}" etkinliği silindi.`);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Etkinliği Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Activity Form */}
            <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-4 h-fit">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  Yeni Etkinlik Ekle
                </h3>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-3.5 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Etkinlik Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="örn: Duyusal Su ve Çiçek Deneyi"
                    value={newActTitle}
                    onChange={(e) => setNewActTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Saat Aralığı
                    </label>
                    <input
                      type="text"
                      placeholder="10:00 - 11:00"
                      value={newActTime}
                      onChange={(e) => setNewActTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Kategori
                    </label>
                    <select
                      value={newActCategory}
                      onChange={(e) =>
                        setNewActCategory(
                          e.target.value as
                            | "Sanat"
                            | "Müzik"
                            | "Oyun"
                            | "Fen & Doğa"
                            | "Dil"
                            | "Bilişsel & Kodlama"
                            | "Beden & Jimnastik"
                        )
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Oyun">Oyun</option>
                      <option value="Sanat">Sanat</option>
                      <option value="Müzik">Müzik</option>
                      <option value="Fen & Doğa">Fen & Doğa</option>
                      <option value="Dil">Dil</option>
                      <option value="Bilişsel & Kodlama">Kodlama</option>
                      <option value="Beden & Jimnastik">Jimnastik</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Etkinlik Açıklaması
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Etkinlik kazanımları ve çocukların ilgisini çeken detaylar..."
                    value={newActDescription}
                    onChange={(e) => setNewActDescription(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black shadow-md hover:scale-[1.02] transition-all"
                >
                  Sınıf Programına Kaydet
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: HEALTH & PARENT CONTACTS */}
        {activeTab === "saglik" && (
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {myClass?.shortName} - Öğrenci Sağlık Kartları & İletişim Rehberi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        {student.name} {student.surname}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold">
                        {student.studentCode} • Doğum: {student.birthDate}
                      </p>
                    </div>
                  </div>

                  {/* Health details */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                      <span className="text-[10px] text-rose-700 font-bold block uppercase">
                        Kan Grubu
                      </span>
                      <span className="font-black text-rose-900">{student.bloodType}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                      <span className="text-[10px] text-amber-700 font-bold block uppercase">
                        Alerji Durumu
                      </span>
                      <span className="font-bold text-amber-900">
                        {student.allergies || "Yok (Sağlıklı)"}
                      </span>
                    </div>
                  </div>

                  {student.notes && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <strong className="text-slate-800 block text-[10px] uppercase font-bold">
                        Öğretmen Özel Notu:
                      </strong>
                      <p className="text-slate-600 font-medium mt-0.5">{student.notes}</p>
                    </div>
                  )}

                  {/* Parent Contacts */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">
                        Veli: <strong>{student.parentName}</strong>
                      </span>
                      <a
                        href={`tel:${student.parentPhone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold hover:bg-emerald-100 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{student.parentPhone}</span>
                      </a>
                    </div>

                    {student.emergencyContact && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">Acil Durum:</span>
                        <span className="font-semibold text-rose-700">
                          {student.emergencyContact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Daily Report Editor Modal */}
      {selectedStudentId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-purple-200 space-y-4 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                  Günlük Karne Girişi
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {myStudents.find((s) => s.id === selectedStudentId)?.name}{" "}
                  {myStudents.find((s) => s.id === selectedStudentId)?.surname}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudentId(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReport} className="space-y-4 text-xs font-medium">
              {/* Meals */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                  Yemek Durumları
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Kahvaltı</span>
                    <select
                      value={reportBreakfast}
                      onChange={(e) => setReportBreakfast(e.target.value as MealStatus)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    >
                      <option value="hepsini_yedi">Hepsini Yedi</option>
                      <option value="yarisini_yedi">Yarısını Yedi</option>
                      <option value="az_yedi">Az Yedi</option>
                      <option value="yemedi">Yemedi</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Öğle Yemeği</span>
                    <select
                      value={reportLunch}
                      onChange={(e) => setReportLunch(e.target.value as MealStatus)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    >
                      <option value="hepsini_yedi">Hepsini Yedi</option>
                      <option value="yarisini_yedi">Yarısını Yedi</option>
                      <option value="az_yedi">Az Yedi</option>
                      <option value="yemedi">Yemedi</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">İkindi Ara Öğün</span>
                    <select
                      value={reportSnack}
                      onChange={(e) => setReportSnack(e.target.value as MealStatus)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    >
                      <option value="hepsini_yedi">Hepsini Yedi</option>
                      <option value="yarisini_yedi">Yarısını Yedi</option>
                      <option value="az_yedi">Az Yedi</option>
                      <option value="yemedi">Yemedi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sleep */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                  Öğle Uykusu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                      type="checkbox"
                      id="sleptCheck"
                      checked={reportSlept}
                      onChange={(e) => setReportSlept(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <label htmlFor="sleptCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Uyudu
                    </label>
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Süre (dk)"
                      disabled={!reportSlept}
                      value={reportSleepMinutes}
                      onChange={(e) => setReportSleepMinutes(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-slate-800 font-bold uppercase tracking-wider text-[11px] mb-1">
                  Günün Duygu Durumu
                </label>
                <select
                  value={reportMood}
                  onChange={(e) => setReportMood(e.target.value as MoodType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="cok_mutlu">😄 Çok Mutlu & Enerjik</option>
                  <option value="neseli">😊 Neşeli & Uyumlu</option>
                  <option value="sakin">🙂 Sakin & Dingin</option>
                  <option value="biraz_yorgun">🥱 Biraz Yorgun</option>
                  <option value="huzursuz">🥺 Huzursuz / Anne-Baba Özlemi</option>
                </select>
              </div>

              {/* Teacher Note */}
              <div>
                <label className="block text-slate-800 font-bold uppercase tracking-wider text-[11px] mb-1">
                  Veliye Gün Sonu Notu
                </label>
                <textarea
                  rows={3}
                  value={reportTeacherNote}
                  onChange={(e) => setReportTeacherNote(e.target.value)}
                  placeholder="Çocuğumuzun gün içindeki güzel anları, arkadaşlarıyla uyumu..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedStudentId(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-md hover:scale-105 transition-all"
                >
                  Karneyi Sisteme Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
