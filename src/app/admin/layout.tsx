"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  LayoutDashboard,
  Users,
  Smile,
  Camera,
  Calendar,
  ClipboardList,
  Utensils,
  LogOut,
  ExternalLink,
  Menu,
  X,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Receipt,
  GraduationCap,
  KeyRound,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminLoggedIn, logoutAdmin, resetAllData, applications } = useApp();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If on login page, render plain children
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If not logged in, prompt to login
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#fffdf9] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border-2 border-amber-200 shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Yönetici Girişi Gerekli</h2>
          <p className="text-xs text-slate-600 font-medium">
            Bu alana sadece Masal Diyarı yöneticileri ve eğitmenleri erişebilir. Lütfen oturum açınız.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/login"
              className="inline-block w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-black rounded-2xl shadow-md hover:scale-105 transition-all text-sm"
            >
              Admin Giriş Sayfasına Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingAppsCount = applications.filter((a) => a.status === "beklemede").length;

  const navLinks = [
    { href: "/admin", label: "Genel Bakış", icon: LayoutDashboard },
    { href: "/admin/kullanicilar", label: "Kullanıcı & Şifre Yönetimi", icon: KeyRound },
    { href: "/admin/muhasebe", label: "Muhasebe & Aidat Takibi", icon: Receipt },
    { href: "/admin/siniflar", label: "1-6. Sınıf & Öğrenci Yönetimi", icon: Users },
    { href: "/admin/gunluk-karne", label: "Günlük Karne / Durum Girişi", icon: Smile },
    { href: "/admin/medya", label: "Resim & Video Yükleme", icon: Camera },
    { href: "/admin/etkinlikler", label: "Sınıf Etkinlikleri", icon: Calendar },
    {
      href: "/admin/basvurular",
      label: "Ön Kayıt Başvuruları",
      icon: ClipboardList,
      badge: pendingAppsCount > 0 ? pendingAppsCount : undefined,
    },
    { href: "/admin/menu-duyuru", label: "Menü & Duyuru Yönetimi", icon: Utensils },
  ];

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  const handleReset = () => {
    if (confirm("Tüm veriler varsayılan demo ayarlarına sıfırlansın mı?")) {
      resetAllData();
      alert("Veriler başarıyla sıfırlandı!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Top Navbar */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-extrabold text-sm">Masal Diyarı Yönetim</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-200"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation - Fixed / Sticky on scroll */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white p-4 sm:p-5 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:shrink-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Logo */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-pink-400 to-purple-500 flex items-center justify-center text-white shadow-md shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white leading-tight">Masal Diyarı</h2>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Yönetici Paneli
            </span>
          </div>
        </div>

        {/* User Info Badge */}
        <div className="mt-2.5 p-2 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">admin</p>
              <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">● Tam Yetkili</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700/80 text-slate-300">
            v2.4
          </span>
        </div>

        {/* Nav Links */}
        <nav className="mt-2.5 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Links & Portals - Elevated Higher Up */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-1">
          <span className="px-2 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Hızlı Erişim & Portallar
          </span>

          {/* Prominent "Siteyi Görüntüle" Button */}
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 hover:text-white transition-all shadow-xs group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Siteyi Görüntüle</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-bold">↗</span>
          </Link>

          <Link
            href="/veli"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold text-sky-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>Veli Portalı</span>
            </span>
            <span className="text-[10px] text-slate-500">↗</span>
          </Link>

          <Link
            href="/ogretmen"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>Öğretmen Portalı</span>
            </span>
            <span className="text-[10px] text-slate-500">↗</span>
          </Link>
        </div>

        {/* System & Logout Actions */}
        <div className="mt-2 pt-2 border-t border-slate-800/60 space-y-1 pb-2">
          <button
            onClick={handleReset}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Demo Veriyi Sıfırla</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Güvenli Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
