"use client";

import React from "react";
import { GraduationCap, Heart, Award } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function TeachersSection() {
  const { classes } = useApp();

  const teacherAvatars: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80",
    4: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    5: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&auto=format&fit=crop&q=80",
    6: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  };

  return (
    <section id="kadro" className="py-20 bg-gradient-to-b from-white via-amber-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
            <span>Sevgi Dolu ve Alanında Uzman</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Eğitmen & Pedagog Kadromuz
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Her çocuğa bireysel sevgi, ilgi ve şefkat gösteren; çocuk psikolojisi ve erken çocukluk
            eğitiminde tecrübeli güçlü eğitim kadromuz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Teacher Image */}
              <div className="relative w-28 h-28 mb-4 rounded-3xl overflow-hidden border-4 border-amber-200 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={teacherAvatars[cls.id]}
                  alt={cls.teacher}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 p-1 bg-white rounded-full shadow-xs">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 mb-2">
                {cls.shortName} Sorumlusu
              </span>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                {cls.teacher}
              </h3>

              <p className="text-xs font-semibold text-slate-500 mt-1">
                {cls.teacherTitle}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 w-full text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-amber-600 font-bold">
                  <Award className="w-4 h-4" />
                  <span>Montessori & Gelişim Sertifikalı</span>
                </div>
                <p className="text-slate-500 italic mt-2">
                  "Her çocuğun kalbine dokunmak, dünyanın en güzel masalını yazmaktır."
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
