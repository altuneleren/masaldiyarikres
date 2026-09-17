"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  GraduationCap,
  Sparkles,
  Lock,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

export default function OgretmenLoginPage() {
  const router = useRouter();
  const { loginTeacher, teachers, classes } = useApp();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const teacher = loginTeacher(username, password);
    if (teacher) {
      router.push("/ogretmen");
    } else {
      setError("Kullanıcı adı veya şifre hatalı. Lütfen kontrol ediniz (Varsayılan şifre: 1234).");
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
    const teacher = loginTeacher(u, p);
    if (teacher) {
      router.push("/ogretmen");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex flex-col justify-center items-center p-4">
      {/* Top Back Link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>
        <Link
          href="/veli"
          className="text-xs font-bold text-sky-600 hover:underline"
        >
          Veli Portalı →
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-purple-200 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Masal Diyarı Öğretmen Girişi</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Öğretmen Portalı
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Öğretmenlerimiz kendi kullanıcı adı ve şifreleriyle giriş yaparak
            <strong> yalnızca kendi sınıflarını ve öğrencilerini</strong> yönetebilirler.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Öğretmen Kullanıcı Adı
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="örn: ogretmen1 veya merve"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Giriş Şifresi
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-black text-sm shadow-lg shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Öğretmen Sistemine Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Fast Demo Teacher Logins */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
            Hızlı Test / Demo Öğretmen Seçimi (Şifre: 1234)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {teachers.map((t) => {
              const cls = classes.find((c) => c.id === t.classId);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleQuickFill(t.username, "1234")}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:border-purple-300 border border-slate-200 text-left transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-purple-700 truncate">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-purple-600 font-bold truncate">
                        {t.classId}. Sınıf ({cls?.shortName})
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Masal Diyarı Kreş & Gündüz Bakımevi Personel Sistemi • Güvenli Giriş
          </p>
        </div>
      </div>
    </div>
  );
}
