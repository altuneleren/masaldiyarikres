"use client";

import React from "react";
import { Heart, Apple, ShieldCheck, TreePine, Palette, Brain, Smile } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Montessori & Reggio Emilia",
      desc: "Ezberci değil; deneyimleyerek, keşfederek ve dokunarak öğrenmeyi destekleyen modern pedagojik yaklaşım.",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
      border: "border-purple-200",
    },
    {
      title: "%100 Organik Beslenme",
      desc: "Katkısız, paketli gıdasız, mevsim sebzeleri ve taze probiyotik yoğurtlarla hazırlanan diyetisyen onaylı menü.",
      icon: <Apple className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-100",
      border: "border-emerald-200",
    },
    {
      title: "Veli Bilgilendirme Portalı",
      desc: "Çocuğunuzun o gün ne yediğini, kaç dakika uyuduğunu ve öğretmen notunu anlık olarak telefonunuzdan takip edin.",
      icon: <Smile className="w-6 h-6 text-sky-600" />,
      bg: "bg-sky-100",
      border: "border-sky-200",
    },
    {
      title: "Ekolojik Doğa Bahçesi",
      desc: "Toprakla buluşan, tohum eken, açık hava macera parkurunda özgürce koşan mutlu ve sağlıklı çocuklar.",
      icon: <TreePine className="w-6 h-6 text-lime-600" />,
      bg: "bg-lime-100",
      border: "border-lime-200",
    },
    {
      title: "Robotik Kodlama & Sanat",
      desc: "1'den 6'ya kadar her yaş grubunun bilişsel seviyesine uygun fiziksel kodlama matları, seramik ve tuval atölyeleri.",
      icon: <Palette className="w-6 h-6 text-pink-600" />,
      bg: "bg-pink-100",
      border: "border-pink-200",
    },
    {
      title: "Maksimum Güvenlik & Hijyen",
      desc: "Milli Eğitim Bakanlığı standartlarında, çocuk dostu yumuşak mobilyalar ve 7/24 kayıtlı güvenli kampüs.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-100",
      border: "border-amber-200",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Neden Masal Diyarı?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Çocuğunuz İçin En İyisini Düşündük
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Sadece bir kreş değil; güven, sevgi, keşif ve neşenin bir arada yaşandığı ikinci bir yuva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl bg-white border-2 ${feat.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${feat.bg} flex items-center justify-center mb-6`}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
