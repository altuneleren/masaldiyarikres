"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Users,
  GraduationCap,
  Camera,
  ClipboardList,
  Smile,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { classes, students, media, applications } = useApp();

  const pendingApplications = applications.filter((a) => a.status === "beklemede");
  const totalPhotos = media.filter((m) => m.type === "image").length;
  const totalVideos = media.filter((m) => m.type === "video").length;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hoş Geldiniz, Yönetici!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Masal Diyarı Yönetim Paneli</h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl font-medium">
            1'den 6'ya kadar sınıflarınızı denetleyin, yeni fotoğraflar ve videolar yükleyin,
            öğrencilerin günlük yemek ve uyku durumlarını velilerle paylaşın.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/medya"
            className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Camera className="w-4 h-4 text-pink-500" />
            <span>Resim / Video Yükle</span>
          </Link>
          <Link
            href="/admin/gunluk-karne"
            className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Smile className="w-4 h-4 text-amber-400" />
            <span>Günlük Durum Gir</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kayıtlı Öğrenciler</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{students.length}</p>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1">6 Sınıfa Dağıtılmış</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktif Sınıflar</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{classes.length}</p>
            <p className="text-[11px] font-semibold text-slate-500 mt-1">1 - 6. Yaş Grupları</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medya (Foto / Video)</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{media.length}</p>
            <p className="text-[11px] font-semibold text-pink-600 mt-1">
              {totalPhotos} Fotoğraf • {totalVideos} Video
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bekleyen Ön Kayıt</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{pendingApplications.length}</p>
            <p className="text-[11px] font-semibold text-orange-600 mt-1">Geri Dönüş Bekliyor</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <ClipboardList className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 1 - 6 Sınıflar Hızlı Yönetim Kartları */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">1 - 6. Sınıflarımız ve Doluluk Durumu</h2>
          <Link
            href="/admin/siniflar"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <span>Tüm Sınıfları Yönet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const classStudents = students.filter((s) => s.classId === cls.id);
            const percentage = Math.round((classStudents.length / cls.capacity) * 100);

            return (
              <div
                key={cls.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 bg-slate-50 rounded-xl">{cls.icon}</span>
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      {cls.ageGroup}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">{cls.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Öğretmen: <strong>{cls.teacher}</strong>
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Mevcut Öğrenci: {classStudents.length}</span>
                      <span>Kapasite: {cls.capacity}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/admin/siniflar?classId=${cls.id}`}
                    className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold text-center transition-colors"
                  >
                    Öğrenci Listesi ({classStudents.length})
                  </Link>
                  <Link
                    href={`/admin/gunluk-karne?classId=${cls.id}`}
                    className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold text-center transition-colors"
                  >
                    Karne Girişi
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns: Son Başvurular & Son Medyalar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Son Gelen Ön Kayıt Başvuruları */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-orange-500" />
              <span>Son Ön Kayıt Başvuruları</span>
            </h3>
            <Link href="/admin/basvurular" className="text-xs font-bold text-orange-600 hover:underline">
              Tümünü Gör
            </Link>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => {
              const targetClass = classes.find((c) => c.id === app.preferredClassId);

              return (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{app.childName}</span>
                      <span className="text-[11px] font-bold text-slate-500">({app.childAge})</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Veli: {app.parentName} • <span className="font-semibold">{app.parentPhone}</span>
                    </p>
                    <p className="text-[11px] text-amber-700 font-semibold">
                      İstenen Sınıf: {targetClass?.shortName || "Belirtilmedi"}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 ${
                      app.status === "beklemede"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {app.status === "beklemede" ? "Bekliyor" : "İşlem Yapıldı"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Son Yüklenen Fotoğraf ve Videolar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-pink-500" />
              <span>Son Yüklenen Medyalar</span>
            </h3>
            <Link href="/admin/medya" className="text-xs font-bold text-pink-600 hover:underline">
              Medya Yöneticisi
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {media.slice(0, 6).map((m) => (
              <div
                key={m.id}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group"
              >
                <img
                  src={m.thumbnailUrl || m.url}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-1.5 left-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-black/60 text-white">
                    {m.type === "video" ? "Video" : "Foto"}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent text-[10px] text-white font-bold truncate">
                  {m.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
