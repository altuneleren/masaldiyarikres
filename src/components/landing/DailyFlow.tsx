"use client";

import React from "react";
import { Clock, Sun, Coffee, BookOpen, Palette, Trees, Utensils, Moon, Music, Sparkles } from "lucide-react";

export default function DailyFlow() {
  const steps = [
    {
      time: "07:30 - 08:45",
      title: "Güler Yüzle Karşılama & Serbest Keşif",
      desc: "Öğretmenlerimizin sıcak karşılaması, serbest blok ve masa oyunları ile neşeli başlangıç.",
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      color: "border-amber-400 bg-amber-50",
    },
    {
      time: "08:45 - 09:30",
      title: "Organik Sabah Kahvaltısı",
      desc: "Köy yumurtası, taze peynirler, doğal zeytin ve ıhlamur eşliğinde enerjik sofra.",
      icon: <Coffee className="w-5 h-5 text-orange-500" />,
      color: "border-orange-400 bg-orange-50",
    },
    {
      time: "09:30 - 10:15",
      title: "Sabah Çemberi & Duygu Paylaşımı",
      desc: "Bugün hava nasıl? Kendimizi nasıl hissediyoruz? Masal Diyarı şarkısı ve gün planlaması.",
      icon: <BookOpen className="w-5 h-5 text-pink-500" />,
      color: "border-pink-400 bg-pink-50",
    },
    {
      time: "10:15 - 11:45",
      title: "Sınıf Branş Atölyeleri (1 - 6)",
      desc: "Her sınıfta farklı: Parmak boyası, fen ve yanardağ deneyleri, robotik kodlama, satranç.",
      icon: <Palette className="w-5 h-5 text-purple-500" />,
      color: "border-purple-400 bg-purple-50",
    },
    {
      time: "11:45 - 12:30",
      title: "Açık Hava & Ekolojik Bahçe Parkuru",
      desc: "Çimlerde koşma, tohum ekimi, ahşap macera parkuru ve temiz havanın şifası.",
      icon: <Trees className="w-5 h-5 text-emerald-500" />,
      color: "border-emerald-400 bg-emerald-50",
    },
    {
      time: "12:30 - 13:30",
      title: "Besleyici Öğle Yemeği & Öz Bakım",
      desc: "Diyetisyen onaylı sıcak çorba, etli/sebzeli ana yemek, yoğurt ve el yıkama-diş fırçalama.",
      icon: <Utensils className="w-5 h-5 text-rose-500" />,
      color: "border-rose-400 bg-rose-50",
    },
    {
      time: "13:30 - 15:00",
      title: "Uyku veya Sessiz Masal & Dinlenme",
      desc: "Küçük yaş gruplarına rahatlatıcı ninni eşliğinde uyku; büyük yaşlara sessiz kitap köşesi.",
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      color: "border-indigo-400 bg-indigo-50",
    },
    {
      time: "15:00 - 15:45",
      title: "İkindi Kahvaltısı & Meyve Saati",
      desc: "Ev yapımı kek, taze mevsim meyveleri, ceviz, badem ve taze sıkılmış meyve suları.",
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
      color: "border-yellow-400 bg-yellow-50",
    },
    {
      time: "15:45 - 17:00",
      title: "Müzik, Orff & Yabancı Dil Oyunları",
      desc: "İngilizce interaktif şarkılar, drama gösterileri, jimnastik ve ritim çalışmaları.",
      icon: <Music className="w-5 h-5 text-sky-500" />,
      color: "border-sky-400 bg-sky-50",
    },
    {
      time: "17:00 - 18:30",
      title: "Günün Karnesi & Mutlu Uğurlama",
      desc: "Günün değerlendirilmesi, veli sistemine raporların girilmesi ve sevgiyle vedalaşma.",
      icon: <Clock className="w-5 h-5 text-teal-500" />,
      color: "border-teal-400 bg-teal-50",
    },
  ];

  return (
    <section id="gunluk-akis" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-pink-600" />
            <span>Düzen, Sevgi ve Disiplin Bir Arada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Masal Diyarı'nda Bir Gün Nasıl Geçer?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Her saati özenle planlanmış, çocukların biyolojik ritmine ve pedagojik ihtiyaçlarına
            uygun zengin bir günlük rutin uyguluyoruz.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${item.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white rounded-xl shadow-xs">{item.icon}</div>
                  <span className="text-[11px] font-black text-slate-500 bg-white/80 px-2 py-0.5 rounded-md">
                    Adım {idx + 1}
                  </span>
                </div>
                <div className="text-xs font-black text-amber-700 tracking-wide mb-1">
                  {item.time}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
