"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { ACADEMIC_MONTHS } from "@/lib/initialData";
import { DuePaymentStatus, MonthlyDue } from "@/types";
import {
  Receipt,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Building2,
  Printer,
  Check,
  X,
} from "lucide-react";

export default function AdminMuhasebePage() {
  const { classes, students, monthlyDues, updateDueStatus } = useApp();

  // Filters
  const [selectedClassId, setSelectedClassId] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<DuePaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [editingDue, setEditingDue] = useState<MonthlyDue | null>(null);
  const [formStatus, setFormStatus] = useState<DuePaymentStatus>("odendi");
  const [formMethod, setFormMethod] = useState<"Havale / EFT" | "Kredi Kartı" | "Nakit">("Havale / EFT");
  const [formDate, setFormDate] = useState("");
  const [formReceipt, setFormReceipt] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formAmount, setFormAmount] = useState<number>(12500);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (selectedClassId !== "all" && s.classId !== selectedClassId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${s.name} ${s.surname}`.toLowerCase();
        const code = (s.studentCode || "").toLowerCase();
        if (!fullName.includes(q) && !code.includes(q)) return false;
      }
      if (statusFilter !== "all") {
        const studentDues = monthlyDues.filter((d) => d.studentId === s.id);
        const hasStatus = studentDues.some((d) => d.status === statusFilter);
        if (!hasStatus) return false;
      }
      return true;
    });
  }, [students, selectedClassId, searchQuery, statusFilter, monthlyDues]);

  // Overall Financial KPIs
  const kpis = useMemo(() => {
    const totalExpected = monthlyDues.reduce((acc, d) => acc + d.amount, 0);
    const paidDues = monthlyDues.filter((d) => d.status === "odendi");
    const totalCollected = paidDues.reduce((acc, d) => acc + d.amount, 0);
    const pendingDues = monthlyDues.filter((d) => d.status === "beklemede");
    const totalPending = pendingDues.reduce((acc, d) => acc + d.amount, 0);
    const unpaidDues = monthlyDues.filter((d) => d.status === "odenmedi");
    const totalUnpaid = unpaidDues.reduce((acc, d) => acc + d.amount, 0);
    const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

    return {
      totalExpected,
      totalCollected,
      totalPending,
      totalUnpaid,
      collectionRate,
      paidCount: paidDues.length,
      pendingCount: pendingDues.length,
      unpaidCount: unpaidDues.length,
    };
  }, [monthlyDues]);

  // Handle open edit modal
  const handleOpenEdit = (due: MonthlyDue) => {
    setEditingDue(due);
    setFormStatus(due.status);
    setFormMethod(due.paymentMethod || "Havale / EFT");
    setFormDate(due.paidDate || new Date().toISOString().split("T")[0]);
    setFormReceipt(due.receiptNo || `MAK-2026-${due.monthIndex < 10 ? "0" + due.monthIndex : due.monthIndex}-${due.studentId.replace("stu-", "")}`);
    setFormNotes(due.notes || "");
    setFormAmount(due.amount || 12500);
  };

  // Handle save modal
  const handleSaveDue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDue) return;

    updateDueStatus(editingDue.id, formStatus, {
      paidDate: formStatus === "odendi" ? formDate : undefined,
      paymentMethod: formStatus === "odendi" ? formMethod : undefined,
      receiptNo: formStatus === "odendi" ? formReceipt : undefined,
      notes: formNotes,
      amount: Number(formAmount),
    });

    const student = students.find((s) => s.id === editingDue.studentId);
    const studentName = student ? `${student.name} ${student.surname}` : "Öğrenci";
    showToast(`✓ ${studentName} - ${editingDue.month} aidat durumu "${formStatus.toUpperCase()}" olarak güncellendi!`);
    setEditingDue(null);
  };

  // Quick toggle status directly
  const handleQuickToggle = (due: MonthlyDue, e: React.MouseEvent) => {
    e.stopPropagation();
    let nextStatus: DuePaymentStatus = "odendi";
    if (due.status === "odendi") nextStatus = "odenmedi";
    else if (due.status === "odenmedi") nextStatus = "beklemede";
    else nextStatus = "odendi";

    const student = students.find((s) => s.id === due.studentId);
    const studentName = student ? `${student.name} ${student.surname}` : "Öğrenci";

    updateDueStatus(due.id, nextStatus, {
      paidDate: nextStatus === "odendi" ? new Date().toISOString().split("T")[0] : undefined,
      paymentMethod: nextStatus === "odendi" ? "Havale / EFT" : undefined,
      receiptNo: nextStatus === "odendi" ? `MAK-2026-0${due.monthIndex}-${due.studentId.replace("stu-", "")}` : undefined,
      notes: nextStatus === "odendi" ? "Hızlı onaylandı" : nextStatus === "beklemede" ? "Dekont bekleniyor" : "Ödenmedi",
    });

    showToast(`✓ ${studentName} (${due.month}): Durum "${nextStatus.toUpperCase()}" yapıldı.`);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-slate-900 border-2 border-emerald-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <p className="text-xs font-black text-emerald-400">Muhasebe Kaydı Güncellendi</p>
              <p className="text-xs font-semibold text-slate-200">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 md:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide">
            <Receipt className="w-4 h-4 text-emerald-300" />
            <span>Yalnızca Yönetici Yetkisi</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Muhasebe & Aidat Takip Sistemi
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-2xl font-medium">
            1-6. Sınıf tüm öğrencilerimizin 10 aylık (Eylül 2026 - Haziran 2027) kreş aidat
            ödemelerini ay ay görüntüleyin, tahsilatları onaylayın ve veli portalına otomatik yansıtın.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-bold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / Çıktı Al</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Toplam Beklenen */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Yıllık Beklenen Aidat
            </span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-900">
              {kpis.totalExpected.toLocaleString("tr-TR")} ₺
            </p>
            <p className="text-[11px] font-medium text-slate-500 mt-1">
              {students.length} Öğrenci × 10 Eğitim Ayı (12.500 ₺)
            </p>
          </div>
        </div>

        {/* Tahsil Edilen */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Toplam Tahsil Edilen
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-emerald-700">
              {kpis.totalCollected.toLocaleString("tr-TR")} ₺
            </p>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{kpis.paidCount} ay aidatı ödendi (%{kpis.collectionRate})</span>
            </p>
          </div>
        </div>

        {/* Beklemede / Dekont Kontrol */}
        <div className="bg-white p-5 rounded-3xl border border-amber-200 bg-amber-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Bekleyen / Onay Bekleyen
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-amber-700">
              {kpis.totalPending.toLocaleString("tr-TR")} ₺
            </p>
            <p className="text-[11px] font-semibold text-amber-600 mt-1">
              {kpis.pendingCount} adet havale dekontu incelemede
            </p>
          </div>
        </div>

        {/* Kalan Tahsilat Borcu */}
        <div className="bg-white p-5 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Kalan Alacak / Ödenmeyen
            </span>
            <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-rose-700">
              {kpis.totalUnpaid.toLocaleString("tr-TR")} ₺
            </p>
            <p className="text-[11px] font-semibold text-rose-600 mt-1">
              {kpis.unpaidCount} ay aidatı henüz ödenmedi
            </p>
          </div>
        </div>
      </div>

      {/* Official Nursery Bank & IBAN Info Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Kreş Resmi Banka & Havale / EFT Hesabı
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              Alıcı: <strong className="text-slate-900">Masal Diyarı Eğitim ve Kreş Hizmetleri Ltd. Şti.</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block">ZİRAAT BANKASI</span>
            <span className="font-mono font-bold text-slate-800">TR12 0001 0090 1023 4567 8901 01</span>
          </div>
          <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold block">GARANTİ BBVA</span>
            <span className="font-mono font-bold text-slate-800">TR89 0006 2000 1234 5678 9012 34</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Class Filter */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Sınıf:</span>
            <select
              value={selectedClassId}
              onChange={(e) =>
                setSelectedClassId(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="bg-transparent font-black text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Tüm Sınıflar (1-6)</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id}. Sınıf - {c.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
            <span>Durum:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DuePaymentStatus | "all")}
              className="bg-transparent font-black text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Tüm Ödemeler</option>
              <option value="odendi">✓ Sadece Ödenenler</option>
              <option value="beklemede">⏳ Beklemede Olanlar</option>
              <option value="odenmedi">✕ Ödenmeyen / Borçlular</option>
            </select>
          </div>
        </div>

        {/* Student Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Öğrenci adı, soyadı veya MD kodu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Legend / Info Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
        <div className="flex items-center gap-4 flex-wrap font-medium">
          <span className="font-bold text-slate-800">Durum Göstergeleri:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <strong>Ödendi</strong> (Velinin sisteminde yeşil makbuzlu görünür)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <strong>Beklemede</strong> (Dekont / onay bekleniyor)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <strong>Ödenmedi</strong> (Tahsil edilmedi)
          </span>
        </div>
        <p className="text-[11px] text-emerald-800 font-semibold mt-1 sm:mt-0">
          💡 İpucu: Hücreye tıklayarak detaylı makbuz düzenleyebilir veya hızlıca durumu değiştirebilirsiniz.
        </p>
      </div>

      {/* Main Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-3.5 sticky left-0 z-20 bg-slate-900 min-w-[200px]">
                  Öğrenci & Sınıf Bilgisi
                </th>
                {ACADEMIC_MONTHS.map((month) => (
                  <th key={month} className="p-3 text-center min-w-[95px] whitespace-nowrap text-[11px]">
                    {month.split(" ")[0]}
                    <span className="block text-[9px] text-slate-400 font-normal">
                      {month.split(" ")[1]}
                    </span>
                  </th>
                ))}
                <th className="p-3.5 text-center min-w-[110px] sticky right-0 z-20 bg-slate-900">
                  Toplam Ödenen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={12} className="p-10 text-center text-slate-500">
                    Arama kriterlerinize uygun öğrenci bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const studentClass = classes.find((c) => c.id === student.classId);
                  const studentDues = monthlyDues
                    .filter((d) => d.studentId === student.id)
                    .sort((a, b) => a.monthIndex - b.monthIndex);

                  const paidAmount = studentDues
                    .filter((d) => d.status === "odendi")
                    .reduce((sum, d) => sum + d.amount, 0);

                  const totalStudentDue = studentDues.reduce((sum, d) => sum + d.amount, 0);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Student Info (Sticky Left) */}
                      <td className="p-3 sticky left-0 z-10 bg-white shadow-sm border-r border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate">
                              {student.name} {student.surname}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <span className="font-mono font-bold text-amber-600">
                                {student.studentCode}
                              </span>
                              <span>•</span>
                              <span>{studentClass?.shortName}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 10 Month Cells */}
                      {studentDues.map((due) => {
                        let badgeClass = "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
                        let label = "✕ Ödenmedi";
                        let icon = <X className="w-3 h-3 text-rose-500 shrink-0" />;

                        if (due.status === "odendi") {
                          badgeClass = "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 font-black";
                          label = "✓ Ödendi";
                          icon = <Check className="w-3 h-3 text-emerald-600 shrink-0" />;
                        } else if (due.status === "beklemede") {
                          badgeClass = "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 font-bold";
                          label = "⏳ Bekliyor";
                          icon = <Clock className="w-3 h-3 text-amber-600 shrink-0" />;
                        }

                        return (
                          <td key={due.id} className="p-2 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <button
                                onClick={() => handleOpenEdit(due)}
                                title={`${student.name} ${student.surname} - ${due.month} (Detay ve Düzenle)`}
                                className={`w-full py-1.5 px-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition-all shadow-xs ${badgeClass}`}
                              >
                                {icon}
                                <span className="truncate">{label}</span>
                              </button>

                              {/* Quick Toggle Button */}
                              <button
                                onClick={(e) => handleQuickToggle(due, e)}
                                title="Durumu Hızlı Değiştir"
                                className="text-[9px] text-slate-400 hover:text-slate-700 underline tracking-tight"
                              >
                                Durum Çevir
                              </button>
                            </div>
                          </td>
                        );
                      })}

                      {/* Summary (Sticky Right) */}
                      <td className="p-3 text-center sticky right-0 z-10 bg-white shadow-sm border-l border-slate-100">
                        <div className="flex flex-col items-center">
                          <span className="font-black text-slate-900 text-xs">
                            {paidAmount.toLocaleString("tr-TR")} ₺
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            / {totalStudentDue.toLocaleString("tr-TR")} ₺
                          </span>
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${(paidAmount / totalStudentDue) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Payment Modal */}
      {editingDue && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-100 space-y-5 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  Aidat Tahsilat & Makbuz İşlemi
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {students.find((s) => s.id === editingDue.studentId)?.name}{" "}
                  {students.find((s) => s.id === editingDue.studentId)?.surname} - {editingDue.month}
                </h3>
              </div>
              <button
                onClick={() => setEditingDue(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveDue} className="space-y-4 text-xs font-medium">
              {/* Payment Status */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Aidat Ödeme Durumu *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormStatus("odendi")}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      formStatus === "odendi"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Ödendi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormStatus("beklemede")}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      formStatus === "beklemede"
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Beklemede</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormStatus("odenmedi")}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      formStatus === "odenmedi"
                        ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>Ödenmedi</span>
                  </button>
                </div>
              </div>

              {/* Amount & Method */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Aidat Tutarı (TL)
                  </label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Ödeme Kanalı / Yöntemi
                  </label>
                  <select
                    value={formMethod}
                    onChange={(e) =>
                      setFormMethod(e.target.value as "Havale / EFT" | "Kredi Kartı" | "Nakit")
                    }
                    disabled={formStatus !== "odendi"}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                  >
                    <option value="Havale / EFT">Havale / EFT (Banka)</option>
                    <option value="Kredi Kartı">Kredi Kartı / POS</option>
                    <option value="Nakit">Nakit / Elden</option>
                  </select>
                </div>
              </div>

              {/* Date & Receipt */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Tahsilat Tarihi
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    disabled={formStatus !== "odendi"}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Makbuz / Dekont No
                  </label>
                  <input
                    type="text"
                    value={formReceipt}
                    onChange={(e) => setFormReceipt(e.target.value)}
                    disabled={formStatus !== "odendi"}
                    placeholder="MAK-2026-..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Muhasebe Notu / Veli Açıklaması
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Örn: Garanti hesabımıza gönderilen havale onaylandı."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingDue(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black shadow-md hover:scale-105 transition-all"
                >
                  Kaydet ve Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
