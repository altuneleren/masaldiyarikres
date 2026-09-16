"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Lock, User, KeyRound, AlertCircle, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin, isAdminLoggedIn } = useApp();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = loginAdmin(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Geçersiz kullanıcı adı veya şifre! (Varsayılan: admin / admin123)");
    }
  };

  const handleDemoLogin = () => {
    loginAdmin("admin", "admin123");
    router.push("/admin");
  };

  if (isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fffdf9] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border-2 border-emerald-200 shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Zaten Giriş Yapılmış</h2>
          <p className="text-xs text-slate-600 font-medium">Yönetim paneline doğrudan devam edebilirsiniz.</p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => router.push("/admin")}
              className="py-3 px-6 bg-emerald-600 text-white font-bold rounded-2xl shadow-md hover:bg-emerald-700 transition-all"
            >
              Yönetim Paneline Git
            </button>
            <Link
              href="/"
              className="py-3 px-6 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all text-sm"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50/30 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Playful background blur circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Back to Home Link */}
        <div className="flex justify-between items-center px-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <Home className="w-3.5 h-3.5 text-amber-500" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <Link
            href="/veli"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <span>Veli Portalı</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-amber-200 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-400 to-purple-500 flex items-center justify-center text-white shadow-md mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Masal Diyarı Yönetim Paneli</h1>
            <p className="text-xs text-slate-500 font-medium">
              Sınıf, öğrenci, günlük durum ve medya yönetimi için giriş yapınız.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs font-bold text-rose-700 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Kullanıcı Adı</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                <span>Şifre</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-extrabold text-sm shadow-md shadow-orange-200 hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Panele Giriş Yap</span>
            </button>
          </form>

          {/* Quick Demo Login Shortcut */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-3">
            <p className="text-[11px] font-semibold text-slate-400">
              Giriş Bilgileri: Kullanıcı: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">admin</code> | Şifre: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">admin123</code>
            </p>
            <button
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition-colors"
            >
              <span>⚡ Tek Tıkla Hızlı Yönetici Girişi Yap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
