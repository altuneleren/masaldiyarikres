"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Clock, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer id="iletisim" className="bg-slate-900 text-slate-300 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-400 to-purple-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white">Masal Diyarı Kreş</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              1'den 6'ya kadar yaş gruplarına özel sınıflar, organik beslenme ve güven dolu eğitim ortamıyla miniklerin masalsı dünyası.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>T.C. M.E.B. Ruhsatlı Özel Eğitim Kurumu</span>
            </div>
          </div>

          {/* Col 2: Sınıflar Hızlı Erişim */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-base">Sınıflarımız (1-6)</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#siniflar" className="hover:text-amber-400 transition-colors">
                  1. Sınıf: Minik Tırtıllar (1-2 Yaş)
                </Link>
              </li>
              <li>
                <Link href="#siniflar" className="hover:text-pink-400 transition-colors">
                  2. Sınıf: Sevimli Kelebekler (2-3 Yaş)
                </Link>
              </li>
              <li>
                <Link href="#siniflar" className="hover:text-emerald-400 transition-colors">
                  3. Sınıf: Neşeli Sincaplar (3-4 Yaş)
                </Link>
              </li>
              <li>
                <Link href="#siniflar" className="hover:text-sky-400 transition-colors">
                  4. Sınıf: Minik Mucitler (4-5 Yaş)
                </Link>
              </li>
              <li>
                <Link href="#siniflar" className="hover:text-purple-400 transition-colors">
                  5. Sınıf: Masal Kahramanları (5-6 Yaş)
                </Link>
              </li>
              <li>
                <Link href="#siniflar" className="hover:text-orange-400 transition-colors">
                  6. Sınıf: Geleceğin Yıldızları (6 Yaş)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hızlı Bağlantılar */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-base">Portallar ve Bilgiler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/veli" className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1">
                  <span>👉 Veli Bilgilendirme Portalı</span>
                </Link>
              </li>
              <li>
                <Link href="/ogretmen" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1">
                  <span>👩‍🏫 Öğretmen Portalı</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                  <span>🔐 Yönetici (Admin) Paneli</span>
                </Link>
              </li>
              <li>
                <Link href="#menu" className="hover:text-emerald-400 transition-colors">
                  Haftalık Yemek Listesi
                </Link>
              </li>
              <li>
                <Link href="#galeri" className="hover:text-amber-400 transition-colors">
                  Fotoğraf & Video Galerisi
                </Link>
              </li>
              <li>
                <Link href="#gunluk-akis" className="hover:text-amber-400 transition-colors">
                  Günlük Kreş Akışı
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: İletişim */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-base">İletişim & Ziyaret</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x40876f4603e8cdaf:0x7891a2fe6cb73672?sa=X&ved=1t:8290&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors leading-relaxed block group"
                  title="Google Haritalar'da Aç ve Yol Tarifi Al"
                >
                  <span className="group-hover:underline">
                    55evler mahallesi Hilmi, Ellibeşevler, Cevdet Topçu Sk. 19/A, 05100 Amasya Merkez/Amasya
                  </span>
                  <span className="block text-[11px] text-amber-400 font-bold mt-1">
                    📍 Google Haritalar&apos;da Aç & Yol Tarifi Al ↗
                  </span>
                </a>
              </div>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>0 (212) 555 12 34 / 0 (532) 999 88 77</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <span>bilgi@masaldiyarikres.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Pzt - Cuma: 07:30 - 18:30</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          {/* Left: Copyright */}
          <p className="order-2 md:order-1 md:flex-1 text-center md:text-left">
            © {new Date().getFullYear()} Masal Diyarı Kreş ve Gündüz Bakımevi. Tüm Hakları Saklıdır.
          </p>

          {/* Center: Sevgiyle Tasarlandı */}
          <div className="order-1 md:order-2 flex items-center justify-center gap-1.5 text-slate-400 font-medium px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 shadow-xs">
            <span>Sevgiyle tasarlandı</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>

          {/* Right: Admin Link */}
          <div className="order-3 md:order-3 md:flex-1 flex items-center justify-center md:justify-end gap-3">
            <Link href="/admin" className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors">
              Admin Girişi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
