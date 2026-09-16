"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, HeartHandshake, ShieldCheck, Phone, Clock, Menu, X, UserCircle, Settings } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdminLoggedIn } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-amber-100 transition-all">
      {/* Top micro info bar */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>0 (212) 555 12 34</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Hafta İçi: 07:30 - 18:30</span>
            </span>
          </div>
          <div className="flex items-center space-x-3 text-amber-50">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span className="font-medium">M.E.B. Bağlı & 7/24 Güvenlikli Kampüs</span>
            </span>
            <span className="hidden md:inline">|</span>
            <Link
              href="/admin"
              className="hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors"
            >
              <Settings className="w-3 h-3" />
              {isAdminLoggedIn ? "Yönetim Paneli (Açık)" : "Yönetici Girişi"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-400 to-purple-500 flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Masal Diyarı
                </span>
                <span className="text-xl">🏰</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
                Kreş & Gündüz Bakımevi
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link
              href="#siniflar"
              className="text-slate-700 hover:text-amber-600 font-bold text-sm transition-colors"
            >
              Sınıflarımız (1-6)
            </Link>
            <Link
              href="#gunluk-akis"
              className="text-slate-700 hover:text-pink-600 font-bold text-sm transition-colors"
            >
              Günlük Akış
            </Link>
            <Link
              href="#menu"
              className="text-slate-700 hover:text-emerald-600 font-bold text-sm transition-colors"
            >
              Yemek Menüsü
            </Link>
            <Link
              href="#galeri"
              className="text-slate-700 hover:text-sky-600 font-bold text-sm transition-colors"
            >
              Foto & Video
            </Link>
            <Link
              href="#kadro"
              className="text-slate-700 hover:text-purple-600 font-bold text-sm transition-colors"
            >
              Eğitmenlerimiz
            </Link>
            <Link
              href="#iletisim"
              className="text-slate-700 hover:text-orange-600 font-bold text-sm transition-colors"
            >
              İletişim
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Veli Bilgilendirme Button */}
            <Link
              href="/veli"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200 hover:shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all active:scale-95"
            >
              <UserCircle className="w-4 h-4" />
              <span>Veli Portalı</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
              </span>
            </Link>

            {/* Quick Registration Button */}
            <Link
              href="#on-kayit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white text-sm font-extrabold shadow-md shadow-orange-200 hover:shadow-xl hover:scale-105 transition-all"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Ön Kayıt Ol</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/veli"
              className="p-2 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 text-xs font-bold flex items-center gap-1"
            >
              <UserCircle className="w-4 h-4" />
              <span className="text-xs">Veli</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors"
              aria-label="Menüyü Aç"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-amber-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            <Link
              href="/veli"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-3 bg-sky-500 text-white rounded-2xl font-bold text-sm shadow-sm"
            >
              <UserCircle className="w-4 h-4" />
              Veli Portalı
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded-2xl font-bold text-sm shadow-sm"
            >
              <Settings className="w-4 h-4" />
              Yönetim Paneli
            </Link>
          </div>

          <div className="flex flex-col space-y-2 border-t border-slate-100 pt-3">
            <Link
              href="#siniflar"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 font-semibold hover:bg-amber-50"
            >
              🎈 Sınıflarımız (1-6. Sınıflar)
            </Link>
            <Link
              href="#gunluk-akis"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 font-semibold hover:bg-pink-50"
            >
              ⏰ Günlük Akış & Program
            </Link>
            <Link
              href="#menu"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 font-semibold hover:bg-emerald-50"
            >
              🥣 Haftalık Organik Menü
            </Link>
            <Link
              href="#galeri"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 font-semibold hover:bg-sky-50"
            >
              📷 Fotoğraf & Video Galerisi
            </Link>
            <Link
              href="#kadro"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 font-semibold hover:bg-purple-50"
            >
              👩‍🏫 Uzman Eğitim Kadromuz
            </Link>
            <Link
              href="#iletisim"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 font-semibold hover:bg-orange-50"
            >
              📍 İletişim ve Konum
            </Link>
            <Link
              href="#on-kayit"
              onClick={() => setIsOpen(false)}
              className="mt-2 block text-center py-3 bg-gradient-to-r from-amber-400 to-pink-500 text-white rounded-2xl font-bold shadow-md"
            >
              ✨ Online Ön Kayıt Başvurusu
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
