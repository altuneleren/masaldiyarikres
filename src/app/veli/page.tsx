"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  UserCircle,
  Calendar,
  Smile,
  Coffee,
  Moon,
  Camera,
  Bell,
  ArrowLeft,
  Heart,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertCircle,
  Clock,
  Video,
  Send,
  Lock,
  LogOut,
  ShieldCheck,
  User,
  KeyRound,
  GraduationCap,
} from "lucide-react";
import { DailyReport, MealStatus, MoodType, Student } from "@/types";

export default function VeliPortalPage() {
  const {
    classes,
    students,
    dailyReports,
    activities,
    media,
    announcements,
    menu,
    loggedInStudent,
    loginStudent,
    logoutStudent,
  } = useApp();

  // Login Form States
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Portal Tab State
  const [activeTab, setActiveTab] = useState<"karne" | "etkinlikler" | "medya" | "menu" | "mesaj">("karne");
  const [parentMessage, setParentMessage] = useState("");
  const [parentMessageSent, setParentMessageSent] = useState(false);

  // Handle Parent Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const cleanUser = loginUsername.trim();
    const cleanPass = loginPassword.trim() || "1234";

    if (!cleanUser) {
      setLoginError("Lütfen öğrenci kodu veya kullanıcı adınızı giriniz.");
      return;
    }

    const success = loginStudent(cleanUser, cleanPass);
    if (!success) {
      setLoginError("Öğrenci kodu veya şifre hatalı! Lütfen kontrol ediniz. (Varsayılan şifre: 1234)");
    }
  };

  // Quick Demo Login helper
  const handleDemoStudentLogin = (demoStudent: Student) => {
    setLoginError("");
    const u = demoStudent.username || demoStudent.studentCode || demoStudent.name;
    const p = demoStudent.password || "1234";
    setLoginUsername(u);
    setLoginPassword(p);
    loginStudent(u, p);
  };

  // Helper formatting for meals
  const formatMeal = (status: MealStatus) => {
    switch (status) {
      case "hepsini_yedi":
        return { text: "Hepsini Bitirdi 😋", bg: "bg-emerald-100 text-emerald-800 border-emerald-200" };
      case "yarisini_yedi":
        return { text: "Yarısını Yedi 👍", bg: "bg-amber-100 text-amber-800 border-amber-200" };
      case "az_yedi":
        return { text: "Az Yedi 🥣", bg: "bg-orange-100 text-orange-800 border-orange-200" };
      case "yemedi":
        return { text: "İstemedi ❌", bg: "bg-rose-100 text-rose-800 border-rose-200" };
      default:
        return { text: "Belirtilmedi", bg: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const formatMood = (mood: MoodType) => {
    switch (mood) {
      case "cok_mutlu":
        return { text: "Çok Mutlu & Neşeli", icon: "🥰" };
      case "neseli":
        return { text: "Neşeli & Paylaşımcı", icon: "😊" };
      case "sakin":
        return { text: "Sakin & Uyumlu", icon: "😌" };
      case "biraz_yorgun":
        return { text: "Biraz Yorgun", icon: "🥱" };
      case "huzursuz":
        return { text: "Biraz İlgi İstiyor", icon: "🥺" };
      default:
        return { text: "Normal", icon: "🙂" };
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentMessage.trim()) return;
    setParentMessageSent(true);
    setTimeout(() => {
      setParentMessage("");
      setParentMessageSent(false);
    }, 4000);
  };

  // IF NOT LOGGED IN: E-OKUL LOGIN SCREEN
  if (!loggedInStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-amber-50/40 to-pink-50 flex flex-col justify-between">
        {/* Top Navbar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-amber-200 p-4 shadow-xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-2 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 hidden sm:inline">Öğretmen / Yönetici misiniz?</span>
              <Link
                href="/admin/login"
                className="px-3.5 py-1.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs font-bold transition-colors"
              >
                Admin Girişi
              </Link>
            </div>
          </div>
        </header>

        {/* Login Body */}
        <div className="flex-1 flex items-center justify-center p-4 my-8">
          <div className="max-w-md w-full space-y-6">
            {/* Main Login Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-sky-200 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg mx-auto">
                  <GraduationCap className="w-9 h-9" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>E-Okul & Veli Bilgilendirme Sistemi</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900">Veli Giriş Portalı</h1>
                <p className="text-xs text-slate-500 font-medium">
                  Öğrencinize özel kullanıcı adı ve şifrenizle giriş yaparak sadece kendi çocuğunuzun karne ve gelişim bültenini görüntüleyin.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs font-bold text-rose-700 animate-in shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-sky-500" />
                    <span>Öğrenci Kodu veya Kullanıcı Adı</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: MD-101 veya Ali"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-sky-500" />
                    <span>Veli Şifresi</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Örn: 1234"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-white font-extrabold text-sm shadow-md shadow-sky-200 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Güvenli Giriş Yap</span>
                </button>
              </form>

              {/* Privacy Notice */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p className="font-bold text-slate-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Çocuk Gizliliği & E-Okul Güvenliği</span>
                </p>
                <p>
                  Her veli yalnızca kendi çocuğunun güncel yemek, uyku, aktivite ve öğretmen notlarını görebilir.
                </p>
              </div>

              {/* Quick Demo Student Picker */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                  ⚡ Test İçin Hızlı Öğrenci Seçimi (Şifre: 1234):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {students.slice(0, 4).map((stu) => {
                    const stuClass = classes.find((c) => c.id === stu.classId);

                    return (
                      <button
                        key={stu.id}
                        type="button"
                        onClick={() => handleDemoStudentLogin(stu)}
                        className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-100 text-left transition-colors flex items-center gap-2 group"
                      >
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-black text-slate-800 truncate group-hover:text-sky-700">
                            {stu.name} {stu.surname}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {stuClass?.shortName} • {stu.username || stu.studentCode}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="p-4 text-center text-xs text-slate-400">
          Masal Diyarı Kreş & Gündüz Bakımevi © {new Date().getFullYear()} • E-Okul Veli Bilgilendirme Sistemi
        </footer>
      </div>
    );
  }

  // IF LOGGED IN: PRIVATE STUDENT DASHBOARD (ONLY SEES THEIR CHILD!)
  const studentReport: DailyReport | undefined = dailyReports.find(
    (r) => r.studentId === loggedInStudent.id
  );

  const studentClass = classes.find((c) => c.id === loggedInStudent.classId);

  // Filter activities strictly for THIS student's class
  const classActivities = activities.filter((a) => a.classId === loggedInStudent.classId);

  // Filter media strictly for THIS student's class or general showcase
  const classMedia = media.filter(
    (m) => m.classId === loggedInStudent.classId || m.classId === null
  );

  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-amber-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-2 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Ana Sayfa</span>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Veli Portalı (E-Okul)</span>
                <span className="text-base">🎒</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-semibold">
                Masal Diyarı Kreş • Bireysel Öğrenci Karnesi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Logged in Parent Badge */}
            <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 bg-sky-50 text-sky-900 rounded-2xl border border-sky-200 text-xs">
              <UserCircle className="w-4 h-4 text-sky-600" />
              <div>
                <p className="font-extrabold leading-tight">{loggedInStudent.parentName}</p>
                <p className="text-[10px] text-sky-700">Öğrenci: {loggedInStudent.name} {loggedInStudent.surname}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logoutStudent}
              className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8 animate-in fade-in">
        {/* Child Identity Card */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shrink-0">
                <img
                  src={loggedInStudent.avatar}
                  alt={loggedInStudent.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-white border border-white/30">
                    {studentClass?.name}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-black/20 text-white">
                    Öğrenci No: {loggedInStudent.studentCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-white">
                    Aktif Kayıt
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow">
                  {loggedInStudent.name} {loggedInStudent.surname}
                </h2>

                <p className="text-xs sm:text-sm text-sky-100 font-semibold flex items-center justify-center sm:justify-start gap-2">
                  <span>Sorumlu Öğretmen: <strong>{studentClass?.teacher}</strong></span>
                  <span>•</span>
                  <span>{studentClass?.room}</span>
                </p>
              </div>
            </div>

            {/* Health and Parent Summary */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-xs space-y-1.5 w-full md:w-auto">
              <p className="font-extrabold text-white uppercase tracking-wider text-[10px]">
                Kayıtlı Veli & Sağlık Bilgisi
              </p>
              <p className="flex items-center gap-1.5 text-white/90">
                <span>Veli:</span> <strong>{loggedInStudent.parentName}</strong>
              </p>
              <p className="flex items-center gap-1.5 text-white/90">
                <Phone className="w-3.5 h-3.5" />
                <span>{loggedInStudent.parentPhone}</span>
              </p>
              <p className="flex items-center gap-1.5 text-white/90">
                <span>Kan Grubu:</span> <strong>{loggedInStudent.bloodType}</strong>
              </p>
              {loggedInStudent.allergies && (
                <p className="text-amber-200 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Alerji: {loggedInStudent.allergies}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("karne")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
              activeTab === "karne"
                ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Bugünkü Günlük Karne</span>
          </button>

          <button
            onClick={() => setActiveTab("etkinlikler")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
              activeTab === "etkinlikler"
                ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Sınıf Etkinlikleri ({classActivities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("medya")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
              activeTab === "medya"
                ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Sınıf Albümümüz ({classMedia.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
              activeTab === "menu"
                ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Yemek Menüsü & Duyurular</span>
          </button>

          <button
            onClick={() => setActiveTab("mesaj")}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
              activeTab === "mesaj"
                ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Öğretmene Not İlet</span>
          </button>
        </div>

        {/* TAB 1: Günlük Karne */}
        {activeTab === "karne" && (
          <div className="space-y-6 animate-in fade-in">
            {studentReport ? (
              <>
                {/* Top Status Indicators (Mood & Sleep) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Duygu Durumu */}
                  <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Günün Ruh Hali & Modu
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {formatMood(studentReport.mood).text}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Arkadaşlarıyla ve öğretmenleriyle neşeyle iletişim kurdu.
                      </p>
                    </div>
                    <div className="text-5xl p-3 bg-pink-50 rounded-3xl border border-pink-100">
                      {formatMood(studentReport.mood).icon}
                    </div>
                  </div>

                  {/* Uyku Durumu */}
                  <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Öğle Uykusu & Dinlenme
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {studentReport.sleep.slept
                          ? `${studentReport.sleep.durationMinutes} Dakika Deliksiz Uyudu`
                          : "Sessiz Dinlenme / Masal Saati"}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {studentReport.sleep.notes || "Uyku sonrasında neşeyle uyandı."}
                      </p>
                    </div>
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl border border-indigo-100">
                      <Moon className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                {/* Beslenme Kartları */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Coffee className="w-5 h-5 text-amber-500" />
                        <span>Bugünkü Beslenme Raporu</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Yemek saatlerinde öğretmenlerimiz tarafından kaydedilen durum.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      Tarih: {studentReport.date}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Kahvaltı */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">Sabah Kahvaltısı</span>
                      <div className={`p-3 rounded-xl border font-bold text-sm text-center ${formatMeal(studentReport.meals.breakfast).bg}`}>
                        {formatMeal(studentReport.meals.breakfast).text}
                      </div>
                    </div>

                    {/* Öğle Yemeği */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">Öğle Yemeği</span>
                      <div className={`p-3 rounded-xl border font-bold text-sm text-center ${formatMeal(studentReport.meals.lunch).bg}`}>
                        {formatMeal(studentReport.meals.lunch).text}
                      </div>
                    </div>

                    {/* İkindi */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">İkindi Atıştırmalığı</span>
                      <div className={`p-3 rounded-xl border font-bold text-sm text-center ${formatMeal(studentReport.meals.snack).bg}`}>
                        {formatMeal(studentReport.meals.snack).text}
                      </div>
                    </div>
                  </div>

                  {studentReport.meals.notes && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                      <strong>Beslenme Ek Notu:</strong> {studentReport.meals.notes}
                    </div>
                  )}
                </div>

                {/* Öğretmenin Özel Notu */}
                <div className="bg-gradient-to-tr from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-purple-600 text-purple-600" />
                      <span>Öğretmenden Veliye Özel Günlük Not</span>
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {studentClass?.teacher} ({studentClass?.name})
                    </span>
                  </div>
                  <p className="text-base font-semibold text-slate-800 leading-relaxed italic bg-white/70 p-5 rounded-2xl border border-purple-100">
                    "{studentReport.teacherNote}"
                  </p>
                </div>

                {/* Katıldığı Etkinlikler */}
                {studentReport.activitiesAttended.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                      Bugün Aktif Katıldığı Atölyeler
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {studentReport.activitiesAttended.map((act, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                          <span>{act}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-3">
                <Clock className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-800">
                  Bugünkü Karne Raporu Henüz Giriş Aşamasında
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {studentClass?.teacher} öğretmenimiz gün içindeki beslenme ve uyku saatlerini takip ederek
                  raporu sisteme işlemektedir. Gün sonuna doğru tekrar kontrol edebilirsiniz.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Sınıf Etkinlikleri */}
        {activeTab === "etkinlikler" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm mb-4">
              <h3 className="text-lg font-black text-slate-900">
                {studentClass?.name} Günlük & Haftalık Etkinlik Programı
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Çocuğunuzun sınıfına özel planlanmış motor beceri, zeka oyunları ve sanat atölyeleri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:border-amber-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-800">
                        {act.category}
                      </span>
                      <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                        {act.time}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">{act.title}</h4>
                    <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Eğitmen: <strong>{act.instructor}</strong></span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tamamlandı</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Medya (Sınıfa Özel) */}
        {activeTab === "medya" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">
                {studentClass?.name} Fotoğraf ve Video Albümü
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Sınıf içi etkinlikler, bahçe oyunları ve kutlamalardan anlar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {classMedia.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <img
                      src={m.thumbnailUrl || m.url}
                      alt={m.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-black/60 text-white flex items-center gap-1">
                        {m.type === "video" ? <Video className="w-3 h-3 text-pink-400" /> : <Camera className="w-3 h-3 text-sky-400" />}
                        <span>{m.type === "video" ? "Video" : "Fotoğraf"}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400">{m.date} • {m.category}</p>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{m.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{m.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Yemek Menüsü & Duyurular */}
        {activeTab === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
            {/* Günün Menüsü */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-emerald-600" />
                <span>Haftalık Organik Yemek Programı</span>
              </h3>
              <div className="space-y-3">
                {menu.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <p className="text-xs font-black text-emerald-800 uppercase">{m.day}</p>
                    <p className="text-xs text-slate-700"><strong>Kahvaltı:</strong> {m.breakfast}</p>
                    <p className="text-xs text-slate-700"><strong>Öğle:</strong> {m.lunch}</p>
                    <p className="text-xs text-slate-700"><strong>İkindi:</strong> {m.snack}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kreş Duyuruları */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <span>Önemli Kreş Duyuruları</span>
              </h3>
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">{ann.title}</h4>
                      <span className="text-[11px] font-bold text-amber-800">{ann.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Öğretmene Not İlet */}
        {activeTab === "mesaj" && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Öğretmene Hızlı Bilgi & Not İletme
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {studentClass?.teacher} öğretmenimize çocuğunuzun bugünkü durumu (ilaç kullanımı, erken teslim alma veya özel durumlar) hakkında anlık not bırakabilirsiniz.
              </p>
            </div>

            {parentMessageSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-black text-slate-900 text-base">Notunuz Öğretmene İletildi!</h4>
                <p className="text-xs text-slate-600">Öğretmenimiz bildirimi aldı ve dikkatle uygulayacaktır.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">İletilecek Not / Mesaj:</label>
                  <textarea
                    rows={4}
                    required
                    value={parentMessage}
                    onChange={(e) => setParentMessage(e.target.value)}
                    placeholder="Örn: Bugün saat 16:00'da amcası teslim alacaktır. / Öğle yemeği sonrası antibiyotiği 1 ölçek içirilebilir mi?"
                    className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Notu Öğretmene Gönder</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
