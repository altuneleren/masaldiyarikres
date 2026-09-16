"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Sparkles, Users, User, MapPin, CheckCircle2, ChevronRight, X, Calendar } from "lucide-react";
import { ClassGroup } from "@/types";

export default function ClassesSection() {
  const { classes, activities, students } = useApp();
  const [selectedClass, setSelectedClass] = useState<ClassGroup | null>(null);

  return (
    <section id="siniflar" className="py-20 bg-gradient-to-b from-white via-amber-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Gelişim Dönemlerine Özel 6 Ayrı Sınıf</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Masal Diyarı Sınıflarımız (1 - 6)
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Her yaş grubunun pedagojik ihtiyaçları, motor becerileri ve merak alanları farklıdır.
            1 yaşından 6 yaşına kadar uzman eğitmenler eşliğinde tasarlanmış butik sınıflarımızı keşfedin.
          </p>
        </div>

        {/* Classes Grid 1 to 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => {
            const classStudents = students.filter((s) => s.classId === cls.id);

            return (
              <div
                key={cls.id}
                className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-slate-100 hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Class Top Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-3xl p-2.5 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {cls.icon}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                      {cls.ageGroup}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {cls.name}
                  </h3>

                  <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cls.room}</span>
                  </p>

                  <p className="text-sm text-slate-600 font-medium mt-3 leading-relaxed">
                    {cls.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Öne Çıkan Atölyeler:
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {cls.scheduleHighlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Info */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-bold text-slate-800">{cls.teacher}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users className="w-3.5 h-3.5 text-sky-500" />
                      <span>{classStudents.length} / {cls.capacity} Öğrenci</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedClass(cls)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-amber-500 hover:text-white text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors group/btn"
                  >
                    <span>Sınıf Programı & Etkinlikleri İncele</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedClass(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl p-3 bg-amber-50 rounded-2xl">
                {selectedClass.icon}
              </span>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                  {selectedClass.ageGroup}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedClass.name}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedClass.description}
            </p>

            {/* Teacher Details */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-800 font-bold uppercase">Sınıf Sorumlu Öğretmeni</p>
                <p className="text-base font-extrabold text-slate-900">{selectedClass.teacher}</p>
                <p className="text-xs text-slate-600">{selectedClass.teacherTitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase">Mekan</p>
                <p className="text-sm font-bold text-slate-800">{selectedClass.room}</p>
              </div>
            </div>

            {/* Sample Class Activities */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Bu Sınıfın Örnek Günlük Etkinlikleri</span>
              </h4>
              <div className="space-y-2">
                {activities
                  .filter((a) => a.classId === selectedClass.id)
                  .map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-extrabold">
                            {act.category}
                          </span>
                          <span className="font-bold text-sm text-slate-800">{act.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{act.description}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-600 shrink-0 bg-white px-2 py-1 rounded-md border border-amber-100 shadow-sm">
                        {act.time}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href="#on-kayit"
                onClick={() => setSelectedClass(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-sm text-center shadow-md hover:opacity-95"
              >
                Bu Sınıf İçin Ön Kayıt Başvurusu Yap
              </a>
              <button
                onClick={() => setSelectedClass(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
