"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Utensils, Bell, Plus, Trash2, Save, CheckCircle2, Coffee } from "lucide-react";
import { MealMenuItem } from "@/types";

export default function AdminMenuDuyuruPage() {
  const { menu, updateWeeklyMenu, announcements, addAnnouncement, deleteAnnouncement } = useApp();

  const [activeMenuState, setActiveMenuState] = useState<MealMenuItem[]>(menu);
  const [menuSaved, setMenuSaved] = useState(false);

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annAudience, setAnnAudience] = useState<"tumu" | "veliler">("tumu");

  const handleMenuChange = (index: number, field: keyof MealMenuItem, value: string) => {
    setActiveMenuState((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    updateWeeklyMenu(activeMenuState);
    setMenuSaved(true);
    setTimeout(() => setMenuSaved(false), 3000);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    const todayStr = new Date().toISOString().split("T")[0];

    addAnnouncement({
      title: annTitle,
      content: annContent,
      date: todayStr,
      important: true,
      targetAudience: annAudience,
    });

    setAnnTitle("");
    setAnnContent("");
  };

  return (
    <div className="space-y-10 animate-in fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-emerald-600" />
          <span>Haftalık Yemek Menüsü & Duyuru Yönetimi</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Kreşin haftalık organik yemek listesini güncelleyin ve velilere yönelik duyuruları yönetin.
        </p>
      </div>

      {/* SECTION 1: Yemek Menüsü */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-500" />
              <span>Haftalık Beslenme Listesi (Pazartesi - Cuma)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Yapılan değişiklikler ana sayfada ve veli panelinde anında güncellenir.
            </p>
          </div>

          {menuSaved && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Menü Kaydedildi!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveMenu} className="space-y-6">
          <div className="space-y-4">
            {activeMenuState.map((dayItem, idx) => (
              <div
                key={dayItem.day}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <span className="text-xs font-black text-slate-900 bg-white px-3 py-1 rounded-md shadow-xs border border-slate-200 inline-block">
                  {dayItem.day}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Sabah Kahvaltısı</label>
                    <input
                      type="text"
                      value={dayItem.breakfast}
                      onChange={(e) => handleMenuChange(idx, "breakfast", e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Öğle Yemeği</label>
                    <input
                      type="text"
                      value={dayItem.lunch}
                      onChange={(e) => handleMenuChange(idx, "lunch", e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">İkindi Atıştırmalığı</label>
                    <input
                      type="text"
                      value={dayItem.snack}
                      onChange={(e) => handleMenuChange(idx, "snack", e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Haftalık Menüyü Kaydet</span>
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: Duyurular */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* New Announcement Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Yeni Duyuru Yayınla</span>
          </h2>

          <form onSubmit={handleAddAnnouncement} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Duyuru Başlığı</label>
              <input
                type="text"
                required
                placeholder="Örn: 🌿 Bahçe Şenliği ve Piknik Günü"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Hedef Kitle</label>
              <select
                value={annAudience}
                onChange={(e) => setAnnAudience(e.target.value as "tumu" | "veliler")}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="tumu">Herkese Açık (Tüm Ziyaretçiler)</option>
                <option value="veliler">Yalnızca Veliler (Veli Portalı)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Duyuru İçeriği</label>
              <textarea
                rows={3}
                required
                placeholder="Duyuru detayları, tarih ve saat..."
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Duyuruyu Yayınla</span>
            </button>
          </form>
        </div>

        {/* Existing Announcements */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-base font-black text-slate-900">Aktif Duyurular ({announcements.length})</h2>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{ann.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {ann.targetAudience === "tumu" ? "Tüm Ziyaretçiler" : "Veliye Özel"}
                    </span>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="text-slate-300 hover:text-rose-500 p-1"
                      title="Duyuruyu Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900">{ann.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
