"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { MealStatus, MoodType, TeacherSalary } from "@/types";
import {
  GraduationCap,
  Calendar,
  Smile,
  LogOut,
  Heart,
  Plus,
  Trash2,
  Clock,
  X,
  MessageCircle,
  Send,
  CheckCheck,
  ShieldCheck,
  Receipt,
  CheckCircle2,
  Building2,
  Printer,
  Briefcase,
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
    messages,
    sendMessage,
    markMessagesAsRead,
    getMessagesForStudent,
    getUnreadCountForStudent,
    getUnreadCountForClassTeacher,
    getSalariesForTeacher,
    selectedAcademicYear,
    availableAcademicYears,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"karne" | "etkinlikler" | "saglik" | "mesajlar" | "maas">("karne");
  const [teacherYear, setTeacherYear] = useState<string>(selectedAcademicYear || "2026-2027");

  useEffect(() => {
    if (selectedAcademicYear) {
      setTeacherYear(selectedAcademicYear);
    }
  }, [selectedAcademicYear]);

  // Salary Slip Modal State
  const [viewingSalarySlip, setViewingSalarySlip] = useState<TeacherSalary | null>(null);

  // Chat State
  const [selectedChatStudentId, setSelectedChatStudentId] = useState<string | null>(null);
  const [chatInputText, setChatInputText] = useState("");

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

  // Teacher's Assigned Class
  const myClass = loggedInTeacher ? classes.find((c) => c.id === loggedInTeacher.classId) : undefined;

  // STRICT ISOLATION: Filter only students belonging to this teacher's class
  const myStudents = useMemo(() => {
    return loggedInTeacher ? students.filter((s) => s.classId === loggedInTeacher.classId) : [];
  }, [loggedInTeacher, students]);

  // STRICT ISOLATION: Filter only activities belonging to this teacher's class
  const myActivities = useMemo(() => {
    return loggedInTeacher ? activities.filter((a) => a.classId === loggedInTeacher.classId) : [];
  }, [loggedInTeacher, activities]);

  // Chat: Total unread messages for this teacher's class
  const unreadTotalForClass = loggedInTeacher ? getUnreadCountForClassTeacher(loggedInTeacher.classId) : 0;

  // Selected Chat Student
  const selectedChatStudent = myStudents.find((s) => s.id === selectedChatStudentId) || myStudents[0] || null;

  // Auto select initial chat student on mount
  useEffect(() => {
    if (!selectedChatStudentId && myStudents.length > 0) {
      setSelectedChatStudentId(myStudents[0].id);
    }
  }, [myStudents, selectedChatStudentId]);

  // Auto mark messages as read when viewing chat tab
  useEffect(() => {
    if (activeTab === "mesajlar" && selectedChatStudent) {
      markMessagesAsRead(selectedChatStudent.id, "teacher");
    }
  }, [activeTab, selectedChatStudent, messages, markMessagesAsRead]);

  // Current chat messages for selected student
  const currentChatMessages = selectedChatStudent ? getMessagesForStudent(selectedChatStudent.id) : [];

  // STRICT ISOLATION: Teacher's own salaries for chosen academic year
  const mySalaries = useMemo(() => {
    return loggedInTeacher ? getSalariesForTeacher(loggedInTeacher.id, teacherYear) : [];
  }, [loggedInTeacher, getSalariesForTeacher, teacherYear]);

  const mySalarySummary = useMemo(() => {
    const totalContract = mySalaries.reduce((acc, s) => acc + s.netTotal, 0);
    const paidList = mySalaries.filter((s) => s.status === "odendi");
    const totalPaid = paidList.reduce((acc, s) => acc + s.netTotal, 0);
    const unpaidList = mySalaries.filter((s) => s.status === "odenmedi");
    const totalUnpaid = unpaidList.reduce((acc, s) => acc + s.netTotal, 0);

    return {
      totalContract,
      totalPaid,
      totalUnpaid,
      paidCount: paidList.length,
      unpaidCount: unpaidList.length,
    };
  }, [mySalaries]);

  // Send message handler
  const handleSendTeacherMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInputText.trim() || !selectedChatStudent || !loggedInTeacher) return;

    sendMessage({
      studentId: selectedChatStudent.id,
      classId: loggedInTeacher.classId,
      senderType: "teacher",
      senderName: `${loggedInTeacher.name} (Öğretmen)`,
      senderAvatar: loggedInTeacher.avatar,
      text: chatInputText.trim(),
    });

    setChatInputText("");
    markMessagesAsRead(selectedChatStudent.id, "teacher");
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
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none whitespace-nowrap">
          <button
            onClick={() => setActiveTab("karne")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer ${
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer ${
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer ${
              activeTab === "saglik"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Sağlık, Alerji & Veli İletişim</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("mesajlar");
              if (selectedChatStudent) {
                markMessagesAsRead(selectedChatStudent.id, "teacher");
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all relative shrink-0 cursor-pointer ${
              activeTab === "mesajlar"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Veli Sohbetleri (Chat)</span>
            {unreadTotalForClass > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                {unreadTotalForClass}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("maas")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 ${
              activeTab === "maas"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Maaş & Bordro Bilgilerim</span>
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
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="text-slate-600 font-medium truncate">
                        Veli: <strong>{student.parentName}</strong>
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedChatStudentId(student.id);
                            setActiveTab("mesajlar");
                            markMessagesAsRead(student.id, "teacher");
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-bold hover:bg-purple-100 transition-colors text-[11px]"
                          title="Telefon gerekmeden panelden mesajlaşın"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                          <span>Mesajlaş</span>
                        </button>
                      </div>
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

        {/* TAB 4: VELİ SOHBETLERİ & MESAJLAŞMA */}
        {activeTab === "mesajlar" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px] max-h-[85vh] md:min-h-[600px] md:max-h-[750px] animate-in fade-in">
            {/* Left Column: Student & Parent List */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50/50">
              <div className="p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span>Sınıf Veli Sohbetleri</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
                    {myStudents.length} Veli
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                  🔒 Telefon numarası gerekmeden velilerinizle doğrudan panelden yazışabilirsiniz.
                </p>
              </div>

              <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
                {myStudents.map((stu) => {
                  const isSelected = selectedChatStudent?.id === stu.id;
                  const stuMessages = getMessagesForStudent(stu.id);
                  const lastMsg = stuMessages[stuMessages.length - 1];
                  const unreadCount = getUnreadCountForStudent(stu.id, "teacher");

                  return (
                    <button
                      key={stu.id}
                      onClick={() => {
                        setSelectedChatStudentId(stu.id);
                        markMessagesAsRead(stu.id, "teacher");
                      }}
                      className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                        isSelected
                          ? "bg-purple-50/80 border-l-4 border-purple-600"
                          : "hover:bg-slate-100/70"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-xs"
                        />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-slate-900 truncate">
                            {stu.name} {stu.surname}
                          </h4>
                          {lastMsg && (
                            <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-1">
                              {lastMsg.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-purple-700 truncate mt-0.5">
                          {stu.parentName}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[11px] text-slate-500 truncate max-w-[170px]">
                            {lastMsg ? lastMsg.text : "Henüz mesaj yok"}
                          </p>
                          {unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Chat Room */}
            <div className="flex-1 flex flex-col bg-white">
              {selectedChatStudent ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedChatStudent.avatar}
                        alt={selectedChatStudent.name}
                        className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900 leading-tight">
                            {selectedChatStudent.name} {selectedChatStudent.surname}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            ● Çevrimiçi
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          Veli: <span className="font-bold text-slate-800">{selectedChatStudent.parentName}</span>
                        </p>
                      </div>
                    </div>

                    {/* Privacy badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                      <span className="hidden sm:inline">Gizlilik Korumalı: Numarasız İletişim</span>
                      <span className="sm:hidden">Numarasız</span>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3.5 bg-slate-50/60">
                    {/* Security Info Card */}
                    <div className="mx-auto max-w-lg p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-1 text-xs">
                      <p className="font-black text-amber-900 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Panel İçi Güvenli Mesajlaşma Odası</span>
                      </p>
                      <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                        Öğretmen ve veli iletişiminde şahsi telefon numarası gerekmez. Tüm diyaloglar okul güvencesiyle panel üzerinden yürütülür.
                      </p>
                    </div>

                    {currentChatMessages.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <MessageCircle className="w-10 h-10 mx-auto text-slate-300" />
                        <p className="text-xs font-bold">Henüz mesajlaşma bulunmuyor.</p>
                        <p className="text-[11px]">Veliye ilk mesajı yazarak iletişimi başlatabilirsiniz.</p>
                      </div>
                    ) : (
                      currentChatMessages.map((msg) => {
                        const isTeacher = msg.senderType === "teacher";
                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isTeacher ? "items-end" : "items-start"}`}
                          >
                            <div
                              className={`max-w-[85%] sm:max-w-md p-3.5 rounded-3xl text-xs shadow-xs space-y-1 ${
                                isTeacher
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs"
                                  : "bg-white border border-slate-200 text-slate-900 rounded-tl-xs"
                              }`}
                            >
                              <p className={`font-extrabold text-[10px] ${isTeacher ? "text-purple-200" : "text-purple-700"}`}>
                                {msg.senderName}
                              </p>
                              <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">
                                {msg.text}
                              </p>
                              <div
                                className={`flex items-center justify-end gap-1 text-[10px] pt-1 ${
                                  isTeacher ? "text-purple-200" : "text-slate-400"
                                }`}
                              >
                                <span>{msg.timestamp}</span>
                                {isTeacher && (
                                  <CheckCheck className={`w-3.5 h-3.5 ${msg.read ? "text-sky-300" : "text-white/60"}`} />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Quick Response Chips */}
                  <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider pl-2">
                      Hızlı Şablon:
                    </span>
                    {[
                      "Merhaba, durumu gayet iyi ve neşeli 😊",
                      "Bilgilendirme için teşekkürler, notumu aldım.",
                      "Öğle yemeğini ve meyvesini afiyetle yedi 🥣",
                      "İlaç saati geldiğinde içirdim, merak etmeyiniz.",
                      "Gününüz güzel geçsin, çıkışta görüşmek üzere!",
                    ].map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setChatInputText(tmpl)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 text-[11px] font-bold whitespace-nowrap transition-colors border border-slate-200"
                      >
                        {tmpl}
                      </button>
                    ))}
                  </div>

                  {/* Message Input Bar */}
                  <form
                    onSubmit={handleSendTeacherMessage}
                    className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      placeholder={`${selectedChatStudent.parentName} velisine mesajınızı yazın... (Numaranız gizlidir)`}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={!chatInputText.trim()}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gönder</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
                  Sohbete başlamak için soldan bir veli seçiniz.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: TEACHER SALARIES & PAYROLL */}
        {activeTab === "maas" && (
          <div className="space-y-6">
            {/* Header Banner with Security / Privacy Guarantee */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Gizlilik Korumalı Kişisel Maaş Portalı</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Maaş, Hak Ediş & Bordro Bilgilerim
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
                    Kurumumuz tarafından adınıza tahakkuk ettirilen aylık taban maaş, ek ders & prim ödemeleri ile banka dekont dökümleriniz burada listelenir. Bu kayıtlar KVKK ve kurumsal gizlilik ilkeleri uyarınca yalnızca sizin erişiminize açıktır.
                  </p>
                </div>

                <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col gap-1 text-right">
                  <div className="flex items-center justify-end gap-1.5 text-xs text-purple-200 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-purple-300" />
                    <span>Maaş Ödeme Günü</span>
                  </div>
                  <div className="text-lg font-black text-amber-300">
                    Her Ayın 15&apos;i
                  </div>
                  <div className="text-[10px] text-purple-300">
                    T.C. Ziraat Bankası A.Ş.
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Sözleşmeli Taban Maaş
                  </span>
                  <div className="text-xl font-black text-slate-900">
                    {(loggedInTeacher.baseSalary || 42000).toLocaleString("tr-TR")} ₺
                  </div>
                  <span className="text-[10px] font-bold text-purple-600">
                    Aylık Net Tutar
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Bu Dönem Ödenen Toplam
                  </span>
                  <div className="text-xl font-black text-emerald-600">
                    {mySalarySummary.totalPaid.toLocaleString("tr-TR")} ₺
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700">
                    {mySalarySummary.paidCount} Ay Tahsil Edildi
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Bekleyen / Gelecek Maaş
                  </span>
                  <div className="text-xl font-black text-amber-600">
                    {mySalarySummary.totalUnpaid.toLocaleString("tr-TR")} ₺
                  </div>
                  <span className="text-[10px] font-bold text-amber-700">
                    {mySalarySummary.unpaidCount} Ay Ödeme Bekliyor
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase truncate">
                    Kayıtlı Maaş Hesabı
                  </span>
                  <div className="text-xs font-black text-slate-800 font-mono truncate" title={loggedInTeacher.iban}>
                    {loggedInTeacher.iban || "TR12 0001 0090 1234 5678 5001"}
                  </div>
                  <span className="text-[10px] font-bold text-sky-600 block truncate">
                    Ziraat Bankası - Vadesiz TL
                  </span>
                </div>
              </div>
            </div>

            {/* Salary List Table / Cards */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-purple-600" />
                      <span>{teacherYear} Eğitim Öğretim Yılı Maaş Çizelgesi</span>
                    </h3>
                    {teacherYear === "2026-2027" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                        📁 2026 Arşiv Kayıtları
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-300">
                        🌟 {teacherYear} Dönemi
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    10 aylık eğitim-öğretim dönemi maaş ve bordro durum dökümü (Geçmiş yıllar eksiksiz saklanır)
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Academic Year Selector for Teacher */}
                  <div className="bg-white p-1 rounded-2xl flex items-center gap-1.5 border border-purple-200 shadow-xs">
                    <span className="text-[11px] font-black uppercase text-purple-900 pl-2 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                      <span>Dönem:</span>
                    </span>
                    <select
                      value={teacherYear}
                      onChange={(e) => setTeacherYear(e.target.value)}
                      className="bg-purple-50 hover:bg-purple-100/80 text-purple-950 font-black text-xs py-1.5 px-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 cursor-pointer transition-colors"
                    >
                      {availableAcademicYears.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr} {yr === "2026-2027" ? "(2026 Kayıtları)" : yr === "2029-2030" ? "(2029 Dönemi)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {mySalarySummary.paidCount} Ay Ödendi
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {mySalarySummary.unpaidCount} Ay Bekliyor
                  </span>
                </div>
              </div>

              {/* Grid of Salary Cards */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {mySalaries.map((salary) => {
                  const isPaid = salary.status === "odendi";
                  return (
                    <div
                      key={salary.id}
                      className={`p-5 rounded-3xl border-2 transition-all hover:shadow-md ${
                        isPaid
                          ? "bg-gradient-to-br from-white to-emerald-50/40 border-emerald-200/80"
                          : "bg-gradient-to-br from-white to-amber-50/40 border-amber-200/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Maaş Dönemi
                          </div>
                          <div className="text-lg font-black text-slate-900">
                            {salary.month}
                          </div>
                        </div>

                        {isPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ÖDENDİ</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-xs">
                            <Clock className="w-3.5 h-3.5" />
                            <span>ÖDEME BEKLENİYOR</span>
                          </span>
                        )}
                      </div>

                      {/* Amounts Breakdown */}
                      <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 mb-3 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600 font-medium">
                          <span>Taban Maaş:</span>
                          <span className="font-bold text-slate-800">
                            {salary.amount.toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                        {salary.bonus ? (
                          <div className="flex justify-between text-emerald-600 font-medium">
                            <span>Ek Ders & Performans Primi:</span>
                            <span className="font-bold">+{salary.bonus.toLocaleString("tr-TR")} ₺</span>
                          </div>
                        ) : null}
                        {salary.deduction ? (
                          <div className="flex justify-between text-rose-600 font-medium">
                            <span>Yasal / İdari Kesinti:</span>
                            <span className="font-bold">-{salary.deduction.toLocaleString("tr-TR")} ₺</span>
                          </div>
                        ) : null}
                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                          <span>Net Ödenen Tutar:</span>
                          <span className={`text-base ${isPaid ? "text-emerald-700" : "text-amber-700"}`}>
                            {salary.netTotal.toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                      </div>

                      {/* Payment info metadata */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4 px-1">
                        {isPaid ? (
                          <div className="space-y-0.5">
                            <div>
                              <strong className="text-slate-700">Ödeme Tarihi:</strong> {salary.paidDate}
                            </div>
                            <div>
                              <strong className="text-slate-700">Bordro/Dekont:</strong> {salary.dekontNo || `BNK-${salary.id}`}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <div>
                              <strong className="text-slate-700">Son Ödeme Günü:</strong> {salary.dueDate}
                            </div>
                            <div className="text-amber-700 font-medium">
                              Hesabınıza otomatik aktarılacaktır
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={() => setViewingSalarySlip(salary)}
                        className={`w-full py-2.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                          isPaid
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-slate-800 hover:bg-slate-900 text-white"
                        }`}
                      >
                        <Receipt className="w-4 h-4" />
                        <span>Bordro Dökümü & Dekont İncele</span>
                      </button>
                    </div>
                  );
                })}
              </div>
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

      {/* Official Salary / Payroll Slip Modal */}
      {viewingSalarySlip && loggedInTeacher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-purple-200 space-y-6 animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            {/* Slip Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block mb-0.5">
                  T.C. MİLLÎ EĞİTİM BAKANLIĞI
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  ÖZEL MASAL DİYARI ANAOKULU & KREŞİ
                </h3>
                <p className="text-[11px] font-bold text-slate-500">
                  Resmî Personel Maaş Bordrosu & Hak Ediş Belgesi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingSalarySlip(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Personnel & Period Info */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Personel Adı Soyadı
                </span>
                <span className="font-black text-slate-900 text-sm block">
                  {loggedInTeacher.name}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Görevi / Branşı
                </span>
                <span className="font-bold text-slate-800 block">
                  {loggedInTeacher.title} ({myClass?.name || "Öğretmen"})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Bordro Dönemi
                </span>
                <span className="font-black text-purple-700 block">
                  {viewingSalarySlip.month}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Bordro / Dekont Takip No
                </span>
                <span className="font-mono font-bold text-slate-800 block">
                  {viewingSalarySlip.dekontNo || `BRD-2026-${viewingSalarySlip.id}`}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Ödeme Yapılan Maaş Hesabı (IBAN)
                </span>
                <span className="font-mono font-bold text-slate-800 block">
                  {loggedInTeacher.iban || "TR12 0001 0090 1234 5678 5001"} (T.C. Ziraat Bankası)
                </span>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-slate-100 p-3 font-black text-slate-800 flex justify-between border-b border-slate-200">
                <span>KALEM AÇIKLAMASI</span>
                <span>TUTAR (TL)</span>
              </div>
              <div className="p-3.5 space-y-2.5">
                <div className="flex justify-between font-medium text-slate-700">
                  <span>Aylık Sözleşmeli Taban Maaş</span>
                  <span className="font-bold font-mono">
                    {viewingSalarySlip.amount.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                {viewingSalarySlip.bonus ? (
                  <div className="flex justify-between font-medium text-emerald-700">
                    <span>Ek Ders, Nöbet & Başarı Primi</span>
                    <span className="font-bold font-mono">
                      +{viewingSalarySlip.bonus.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                ) : null}
                {viewingSalarySlip.deduction ? (
                  <div className="flex justify-between font-medium text-rose-700">
                    <span>Yasal SGK & Bireysel Kesintiler</span>
                    <span className="font-bold font-mono">
                      -{viewingSalarySlip.deduction.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                ) : null}
                <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-center text-sm font-black text-slate-900 bg-purple-50/50 -mx-3.5 -mb-3.5 p-3.5">
                  <span>NET ELE GEÇEN MAAŞ:</span>
                  <span className="text-base text-purple-700 font-mono">
                    {viewingSalarySlip.netTotal.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Official Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">
                  Ödeme & Onay Durumu
                </span>
                {viewingSalarySlip.status === "odendi" ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-black">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ÖDENDİ - {viewingSalarySlip.paidDate} (Banka Havalesi)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-700 font-black">
                    <Clock className="w-4 h-4" />
                    <span>ÖDEME BEKLENİYOR - Vade: {viewingSalarySlip.dueDate}</span>
                  </div>
                )}
                {viewingSalarySlip.notes && (
                  <p className="text-[11px] text-slate-500 italic mt-1">
                    Not: {viewingSalarySlip.notes}
                  </p>
                )}
              </div>

              <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  Kurum Kaşe / Elektronik Onay
                </div>
                <div className="text-xs font-black text-slate-700 mt-1">
                  Özel Masal Diyarı Muhasebe
                </div>
                <div className="text-[10px] text-slate-400">
                  E-Bordro Doğrulama Kodu: {viewingSalarySlip.id.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingSalarySlip(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Kapat
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Yazdır / PDF Olarak Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
