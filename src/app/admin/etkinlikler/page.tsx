"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Calendar, Plus, Trash2, Clock, CheckCircle2, X } from "lucide-react";
import { ClassActivity } from "@/types";

export default function AdminEtkinliklerPage() {
  const { classes, activities, addActivity, deleteActivity } = useApp();

  const [selectedClassId, setSelectedClassId] = useState<number | "all">("all");
  const [showModal, setShowModal] = useState(false);

  const [formState, setFormState] = useState({
    classId: 1,
    title: "",
    time: "10:00 - 11:00",
    date: "Bugün",
    category: "Sanat" as ClassActivity["category"],
    description: "",
    instructor: classes[0]?.teacher || "",
  });

  const filteredActivities = activities.filter((act) => {
    return selectedClassId === "all" || act.classId === selectedClassId;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title) {
      alert("Lütfen bir başlık giriniz.");
      return;
    }

    addActivity({
      classId: Number(formState.classId),
      title: formState.title,
      time: formState.time,
      date: formState.date,
      category: formState.category,
      description: formState.description,
      instructor: formState.instructor,
    });

    setFormState({
      classId: 1,
      title: "",
      time: "10:00 - 11:00",
      date: "Bugün",
      category: "Sanat",
      description: "",
      instructor: classes[0]?.teacher || "",
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-500" />
            <span>Sınıf Etkinlikleri Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            1'den 6'ya kadar tüm sınıfların günlük ve haftalık etkinlik programını yönetin.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-md hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Etkinlik Tanımla</span>
        </button>
      </div>

      {/* Class Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedClassId("all")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedClassId === "all"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Tüm Sınıflar ({activities.length})
        </button>

        {classes.map((cls) => {
          const count = activities.filter((a) => a.classId === cls.id).length;
          const isSelected = selectedClassId === cls.id;

          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-purple-50"
              }`}
            >
              <span>{cls.icon}</span>
              <span>{cls.shortName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-purple-800 text-white" : "bg-slate-100 text-slate-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((act) => {
          const actClass = classes.find((c) => c.id === act.classId);

          return (
            <div
              key={act.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800">
                    {act.category}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
                    {act.time}
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-900">{act.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {act.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="text-[11px] font-bold text-slate-400">
                    Sınıf: <strong className="text-slate-800">{actClass?.shortName}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500">Eğitmen: {act.instructor}</p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`"${act.title}" etkinliğini silmek istiyor musunuz?`)) {
                      deleteActivity(act.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Yeni Etkinlik */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">Yeni Sınıf Etkinliği Tanımla</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Sınıfın haftalık veya günlük programına yeni bir atölye ekleyin.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hedef Sınıf *</label>
                <select
                  value={formState.classId}
                  onChange={(e) => {
                    const cid = Number(e.target.value);
                    const matchedClass = classes.find((c) => c.id === cid);
                    setFormState({
                      ...formState,
                      classId: cid,
                      instructor: matchedClass?.teacher || formState.instructor,
                    });
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Etkinlik Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Seramik Çamuru ile Hayvan Figürleri"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori</label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        category: e.target.value as ClassActivity["category"],
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                  >
                    <option value="Sanat">Sanat</option>
                    <option value="Müzik">Müzik</option>
                    <option value="Oyun">Oyun</option>
                    <option value="Fen & Doğa">Fen & Doğa</option>
                    <option value="Dil">Dil</option>
                    <option value="Bilişsel & Kodlama">Bilişsel & Kodlama</option>
                    <option value="Beden & Jimnastik">Beden & Jimnastik</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Saat Aralığı</label>
                  <input
                    type="text"
                    value={formState.time}
                    onChange={(e) => setFormState({ ...formState, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Açıklama</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  placeholder="Kazanımlar, kullanılacak malzemeler vb."
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Eğitmen</label>
                <input
                  type="text"
                  value={formState.instructor}
                  onChange={(e) => setFormState({ ...formState, instructor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-purple-600 text-white text-xs font-black shadow-sm hover:bg-purple-700"
                >
                  Etkinliği Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
