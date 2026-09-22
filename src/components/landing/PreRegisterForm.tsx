"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, Phone, Mail, User, Baby, MessageSquare, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function PreRegisterForm() {
  const { classes, submitApplication } = useApp();

  const [formData, setFormData] = useState({
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    childName: "",
    childAge: "3 Yaş",
    preferredClassId: 3,
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.parentPhone || !formData.childName) {
      alert("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    submitApplication({
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentEmail: formData.parentEmail || "-",
      childName: formData.childName,
      childAge: formData.childAge,
      preferredClassId: Number(formData.preferredClassId),
      notes: formData.notes,
    });

    // Fire joyful celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FBBF24", "#EC4899", "#38BDF8", "#34D399", "#A78BFA"],
      });
    } catch {
      // ignore in environments without canvas
    }

    setIsSubmitted(true);
  };

  return (
    <section id="on-kayit" className="py-20 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-12 shadow-2xl border-4 border-amber-200 relative overflow-hidden">
          {/* Top Decorative Cloud Graphic */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Masal Ailemize Katılın</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Online Ön Kayıt & Tanışma Randevusu
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
              Kontenjanlarımız butik sınıflarımız gereği sınırlıdır. Çocuğunuzun yaş grubuna uygun
              sınıfta yerinizi ayırtmak için formu doldurabilirsiniz.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12 space-y-5 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Ön Kayıt Başvurunuz Sevgiyle Alındı! 🎈
              </h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Değerli velimiz, başvurunuz yönetim panelimize iletilmiştir. Eğitim koordinatörümüz en kısa sürede sizi telefonla arayarak kreş gezisi ve tanışma randevusu planlayacaktır.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      parentName: "",
                      parentPhone: "",
                      parentEmail: "",
                      childName: "",
                      childAge: "3 Yaş",
                      preferredClassId: 3,
                      notes: "",
                    });
                  }}
                  className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-bold text-sm shadow-md hover:bg-amber-600 transition-all"
                >
                  Yeni Bir Başvuru Yap
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Veli Ad Soyad */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>Veli Adı & Soyadı *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ayşe Yılmaz"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
                  />
                </div>

                {/* Veli Telefon */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Telefon Numarası *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Örn: 0532 123 45 67"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
                  />
                </div>

                {/* Veli E-Posta */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>E-Posta Adresi</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Örn: veli@gmail.com"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
                  />
                </div>

                {/* Çocuk Ad Soyad */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-pink-500" />
                    <span>Çocuğun Adı & Soyadı *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ali Yılmaz"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium"
                  />
                </div>

                {/* Çocuğun Yaşı */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-purple-500" />
                    <span>Çocuğun Yaşı / Doğum Tarihi *</span>
                  </label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium bg-white"
                  >
                    <option value="1 - 2 Yaş (12 - 24 Ay)">1 - 2 Yaş (12 - 24 Ay)</option>
                    <option value="2 - 3 Yaş (24 - 36 Ay)">2 - 3 Yaş (24 - 36 Ay)</option>
                    <option value="3 - 4 Yaş">3 - 4 Yaş</option>
                    <option value="4 - 5 Yaş">4 - 5 Yaş</option>
                    <option value="5 - 6 Yaş">5 - 6 Yaş</option>
                    <option value="6 Yaş (İlkokula Hazırlık)">6 Yaş (İlkokula Hazırlık)</option>
                  </select>
                </div>

                {/* Tercih Edilen Sınıf */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Hedef Sınıf Tercihi</span>
                  </label>
                  <select
                    value={formData.preferredClassId}
                    onChange={(e) => setFormData({ ...formData, preferredClassId: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium bg-white"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.ageGroup})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notlar / Özel İstekler */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Özel İstekler, Alerji veya Eklemek İstedikleriniz</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Servis talebi, alerji bilgisi, tam gün/yarım gün tercihi vb."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white font-extrabold text-base shadow-lg shadow-orange-300 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>Ön Kayıt Talebini Gönder</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
