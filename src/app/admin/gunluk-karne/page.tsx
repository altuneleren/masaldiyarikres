"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Smile,
  Coffee,
  Moon,
  Heart,
  Save,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { DailyReport, MealStatus, MoodType, Student } from "@/types";

export default function AdminGunlukKarnePage() {
  const searchParams = useSearchParams();
  const { classes, students, dailyReports, saveDailyReport, activities } = useApp();

  const [selectedClassId, setSelectedClassId] = useState<number>(1);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State for the selected student
  const [formState, setFormState] = useState<{
    date: string;
    breakfast: MealStatus;
    lunch: MealStatus;
    snack: MealStatus;
    mealNotes: string;
    slept: boolean;
    sleepDuration: number;
    sleepNotes: string;
    mood: MoodType;
    activitiesAttended: string[];
    teacherNote: string;
  }>({
    date: "2026-09-16",
    breakfast: "hepsini_yedi",
    lunch: "hepsini_yedi",
    snack: "hepsini_yedi",
    mealNotes: "",
    slept: true,
    sleepDuration: 90,
    sleepNotes: "",
    mood: "cok_mutlu",
    activitiesAttended: [],
    teacherNote: "",
  });

  // Students of the selected class
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  // Read studentId or classId from query string
  useEffect(() => {
    const sid = searchParams.get("studentId");
    const cid = searchParams.get("classId");

    if (sid) {
      const found = students.find((s) => s.id === sid);
      if (found) {
        setSelectedClassId(found.classId);
        setSelectedStudentId(found.id);
        return;
      }
    }

    if (cid && !isNaN(Number(cid))) {
      setSelectedClassId(Number(cid));
    }
  }, [searchParams, students]);

  // If selected student is not in the class or not set, pick the first student of the class
  useEffect(() => {
    if (classStudents.length > 0) {
      if (!selectedStudentId || !classStudents.some((s) => s.id === selectedStudentId)) {
        setSelectedStudentId(classStudents[0].id);
      }
    } else {
      setSelectedStudentId("");
    }
  }, [selectedClassId, students]);

  // When selectedStudentId changes, populate form from existing report or defaults
  useEffect(() => {
    if (!selectedStudentId) return;

    const existing = dailyReports.find(
      (r) => r.studentId === selectedStudentId && r.date === formState.date
    );

    if (existing) {
      setFormState({
        date: existing.date,
        breakfast: existing.meals.breakfast,
        lunch: existing.meals.lunch,
        snack: existing.meals.snack,
        mealNotes: existing.meals.notes || "",
        slept: existing.sleep.slept,
        sleepDuration: existing.sleep.durationMinutes,
        sleepNotes: existing.sleep.notes || "",
        mood: existing.mood,
        activitiesAttended: existing.activitiesAttended || [],
        teacherNote: existing.teacherNote || "",
      });
    } else {
      // Default fresh values
      setFormState({
        date: "2026-09-16",
        breakfast: "hepsini_yedi",
        lunch: "hepsini_yedi",
        snack: "hepsini_yedi",
        mealNotes: "",
        slept: true,
        sleepDuration: 75,
        sleepNotes: "Huzurlu ve sakin dinlendi.",
        mood: "cok_mutlu",
        activitiesAttended: [],
        teacherNote: "Bugün tüm etkinliklerde çok neşeliydi ve arkadaşlarıyla paylaştı.",
      });
    }
  }, [selectedStudentId, selectedClassId, dailyReports]);

  const activeStudent = students.find((s) => s.id === selectedStudentId);
  const activeClass = classes.find((c) => c.id === selectedClassId);
  const classActivities = activities.filter((a) => a.classId === selectedClassId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) {
      alert("Lütfen bir öğrenci seçiniz.");
      return;
    }

    saveDailyReport({
      studentId: selectedStudentId,
      date: formState.date,
      meals: {
        breakfast: formState.breakfast,
        lunch: formState.lunch,
        snack: formState.snack,
        notes: formState.mealNotes,
      },
      sleep: {
        slept: formState.slept,
        durationMinutes: formState.slept ? Number(formState.sleepDuration) : 0,
        notes: formState.sleepNotes,
      },
      mood: formState.mood,
      activitiesAttended: formState.activitiesAttended,
      teacherNote: formState.teacherNote,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const toggleActivity = (title: string) => {
    setFormState((prev) => {
      const exists = prev.activitiesAttended.includes(title);
      return {
        ...prev,
        activitiesAttended: exists
          ? prev.activitiesAttended.filter((t) => t !== title)
          : [...prev.activitiesAttended, title],
      };
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Smile className="w-6 h-6 text-amber-500" />
            <span>Günlük Karne & Durum Girişi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Öğrencilerin gün içindeki beslenme (kahvaltı/öğle/ikindi), uyku, duygu ve öğretmen notunu kaydedin.
          </p>
        </div>
      </div>

      {/* Sağ Üst Köşe Bildirim Pop-up'ı (Toast) */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 z-50 max-w-sm w-full bg-white border-2 border-emerald-500 rounded-3xl p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-2xl shrink-0 mt-0.5 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-slate-900">Günlük Rapor Kaydedildi! 🌟</h4>
              <button
                onClick={() => setSaveSuccess(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
              <strong>{activeStudent?.name} {activeStudent?.surname}</strong> için beslenme, uyku ve öğretmen notları başarıyla sisteme işlendi.
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Veli Portalı (E-Okul) ile Senkronize Edildi</span>
            </div>
          </div>
        </div>
      )}

      {/* Class Selector Bar */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
        {classes.map((cls) => {
          const isSelected = cls.id === selectedClassId;
          const count = students.filter((s) => s.classId === cls.id).length;

          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`px-4 py-2.5 rounded-2xl border-2 font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-amber-500 text-white border-amber-600 shadow-md scale-105"
                  : "bg-white text-slate-700 border-slate-200 hover:border-amber-300"
              }`}
            >
              <span>{cls.icon}</span>
              <span>{cls.shortName}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-amber-700 text-white" : "bg-slate-100 text-slate-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Student Selector Pills within Class */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          {activeClass?.name} - Karne Girilecek Öğrenciyi Seçin:
        </span>

        {classStudents.length === 0 ? (
          <p className="text-xs text-slate-500 italic">Bu sınıfta kayıtlı öğrenci bulunmuyor.</p>
        ) : (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
            {classStudents.map((stu) => {
              const isSelected = stu.id === selectedStudentId;

              return (
                <button
                  key={stu.id}
                  onClick={() => setSelectedStudentId(stu.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-sky-500 text-white border-sky-600 shadow-sm scale-105"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-300"
                  }`}
                >
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/60"
                  />
                  <div className="text-left">
                    <p className="text-xs font-black">{stu.name} {stu.surname}</p>
                    <p className={`text-[10px] ${isSelected ? "text-sky-100" : "text-slate-400"}`}>
                      {stu.studentCode}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Daily Report Input Form */}
      {activeStudent ? (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-8">
          {/* Active Student Header Summary */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={activeStudent.avatar}
                alt={activeStudent.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-300 shadow-sm"
              />
              <div>
                <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {activeStudent.studentCode} • {activeClass?.shortName}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {activeStudent.name} {activeStudent.surname} Günlük Durum Raporu
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Rapor Tarihi:</span>
              <input
                type="date"
                value={formState.date}
                onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                className="p-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
              />
            </div>
          </div>

          {/* 1. Duygu / Mod Durumu */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Smile className="w-4 h-4 text-pink-500" />
              <span>Günün Duygu ve Davranış Hali</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { key: "cok_mutlu", label: "Çok Mutlu 🥰", bg: "hover:border-pink-300" },
                { key: "neseli", label: "Neşeli 😊", bg: "hover:border-amber-300" },
                { key: "sakin", label: "Sakin 😌", bg: "hover:border-sky-300" },
                { key: "biraz_yorgun", label: "Biraz Yorgun 🥱", bg: "hover:border-purple-300" },
                { key: "huzursuz", label: "İlgi İstiyor 🥺", bg: "hover:border-rose-300" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => setFormState({ ...formState, mood: item.key as MoodType })}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all text-center ${
                    formState.mood === item.key
                      ? "border-pink-500 bg-pink-50 text-pink-900 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Beslenme Durumları */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-500" />
              <span>Beslenme Durumu (Kahvaltı, Öğle, İkindi)</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sabah */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-800">Sabah Kahvaltısı:</span>
                <select
                  value={formState.breakfast}
                  onChange={(e) => setFormState({ ...formState, breakfast: e.target.value as MealStatus })}
                  className="w-full p-2.5 rounded-xl border border-amber-200 text-xs font-bold bg-white"
                >
                  <option value="hepsini_yedi">Hepsini Bitirdi 😋</option>
                  <option value="yarisini_yedi">Yarısını Yedi 👍</option>
                  <option value="az_yedi">Az Yedi 🥣</option>
                  <option value="yemedi">İstemedi ❌</option>
                </select>
              </div>

              {/* Öğle */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-800">Öğle Yemeği:</span>
                <select
                  value={formState.lunch}
                  onChange={(e) => setFormState({ ...formState, lunch: e.target.value as MealStatus })}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs font-bold bg-white"
                >
                  <option value="hepsini_yedi">Hepsini Bitirdi 😋</option>
                  <option value="yarisini_yedi">Yarısını Yedi 👍</option>
                  <option value="az_yedi">Az Yedi 🥣</option>
                  <option value="yemedi">İstemedi ❌</option>
                </select>
              </div>

              {/* İkindi */}
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-2">
                <span className="text-xs font-bold text-pink-800">İkindi Atıştırmalığı:</span>
                <select
                  value={formState.snack}
                  onChange={(e) => setFormState({ ...formState, snack: e.target.value as MealStatus })}
                  className="w-full p-2.5 rounded-xl border border-pink-200 text-xs font-bold bg-white"
                >
                  <option value="hepsini_yedi">Hepsini Bitirdi 😋</option>
                  <option value="yarisini_yedi">Yarısını Yedi 👍</option>
                  <option value="az_yedi">Az Yedi 🥣</option>
                  <option value="yemedi">İstemedi ❌</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              placeholder="Beslenme ile ilgili ek not (örn: Meyvesini severek yedi)"
              value={formState.mealNotes}
              onChange={(e) => setFormState({ ...formState, mealNotes: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* 3. Uyku ve Dinlenme */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-500" />
              <span>Öğle Uykusu & Dinlenme Saati</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-900 block">Uyudu mu?</span>
                  <span className="text-[11px] text-slate-500">Öğle saatinde uyku odasında uyudu mu?</span>
                </div>
                <input
                  type="checkbox"
                  checked={formState.slept}
                  onChange={(e) => setFormState({ ...formState, slept: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {formState.slept && (
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1">
                  <span className="text-xs font-bold text-indigo-900 block">Uyku Süresi (Dakika):</span>
                  <input
                    type="number"
                    min={15}
                    max={180}
                    step={15}
                    value={formState.sleepDuration}
                    onChange={(e) => setFormState({ ...formState, sleepDuration: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-indigo-200 text-xs font-bold bg-white"
                  />
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Uyku notu (örn: Masal okurken rahatça uykuya daldı.)"
              value={formState.sleepNotes}
              onChange={(e) => setFormState({ ...formState, sleepNotes: e.target.value })}
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium"
            />
          </div>

          {/* 4. Katıldığı Etkinlikler */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Bugün Katıldığı Sınıf Etkinlikleri</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {classActivities.map((act) => {
                const isChecked = formState.activitiesAttended.includes(act.title);
                return (
                  <button
                    type="button"
                    key={act.id}
                    onClick={() => toggleActivity(act.title)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between text-left transition-colors ${
                      isChecked
                        ? "border-sky-500 bg-sky-50 text-sky-900"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span>{act.title}</span>
                    <span className="text-[10px] text-sky-600">({act.category})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Öğretmenin Veliye Özel Notu */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Öğretmenden Veliye Özel Not *</span>
            </label>
            <textarea
              rows={3}
              required
              value={formState.teacherNote}
              onChange={(e) => setFormState({ ...formState, teacherNote: e.target.value })}
              placeholder="Bugün çok neşeliydi, legolarla harika bir kule inşa etti..."
              className="w-full p-4 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium">
              * Kaydedilen veriler veli portalında {activeStudent.name} için anında görünür hale gelir.
            </p>
            <button
              type="submit"
              className="py-3.5 px-8 bg-gradient-to-r from-amber-500 to-pink-500 hover:scale-105 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Günlük Raporu Sisteme Kaydet</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-xs text-slate-500">Lütfen yukarıdan bir öğrenci seçiniz.</p>
        </div>
      )}
    </div>
  );
}
