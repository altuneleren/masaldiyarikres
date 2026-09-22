"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  ClipboardList,
  Phone,
  Mail,
  Calendar,
  Baby,
  Trash2,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";
import { RegistrationApplication } from "@/types";

export default function AdminBasvurularPage() {
  const { applications, classes, updateApplicationStatus, deleteApplication } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = applications.filter((app) => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" ||
      app.childName.toLowerCase().includes(q) ||
      app.parentName.toLowerCase().includes(q) ||
      app.parentPhone.includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-orange-500" />
            <span>Online Ön Kayıt Başvuruları</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Tanıtım sayfasından velilerin gönderdiği kayıt taleplerini inceleyin ve durumunu güncelleyin.
          </p>
        </div>

        <span className="text-xs font-black bg-amber-100 text-amber-800 px-4 py-2 rounded-2xl self-start sm:self-auto border border-amber-200">
          Toplam: {applications.length} Başvuru
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none whitespace-nowrap">
          {["all", "beklemede", "arandi", "onaylandi", "reddedildi"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap capitalize ${
                filterStatus === st
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "all" ? "Tümü" : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="İsim veya telefon ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
          />
        </div>
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
          <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500">Bu kritere uygun başvuru bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((app) => {
            const preferredClass = classes.find((c) => c.id === app.preferredClassId);

            return (
              <div
                key={app.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{app.createdAt}</span>
                    </span>

                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateApplicationStatus(app.id, e.target.value as RegistrationApplication["status"])
                      }
                      className={`px-3 py-1 rounded-full text-xs font-black border ${
                        app.status === "beklemede"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : app.status === "arandi"
                          ? "bg-sky-100 text-sky-800 border-sky-300"
                          : app.status === "onaylandi"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-rose-100 text-rose-800 border-rose-300"
                      }`}
                    >
                      <option value="beklemede">Beklemede ⏳</option>
                      <option value="arandi">Veli Arandı 📞</option>
                      <option value="onaylandi">Kayıt Onaylandı ✅</option>
                      <option value="reddedildi">İptal Edildi ❌</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Baby className="w-5 h-5 text-pink-500" />
                      <h3 className="text-lg font-black text-slate-900">{app.childName}</h3>
                      <span className="text-xs font-bold text-slate-500">({app.childAge})</span>
                    </div>

                    <p className="text-xs text-amber-800 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                      Tercih Edilen Sınıf: <strong>{preferredClass?.name}</strong>
                    </p>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
                      <p>
                        Veli: <strong>{app.parentName}</strong>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <a href={`tel:${app.parentPhone}`} className="hover:underline font-bold text-slate-900">
                          {app.parentPhone}
                        </a>
                      </p>
                      {app.parentEmail && app.parentEmail !== "-" && (
                        <p className="flex items-center gap-1.5 text-slate-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{app.parentEmail}</span>
                        </p>
                      )}
                      {app.notes && (
                        <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                          Not: "{app.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${app.parentPhone}`}
                    className="py-2 px-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Veliyi Ara</span>
                  </a>

                  <button
                    onClick={() => {
                      if (confirm(`${app.childName} başvurusunu silmek istiyor musunuz?`)) {
                        deleteApplication(app.id);
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
      )}
    </div>
  );
}
