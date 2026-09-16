"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Apple, Trees, ArrowRight, Star, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 masal-clouds border-b border-amber-100">
      {/* Playful floating decoration dots */}
      <div className="absolute top-12 left-10 w-24 h-24 bg-amber-200/40 rounded-full blur-2xl pointer-events-none animate-float-slow"></div>
      <div className="absolute bottom-10 right-12 w-36 h-36 bg-pink-200/40 rounded-full blur-3xl pointer-events-none animate-float-reverse"></div>
      <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-sky-200/40 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Cute Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-amber-200 shadow-sm text-amber-900 text-xs sm:text-sm font-bold">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>2026 - 2027 Erken Kayıt Dönemi Başladı!</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Minik Adımların{" "}
              <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent underline decoration-wavy decoration-amber-300">
                Masalsı
              </span>{" "}
              Başlangıcı 🌈
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Masal Diyarı Kreş ve Gündüz Bakımevi'nde 1'den 6'ya kadar yaş gruplarına özel
              hazırlanmış butik sınıflar, sevgi dolu uzman pedagoglar ve keşif dolu atölyelerle
              çocuklarımızın merakını geleceğe taşıyoruz.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#on-kayit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white font-extrabold text-base shadow-lg shadow-orange-300 hover:shadow-xl hover:scale-105 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>Hemen Ön Kayıt Yaptır</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/veli"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border-2 border-sky-400 text-sky-700 font-extrabold text-base shadow-sm hover:bg-sky-50 hover:border-sky-500 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Veli Portalı & Karne</span>
                <span className="text-lg">🎒</span>
              </Link>
            </div>

            {/* Quick Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-amber-200/60">
              <div className="flex items-center gap-2.5 p-2 bg-white/70 rounded-xl border border-amber-100 shadow-sm">
                <Apple className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-slate-700">%100 Organik Beslenme</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 bg-white/70 rounded-xl border border-amber-100 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                <span className="text-xs font-bold text-slate-700">7/24 Güvenli Kampüs</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 bg-white/70 rounded-xl border border-amber-100 shadow-sm">
                <Trees className="w-5 h-5 text-lime-600 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Geniş Doğa Bahçesi</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 bg-white/70 rounded-xl border border-amber-100 shadow-sm">
                <Heart className="w-5 h-5 text-pink-500 shrink-0" />
                <span className="text-xs font-bold text-slate-700">Montessori Eğitimi</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main playful photo container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-amber-200/60 bg-gradient-to-tr from-amber-100 to-pink-100 aspect-[4/3] sm:aspect-[1/1]">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=900&auto=format&fit=crop&q=80"
                  alt="Masal Diyarı Kreş Çocukları"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-extrabold text-base drop-shadow">Her Çocuk Kendi Masalının Kahramanıdır 🌟</p>
                  <p className="text-xs text-amber-100 drop-shadow">Güleryüzlü eğitmenler, sıcacık bir aile ortamı</p>
                </div>
              </div>

              {/* Floating Badge 1: 1-6. Sınıflar */}
              <div className="absolute -top-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border-2 border-amber-200 flex items-center gap-3 animate-float-slow">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl">
                  6
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Ayrı Yaş Grubu</p>
                  <p className="text-sm font-extrabold text-slate-900">1 - 6. Sınıflar</p>
                </div>
              </div>

              {/* Floating Badge 2: Parent Satisfaction */}
              <div className="absolute -bottom-6 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border-2 border-pink-200 flex items-center gap-3 animate-float-reverse">
                <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                </div>
                <div>
                  <div className="flex items-center text-amber-400 text-xs">
                    ★★★★★ <span className="text-slate-800 font-extrabold ml-1">5.0</span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">%100 Veli Memnuniyeti</p>
                </div>
              </div>

              {/* Floating Badge 3: Online Veli Takip */}
              <div className="absolute -bottom-8 left-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold">
                <Users className="w-4 h-4" />
                <span>Günlük Yemek & Uyku Bildirimi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
