"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Utensils, Apple, Coffee, Sparkles, CheckCircle } from "lucide-react";

export default function WeeklyMenu() {
  const { menu } = useApp();
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeMenu = menu[activeDayIndex] || menu[0];

  return (
    <section id="menu" className="py-20 bg-amber-50/50 relative border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Apple className="w-3.5 h-3.5 text-emerald-600" />
            <span>%100 Organik & Diyetisyen Onaylı</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Haftalık Organik Beslenme Menüsü
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Minik bedenlerin sağlıklı büyümesi için mevsiminde taze sebze, meyve, serbest gezen tavuk
            yumurtası ve katkısız süt ürünleriyle hazırlanan dengeli öğünler.
          </p>
        </div>

        {/* Day selection tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-8">
          {menu.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`px-5 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${
                activeDayIndex === idx
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105"
                  : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
              }`}
            >
              {item.day}
            </button>
          ))}
        </div>

        {/* Selected Day Meal Cards */}
        {activeMenu && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Günün Menüsü</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{activeMenu.day} Beslenmesi</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Katkısız • Şekersiz • Probiyotik</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kahvaltı */}
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-800">
                  <div className="p-2 bg-amber-200/70 rounded-xl">
                    <Coffee className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">09:00</span>
                    <h4 className="font-extrabold text-base text-slate-900">Sabah Kahvaltısı</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeMenu.breakfast}
                </p>
              </div>

              {/* Öğle Yemeği */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <div className="p-2 bg-emerald-200/70 rounded-xl">
                    <Utensils className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">12:30</span>
                    <h4 className="font-extrabold text-base text-slate-900">Öğle Yemeği</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeMenu.lunch}
                </p>
              </div>

              {/* İkindi Atıştırmalığı */}
              <div className="p-6 rounded-2xl bg-pink-50/70 border border-pink-200 space-y-3">
                <div className="flex items-center gap-2 text-pink-800">
                  <div className="p-2 bg-pink-200/70 rounded-xl">
                    <Sparkles className="w-5 h-5 text-pink-800" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700">15:15</span>
                    <h4 className="font-extrabold text-base text-slate-900">İkindi Kahvaltısı</h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeMenu.snack}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
