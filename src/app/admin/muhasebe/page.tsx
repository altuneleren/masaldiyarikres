"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import {
  ACADEMIC_MONTHS,
  DEFAULT_ACADEMIC_YEAR,
  AVAILABLE_ACADEMIC_YEARS,
  getAcademicMonthsForYear,
  SAMPLE_RECEIPT_PRESETS,
} from "@/lib/initialData";
import {
  DuePaymentStatus,
  MonthlyDue,
  TeacherSalary,
  SalaryPaymentStatus,
  KindergartenExpense,
  ExpenseCategory,
} from "@/types";
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
  GraduationCap,
  Briefcase,
  ShoppingCart,
  Plus,
  Eye,
  Trash2,
  Edit3,
  Camera,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  PieChart,
  Wallet,
} from "lucide-react";

const CATEGORY_MAP: Record<
  ExpenseCategory,
  { label: string; icon: string; badge: string; color: string }
> = {
  market_gida: {
    label: "Market, Mutfak & Gıda",
    icon: "🛒",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    color: "#10B981",
  },
  kirtasiye_egitim: {
    label: "Kırtasiye, Sanat & Eğitim",
    icon: "🎨",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    color: "#8B5CF6",
  },
  temizlik_hijyen: {
    label: "Temizlik & Hijyen",
    icon: "🧼",
    badge: "bg-sky-100 text-sky-800 border-sky-200",
    color: "#0EA5E9",
  },
  faturalar: {
    label: "Elektrik, Su & Doğalgaz",
    icon: "⚡",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    color: "#F59E0B",
  },
  kira_aidat: {
    label: "Kira & Tesis Aidatı",
    icon: "🏢",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    color: "#6366F1",
  },
  bakim_onanim: {
    label: "Bakım, Onarım & Bahçe",
    icon: "🛠️",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    color: "#F97316",
  },
  ulasim_servis: {
    label: "Servis Yakıt & Araç Bakım",
    icon: "🚌",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    color: "#3B82F6",
  },
  diger: {
    label: "Diğer İşletme Harcaması",
    icon: "📌",
    badge: "bg-slate-100 text-slate-800 border-slate-200",
    color: "#64748B",
  },
};

export default function AdminMuhasebePage() {
  const {
    classes,
    students,
    teachers,
    monthlyDues,
    updateDueStatus,
    teacherSalaries,
    updateSalaryStatus,
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    selectedAcademicYear,
    setSelectedAcademicYear,
    availableAcademicYears,
    addNewAcademicYear,
    ensureRecordsForAcademicYear,
  } = useApp();

  // Active Main Accounting Tab
  const [accountingTab, setAccountingTab] = useState<"ozet" | "giderler" | "aidat" | "maas">("ozet");

  // New Academic Year Modal State
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [newYearInput, setNewYearInput] = useState("");

  // Student Dues Filters
  const [selectedClassId, setSelectedClassId] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<DuePaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Student Dues Modal State
  const [editingDue, setEditingDue] = useState<MonthlyDue | null>(null);
  const [formStatus, setFormStatus] = useState<DuePaymentStatus>("odendi");
  const [formMethod, setFormMethod] = useState<"Havale / EFT" | "Kredi Kartı" | "Nakit">("Havale / EFT");
  const [formDate, setFormDate] = useState("");
  const [formReceipt, setFormReceipt] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formAmount, setFormAmount] = useState<number>(12500);

  // Teacher Salary Filters
  const [salaryTeacherFilter, setSalaryTeacherFilter] = useState<string | "all">("all");
  const [salaryStatusFilter, setSalaryStatusFilter] = useState<SalaryPaymentStatus | "all">("all");
  const [salarySearch, setSalarySearch] = useState("");

  // Teacher Salary Modal State
  const [editingSalary, setEditingSalary] = useState<TeacherSalary | null>(null);
  const [salFormStatus, setSalFormStatus] = useState<SalaryPaymentStatus>("odendi");
  const [salFormAmount, setSalFormAmount] = useState<number>(42500);
  const [salFormBonus, setSalFormBonus] = useState<number>(0);
  const [salFormDeduction, setSalFormDeduction] = useState<number>(0);
  const [salFormPaidDate, setSalFormPaidDate] = useState("");
  const [salFormMethod, setSalFormMethod] = useState<"Banka Transferi / EFT" | "Nakit">("Banka Transferi / EFT");
  const [salFormDekont, setSalFormDekont] = useState("");
  const [salFormNotes, setSalFormNotes] = useState("");

  // Kindergarten Expense Filters
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState<ExpenseCategory | "all">("all");
  const [expenseMonthFilter, setExpenseMonthFilter] = useState<string | "all">("all");
  const [expenseSearch, setExpenseSearch] = useState("");

  // Kindergarten Expense Modal State (null = closed, "new" = add, KindergartenExpense = edit)
  const [editingExpense, setEditingExpense] = useState<KindergartenExpense | "new" | null>(null);
  const [expTitle, setExpTitle] = useState("");
  const [expCategory, setExpCategory] = useState<ExpenseCategory>("market_gida");
  const [expAmount, setExpAmount] = useState<number>(2500);
  const [expDate, setExpDate] = useState("2026-09-15");
  const [expMonth, setExpMonth] = useState("Eylül 2026");
  const [expPaymentMethod, setExpPaymentMethod] = useState<
    "Kurumsal Kredi Kartı" | "Nakit / Kasa" | "Banka Havalesi / EFT"
  >("Kurumsal Kredi Kartı");
  const [expSupplier, setExpSupplier] = useState("");
  const [expReceiptNo, setExpReceiptNo] = useState("");
  const [expRecordedBy, setExpRecordedBy] = useState("Zehra Yılmaz (Müdür)");
  const [expNotes, setExpNotes] = useState("");
  const [expReceiptImage, setExpReceiptImage] = useState<string>("");

  // Viewing Receipt Lightbox Modal
  const [viewingReceiptExpense, setViewingReceiptExpense] = useState<KindergartenExpense | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Dynamic Academic Months for Selected Year
  const currentAcademicMonths = useMemo(
    () => getAcademicMonthsForYear(selectedAcademicYear),
    [selectedAcademicYear]
  );

  // STRICT ACADEMIC YEAR ISOLATION: Filter records strictly by selectedAcademicYear
  const yearDues = useMemo(
    () => monthlyDues.filter((d) => (d.academicYear || "2026-2027") === selectedAcademicYear),
    [monthlyDues, selectedAcademicYear]
  );

  const yearSalaries = useMemo(
    () => teacherSalaries.filter((s) => (s.academicYear || "2026-2027") === selectedAcademicYear),
    [teacherSalaries, selectedAcademicYear]
  );

  const yearExpenses = useMemo(
    () => expenses.filter((e) => (e.academicYear || "2026-2027") === selectedAcademicYear),
    [expenses, selectedAcademicYear]
  );

  // Academic Year Switch Handlers
  const handleYearChange = (year: string) => {
    ensureRecordsForAcademicYear(year);
    setSelectedAcademicYear(year);
    showToast(`✓ ${year} Eğitim Öğretim Yılına geçildi. Geçmiş kayıtlar eksiksiz korunmaktadır.`);
  };

  const handleCreateNewYear = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newYearInput.trim();
    if (!clean || !clean.includes("-")) {
      showToast("Lütfen '2031-2032' formatında geçerli bir akademik yıl giriniz.");
      return;
    }
    addNewAcademicYear(clean);
    setShowAddYearModal(false);
    setNewYearInput("");
    showToast(`✓ ${clean} Eğitim Öğretim Yılı başarıyla tanımlandı ve seçildi!`);
  };

  // Filtered Students (uses yearDues for current year)
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
        const studentDues = yearDues.filter((d) => d.studentId === s.id);
        const hasStatus = studentDues.some((d) => d.status === statusFilter);
        if (!hasStatus) return false;
      }
      return true;
    });
  }, [students, selectedClassId, searchQuery, statusFilter, yearDues]);

  // Overall Student Dues KPIs (for selected year)
  const kpis = useMemo(() => {
    const totalExpected = yearDues.reduce((acc, d) => acc + d.amount, 0);
    const paidDues = yearDues.filter((d) => d.status === "odendi");
    const totalCollected = paidDues.reduce((acc, d) => acc + d.amount, 0);
    const pendingDues = yearDues.filter((d) => d.status === "beklemede");
    const totalPending = pendingDues.reduce((acc, d) => acc + d.amount, 0);
    const unpaidDues = yearDues.filter((d) => d.status === "odenmedi");
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
  }, [yearDues]);

  // Filtered Teachers for Salary Table (for selected year)
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      if (salaryTeacherFilter !== "all" && t.id !== salaryTeacherFilter) return false;
      if (salarySearch.trim()) {
        const q = salarySearch.toLowerCase();
        const matchName = t.name.toLowerCase().includes(q);
        const matchTitle = t.title.toLowerCase().includes(q);
        if (!matchName && !matchTitle) return false;
      }
      if (salaryStatusFilter !== "all") {
        const tSals = yearSalaries.filter((s) => s.teacherId === t.id);
        const hasStatus = tSals.some((s) => s.status === salaryStatusFilter);
        if (!hasStatus) return false;
      }
      return true;
    });
  }, [teachers, salaryTeacherFilter, salarySearch, salaryStatusFilter, yearSalaries]);

  // Overall Teacher Salary KPIs (for selected year)
  const salaryKpis = useMemo(() => {
    const totalBudget = yearSalaries.reduce((acc, s) => acc + s.netTotal, 0);
    const paidList = yearSalaries.filter((s) => s.status === "odendi");
    const totalPaid = paidList.reduce((acc, s) => acc + s.netTotal, 0);
    const unpaidList = yearSalaries.filter((s) => s.status === "odenmedi");
    const totalUnpaid = unpaidList.reduce((acc, s) => acc + s.netTotal, 0);
    const payRate = totalBudget > 0 ? Math.round((totalPaid / totalBudget) * 100) : 0;
    const avgSalary = teachers.length > 0 ? Math.round(totalBudget / (teachers.length * 10)) : 0;

    return {
      totalBudget,
      totalPaid,
      totalUnpaid,
      payRate,
      paidCount: paidList.length,
      unpaidCount: unpaidList.length,
      avgSalary,
    };
  }, [yearSalaries, teachers]);

  // Handle open edit dues modal
  const handleOpenEdit = (due: MonthlyDue) => {
    setEditingDue(due);
    setFormStatus(due.status);
    setFormMethod(due.paymentMethod || "Havale / EFT");
    setFormDate(due.paidDate || new Date().toISOString().split("T")[0]);
    setFormReceipt(
      due.receiptNo ||
        `MAK-${due.academicYear || selectedAcademicYear}-${due.monthIndex < 10 ? "0" + due.monthIndex : due.monthIndex}-${due.studentId.replace("stu-", "")}`
    );
    setFormNotes(due.notes || "");
    setFormAmount(due.amount || 12500);
  };

  // Handle save dues modal
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

  // Quick toggle status directly for dues
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
      receiptNo:
        nextStatus === "odendi"
          ? `MAK-${due.academicYear || selectedAcademicYear}-0${due.monthIndex}-${due.studentId.replace("stu-", "")}`
          : undefined,
      notes: nextStatus === "odendi" ? "Hızlı onaylandı" : nextStatus === "beklemede" ? "Dekont bekleniyor" : "Ödenmedi",
    });

    showToast(`✓ ${studentName} (${due.month}): Durum "${nextStatus.toUpperCase()}" yapıldı.`);
  };

  // Handle open salary edit modal
  const handleOpenSalaryEdit = (sal: TeacherSalary) => {
    setEditingSalary(sal);
    setSalFormStatus(sal.status);
    setSalFormAmount(sal.amount);
    setSalFormBonus(sal.bonus || 0);
    setSalFormDeduction(sal.deduction || 0);
    setSalFormPaidDate(sal.paidDate || new Date().toISOString().split("T")[0]);
    setSalFormMethod(sal.paymentMethod || "Banka Transferi / EFT");
    setSalFormDekont(
      sal.dekontNo ||
        `BORD-${sal.academicYear || selectedAcademicYear}-${sal.monthIndex.toString().padStart(2, "0")}-${sal.teacherId.replace("tch-", "")}`
    );
    setSalFormNotes(sal.notes || "");
  };

  // Quick toggle salary status
  const handleQuickToggleSalary = (sal: TeacherSalary, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextStatus: SalaryPaymentStatus = sal.status === "odendi" ? "odenmedi" : "odendi";
    const teacher = teachers.find((t) => t.id === sal.teacherId);
    const nowStr = new Date().toISOString().split("T")[0];

    updateSalaryStatus(sal.id, nextStatus, {
      paidDate: nextStatus === "odendi" ? nowStr : undefined,
      dekontNo: nextStatus === "odendi" ? (sal.dekontNo || `BORD-${Date.now().toString().slice(-6)}`) : undefined,
    });

    showToast(
      `✓ ${teacher?.name || "Öğretmen"} (${sal.month}): Maaş durumu "${nextStatus === "odendi" ? "ÖDENDİ" : "ÖDENMEDİ"}" olarak değiştirildi.`
    );
  };

  // Handle save salary modal
  const handleSaveSalary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSalary) return;

    updateSalaryStatus(editingSalary.id, salFormStatus, {
      amount: Number(salFormAmount),
      bonus: Number(salFormBonus),
      deduction: Number(salFormDeduction),
      paidDate: salFormStatus === "odendi" ? salFormPaidDate : undefined,
      paymentMethod: salFormStatus === "odendi" ? salFormMethod : undefined,
      dekontNo: salFormStatus === "odendi" ? salFormDekont : undefined,
      notes: salFormNotes,
    });

    const teacher = teachers.find((t) => t.id === editingSalary.teacherId);
    showToast(
      `✓ ${teacher?.name || "Öğretmen"} - ${editingSalary.month} maaşı "${salFormStatus === "odendi" ? "ÖDENDİ" : "ÖDENMEDİ"}" olarak kaydedildi!`
    );
    setEditingSalary(null);
  };

  // Filtered Expenses (for selected year)
  const filteredExpenses = useMemo(() => {
    return yearExpenses.filter((exp) => {
      if (expenseCategoryFilter !== "all" && exp.category !== expenseCategoryFilter) return false;
      if (expenseMonthFilter !== "all" && exp.month !== expenseMonthFilter) return false;
      if (expenseSearch.trim()) {
        const q = expenseSearch.toLowerCase();
        const matchTitle = exp.title.toLowerCase().includes(q);
        const matchSupplier = exp.supplier?.toLowerCase().includes(q);
        const matchReceipt = exp.receiptNo?.toLowerCase().includes(q);
        if (!matchTitle && !matchSupplier && !matchReceipt) return false;
      }
      return true;
    });
  }, [yearExpenses, expenseCategoryFilter, expenseMonthFilter, expenseSearch]);

  // Overall Expense KPIs (for selected year)
  const expenseKpis = useMemo(() => {
    const totalOperational = yearExpenses.reduce((acc, e) => acc + e.amount, 0);
    const marketExpenses = yearExpenses.filter((e) => e.category === "market_gida");
    const totalMarket = marketExpenses.reduce((acc, e) => acc + e.amount, 0);
    const billsExpenses = yearExpenses.filter((e) => e.category === "faturalar");
    const totalBills = billsExpenses.reduce((acc, e) => acc + e.amount, 0);
    const withReceiptCount = yearExpenses.filter((e) => !!e.receiptImage).length;

    return {
      totalOperational,
      totalMarket,
      totalBills,
      withReceiptCount,
      count: yearExpenses.length,
    };
  }, [yearExpenses]);

  // Overall Financial Cashflow & Profit/Loss KPIs (for selected year)
  const overallFinancials = useMemo(() => {
    const totalIncome = kpis.totalCollected; // Tahsil edilen aidatlar
    const totalSalaries = salaryKpis.totalPaid; // Ödenen öğretmen maaşları
    const totalOperational = expenseKpis.totalOperational; // Kreş harcamaları
    const totalExpenses = totalSalaries + totalOperational; // Toplam gider
    const netBalance = totalIncome - totalExpenses; // Net kasa / kâr
    const profitMargin = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;

    return {
      totalIncome,
      totalSalaries,
      totalOperational,
      totalExpenses,
      netBalance,
      profitMargin,
      isPositive: netBalance >= 0,
    };
  }, [kpis.totalCollected, salaryKpis.totalPaid, expenseKpis.totalOperational]);

  // Monthly Financial Breakdown (10 Academic Months for selected year)
  const monthlyFinancials = useMemo(() => {
    return currentAcademicMonths.map((month, idx) => {
      // Aidat Income (Tahsil Edilen)
      const monthDues = yearDues.filter((d) => d.month === month);
      const paidIncome = monthDues.filter((d) => d.status === "odendi").reduce((acc, d) => acc + d.amount, 0);
      const totalExpectedIncome = monthDues.reduce((acc, d) => acc + d.amount, 0);

      // Teacher Salaries Expense (Ödenen)
      const monthSalaries = yearSalaries.filter((s) => s.month === month);
      const paidSalaries = monthSalaries.filter((s) => s.status === "odendi").reduce((acc, s) => acc + s.netTotal, 0);
      const totalExpectedSalaries = monthSalaries.reduce((acc, s) => acc + s.netTotal, 0);

      // Operational Expenses for this month
      const monthExpenses = yearExpenses.filter((e) => e.month === month);
      const operationalExpense = monthExpenses.reduce((acc, e) => acc + e.amount, 0);

      // Total Paid Expense
      const totalPaidExpense = paidSalaries + operationalExpense;

      // Net Monthly Cashflow
      const netCashflow = paidIncome - totalPaidExpense;

      return {
        month,
        monthIndex: idx + 1,
        paidIncome,
        totalExpectedIncome,
        paidSalaries,
        totalExpectedSalaries,
        operationalExpense,
        totalPaidExpense,
        netCashflow,
        isPositive: netCashflow >= 0,
        expenseCount: monthExpenses.length,
      };
    });
  }, [currentAcademicMonths, yearDues, yearSalaries, yearExpenses]);

  // Expense Category Distribution for Progress Bars
  const categoryDistribution = useMemo(() => {
    const total = expenseKpis.totalOperational;
    return (Object.keys(CATEGORY_MAP) as ExpenseCategory[])
      .map((cat) => {
        const catExpenses = yearExpenses.filter((e) => e.category === cat);
        const amount = catExpenses.reduce((acc, e) => acc + e.amount, 0);
        const percent = total > 0 ? Math.round((amount / total) * 100) : 0;
        return {
          category: cat,
          info: CATEGORY_MAP[cat],
          amount,
          percent,
          count: catExpenses.length,
        };
      })
      .filter((c) => c.count > 0 || c.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [yearExpenses, expenseKpis.totalOperational]);

  // Handlers for Kindergarten Expenses
  const handleOpenAddExpense = () => {
    setExpTitle("");
    setExpCategory("market_gida");
    setExpAmount(2500);
    const startYr = selectedAcademicYear.split("-")[0] || "2026";
    setExpDate(`${startYr}-09-15`);
    setExpMonth(currentAcademicMonths[0] || "Eylül 2026");
    setExpPaymentMethod("Kurumsal Kredi Kartı");
    setExpSupplier("Migros Toptan");
    setExpReceiptNo(`MGR-${startYr}-${Date.now().toString().slice(-4)}`);
    setExpRecordedBy("Zehra Yılmaz (Müdür)");
    setExpNotes("");
    setExpReceiptImage("");
    setEditingExpense("new");
  };

  const handleOpenEditExpense = (exp: KindergartenExpense) => {
    setExpTitle(exp.title);
    setExpCategory(exp.category);
    setExpAmount(exp.amount);
    setExpDate(exp.date);
    setExpMonth(exp.month);
    setExpPaymentMethod(exp.paymentMethod);
    setExpSupplier(exp.supplier || "");
    setExpReceiptNo(exp.receiptNo || "");
    setExpRecordedBy(exp.recordedBy || "");
    setExpNotes(exp.notes || "");
    setExpReceiptImage(exp.receiptImage || "");
    setEditingExpense(exp);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || Number(expAmount) <= 0) {
      showToast("Lütfen harcama başlığı ve geçerli bir tutar giriniz.");
      return;
    }

    if (editingExpense === "new") {
      addExpense({
        title: expTitle.trim(),
        category: expCategory,
        amount: Number(expAmount),
        date: expDate,
        academicYear: selectedAcademicYear,
        month: expMonth,
        paymentMethod: expPaymentMethod,
        supplier: expSupplier.trim() || undefined,
        receiptNo: expReceiptNo.trim() || undefined,
        recordedBy: expRecordedBy.trim() || undefined,
        notes: expNotes.trim() || undefined,
        receiptImage: expReceiptImage || undefined,
      });
      showToast(`✓ Yeni kreş gideri (${selectedAcademicYear} dönemi) başarıyla kaydedildi.`);
    } else if (editingExpense && typeof editingExpense === "object") {
      updateExpense(editingExpense.id, {
        title: expTitle.trim(),
        category: expCategory,
        amount: Number(expAmount),
        date: expDate,
        academicYear: editingExpense.academicYear || selectedAcademicYear,
        month: expMonth,
        paymentMethod: expPaymentMethod,
        supplier: expSupplier.trim() || undefined,
        receiptNo: expReceiptNo.trim() || undefined,
        recordedBy: expRecordedBy.trim() || undefined,
        notes: expNotes.trim() || undefined,
        receiptImage: expReceiptImage || undefined,
      });
      showToast("✓ Kreş gideri başarıyla güncellendi.");
    }
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string, title: string) => {
    if (window.confirm(`"${title}" harcamasını silmek istediğinize emin misiniz?`)) {
      deleteExpense(id);
      showToast("✓ Harcama kaydı silindi.");
    }
  };

  const handleReceiptPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Uyarı: Yüklenen fotoğraf 5MB'den küçük olmalıdır.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setExpReceiptImage(reader.result);
        showToast("✓ Fiş fotoğrafı başarıyla yüklendi.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyReceiptPreset = (presetIndex: number) => {
    const preset = SAMPLE_RECEIPT_PRESETS[presetIndex];
    if (!preset) return;
    const amountVal = Number(expAmount) > 0 ? Number(expAmount) : 4500;
    const receiptNoVal = expReceiptNo || `FŞ-${Date.now().toString().slice(-5)}`;
    const dateVal = expDate || "2026-09-15";
    const dataUrl = preset.getDataUrl(amountVal, receiptNoVal, dateVal);
    setExpReceiptImage(dataUrl);
    if (!expSupplier) setExpSupplier(preset.supplier);
    setExpCategory(preset.category);
    showToast(`✓ "${preset.name}" şablonu fiş görseli olarak eklendi.`);
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

      {/* Page Header with Multi-Year Academic Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 md:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide">
            <Receipt className="w-4 h-4 text-emerald-300" />
            <span>Yalnızca Yönetici Yetkisi</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Muhasebe & Finansal Yönetim Sistemi
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-2xl font-medium">
            1-6. Sınıf öğrencilerimizin 10 aylık aidatlarını, öğretmen maaşlarını ve kreş işletme harcamalarını ({selectedAcademicYear} dönemi) takip edin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-center">
          {/* Prominent Academic Year Dropdown */}
          <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl flex items-center gap-2 border border-white/25 shadow-inner">
            <span className="text-[11px] font-black uppercase text-emerald-100 pl-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">Eğitim Yılı:</span>
            </span>
            <select
              value={selectedAcademicYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-white text-slate-900 font-black text-xs sm:text-sm py-2 px-3 rounded-xl border-none shadow-xs focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              {availableAcademicYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr} {yr === "2026-2027" ? "(2026 Kayıtları)" : yr === "2029-2030" ? "(2029 Dönemi)" : ""}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowAddYearModal(true)}
              title="Yeni Eğitim Öğretim Yılı Tanımla"
              className="px-3 py-2 rounded-xl bg-white/25 hover:bg-white/35 text-white text-xs font-black transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Yeni Yıl</span>
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-bold transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır</span>
          </button>
        </div>
      </div>

      {/* Historical Retention & Multi-Year Indicator Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black shrink-0 border border-indigo-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                Seçili Eğitim Dönemi: {selectedAcademicYear}
              </span>
              {selectedAcademicYear === "2026-2027" ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  📁 2026 Başlangıç & Arşiv Kayıtları
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  🌟 {selectedAcademicYear} Aktif Dönemi
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 font-medium mt-0.5">
              🔒 <strong>Kesintisiz Arşiv Garantisi:</strong> Gelecek yıllarda (2029, 2030+) olsanız dahi, 2026 ve geçmiş yıllara ait tüm öğrenci aidatları, öğretmen maaşları ve fiş fotoğrafları kalıcı olarak saklanır ve tek tıkla incelenebilir.
            </p>
          </div>
        </div>

        {/* Quick Year Switch Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
          {availableAcademicYears.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => handleYearChange(yr)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                selectedAcademicYear === yr
                  ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400"
                  : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Switcher: 4 Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none whitespace-nowrap">
        <button
          onClick={() => setAccountingTab("ozet")}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
            accountingTab === "ozet"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>Genel Gelir & Gider Durumu (Kâr / Bakiye)</span>
        </button>

        <button
          onClick={() => setAccountingTab("giderler")}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer relative shrink-0 ${
            accountingTab === "giderler"
              ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Kreş İşletme Giderleri (Market, Fişler)</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white">
            {expenses.length}
          </span>
        </button>

        <button
          onClick={() => setAccountingTab("aidat")}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
            accountingTab === "aidat"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Öğrenci Aidat Takibi (Gelirler)</span>
        </button>

        <button
          onClick={() => setAccountingTab("maas")}
          className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer relative shrink-0 ${
            accountingTab === "maas"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Öğretmen Maaşları & Bordro (Giderler)</span>
          {salaryKpis.unpaidCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
              {salaryKpis.unpaidCount} Bekleyen
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: GENEL GELİR & GİDER DURUMU (KÂR / BAKİYE ÖZETİ) */}
      {accountingTab === "ozet" && (
        <div className="space-y-8 animate-in fade-in">
          {/* Main Financial KPI Banner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Toplam Gelir */}
            <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/20 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Toplam Tahsil Edilen Gelir
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-emerald-700 font-mono">
                  {overallFinancials.totalIncome.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{kpis.paidCount} ay aidatı tahsil edildi</span>
                </p>
              </div>
            </div>

            {/* Toplam Gider */}
            <div className="bg-white p-5 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  Toplam Gerçekleşen Gider
                </span>
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-rose-700 font-mono">
                  {overallFinancials.totalExpenses.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[10px] font-medium text-slate-500 mt-1">
                  {overallFinancials.totalSalaries.toLocaleString("tr-TR")} ₺ Maaş + {overallFinancials.totalOperational.toLocaleString("tr-TR")} ₺ İşletme
                </p>
              </div>
            </div>

            {/* Net Kâr / Kasa Bakiyesi */}
            <div
              className={`p-5 rounded-3xl border shadow-xs flex flex-col justify-between ${
                overallFinancials.isPositive
                  ? "bg-gradient-to-br from-white to-emerald-50/50 border-emerald-300"
                  : "bg-gradient-to-br from-white to-rose-50/50 border-rose-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Net Kasa / Kâr Bakiyesi
                </span>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${
                    overallFinancials.isPositive ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  <Scale className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p
                  className={`text-2xl font-black font-mono ${
                    overallFinancials.isPositive ? "text-emerald-800" : "text-rose-800"
                  }`}
                >
                  {overallFinancials.netBalance.toLocaleString("tr-TR")} ₺
                </p>
                <span
                  className={`inline-flex items-center gap-1 mt-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
                    overallFinancials.isPositive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {overallFinancials.isPositive ? "✓ Pozitif Nakit Akışı (Kâr)" : "✕ Bütçe Açığı / İlave Fon"}
                </span>
              </div>
            </div>

            {/* Kâr Marjı / Ortalama */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mali Kâr Marjı
                </span>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-indigo-700 font-mono">
                  %{overallFinancials.profitMargin}
                </p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">
                  Ort. Aylık Kâr: {Math.round(overallFinancials.netBalance / 10).toLocaleString("tr-TR")} ₺ / Ay
                </p>
              </div>
            </div>
          </div>

          {/* 10-Month Comparative Financial Matrix */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-slate-700" />
                  <span>2026 - 2027 Dönemi Aylık Gelir & Gider Akış Tablosu</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Ay ay gerçekleşen tahsilatlar, ödenen öğretmen maaşları, market/işletme harcamaları ve net kâr dökümü
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAccountingTab("giderler");
                    handleOpenAddExpense();
                  }}
                  className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Yeni Gider Yaz</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <th className="p-3.5">Eğitim Ayı</th>
                    <th className="p-3.5 text-right text-emerald-800">Aidat Geliri (Tahsil Edilen)</th>
                    <th className="p-3.5 text-right text-purple-800">Maaş Gideri (Öğretmenler)</th>
                    <th className="p-3.5 text-right text-rose-800">Kreş Gideri (Market vb.)</th>
                    <th className="p-3.5 text-right text-slate-900">Toplam Gider</th>
                    <th className="p-3.5 text-right font-black">Net Kasa / Kâr</th>
                    <th className="p-3.5 text-center">Mali Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {monthlyFinancials.map((mf) => (
                    <tr key={mf.month} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 font-black text-[11px] flex items-center justify-center">
                          {mf.monthIndex}
                        </span>
                        <span>{mf.month}</span>
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                        {mf.paidIncome.toLocaleString("tr-TR")} ₺
                        <span className="block text-[10px] text-slate-400 font-normal">
                          / {mf.totalExpectedIncome.toLocaleString("tr-TR")} ₺
                        </span>
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-purple-700">
                        {mf.paidSalaries.toLocaleString("tr-TR")} ₺
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-rose-700">
                        {mf.operationalExpense.toLocaleString("tr-TR")} ₺
                        {mf.expenseCount > 0 && (
                          <span className="block text-[10px] text-slate-400 font-normal">
                            ({mf.expenseCount} harcama)
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 text-right font-mono font-black text-slate-900">
                        {mf.totalPaidExpense.toLocaleString("tr-TR")} ₺
                      </td>

                      <td
                        className={`p-3.5 text-right font-mono font-black text-sm ${
                          mf.isPositive ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {mf.isPositive ? "+" : ""}
                        {mf.netCashflow.toLocaleString("tr-TR")} ₺
                      </td>

                      <td className="p-3.5 text-center">
                        {mf.isPositive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            Kârlı & Dengeli
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                            Bakiye Bekliyor
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white font-black text-xs border-t-2 border-slate-900">
                    <td className="p-4">TOPLAM YILLIK BİLANÇO:</td>
                    <td className="p-4 text-right font-mono text-emerald-400">
                      {overallFinancials.totalIncome.toLocaleString("tr-TR")} ₺
                    </td>
                    <td className="p-4 text-right font-mono text-purple-300">
                      {overallFinancials.totalSalaries.toLocaleString("tr-TR")} ₺
                    </td>
                    <td className="p-4 text-right font-mono text-rose-300">
                      {overallFinancials.totalOperational.toLocaleString("tr-TR")} ₺
                    </td>
                    <td className="p-4 text-right font-mono text-white">
                      {overallFinancials.totalExpenses.toLocaleString("tr-TR")} ₺
                    </td>
                    <td
                      className={`p-4 text-right font-mono text-sm ${
                        overallFinancials.isPositive ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {overallFinancials.isPositive ? "+" : ""}
                      {overallFinancials.netBalance.toLocaleString("tr-TR")} ₺
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                        Genel Kâr %{overallFinancials.profitMargin}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Expense Category Distribution & Quick Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Breakdown */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-purple-600" />
                    <span>Kreş Giderlerinin Kategori Dağılımı</span>
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Harcama kalemlerinin toplam bütçedeki payı
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAccountingTab("giderler")}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 underline"
                >
                  Tüm Giderleri Gör →
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {categoryDistribution.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span>{item.info.icon}</span>
                        <span>{item.info.label}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({item.count} işlem)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900">
                          {item.amount.toLocaleString("tr-TR")} ₺
                        </span>
                        <span className="font-mono font-black text-[11px] text-slate-500 w-10 text-right">
                          %{item.percent}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: item.info.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  Hızlı Muhasebe İşlemleri
                </span>
                <h4 className="text-lg font-black text-white leading-snug">
                  Kreş Finansal Yönetim Paneli
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Market fişleri, öğretmen bordroları ve öğrenci aidat tahsilatlarını tek bir çatı altından yönetin.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setAccountingTab("giderler");
                    handleOpenAddExpense();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>Market / Kreş Gideri Ekle</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountingTab("aidat")}
                  className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Öğrenci Aidat Matrisi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountingTab("maas")}
                  className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Öğretmen Maaş Çizelgesi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KREŞ İŞLETME GİDERLERİ & FİŞLER */}
      {accountingTab === "giderler" && (
        <div className="space-y-8 animate-in fade-in">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold">
                  <ShoppingCart className="w-4 h-4 text-rose-300" />
                  <span>Kreş İşletme & Operasyonel Harcamalar</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                  Kreş Harcamaları & Fiş / Fatura Portalı
                </h2>
                <p className="text-xs sm:text-sm text-rose-100 max-w-2xl font-medium leading-relaxed">
                  Market mutfak alışverişleri, taze gıda, kırtasiye etkinlik malzemeleri, faturalar ve temizlik giderlerini sisteme kaydedin. Dilediğiniz zaman fiş fotoğrafı yükleyin ve tam ekran inceleyin.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenAddExpense}
                  className="px-5 py-3.5 rounded-2xl bg-white text-rose-800 hover:bg-rose-50 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4 text-rose-600" />
                  <span>+ Yeni Kreş Gideri Ekle</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Expense KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Toplam Kreş Gideri
                </span>
                <div className="text-xl font-black text-rose-700 font-mono">
                  {expenseKpis.totalOperational.toLocaleString("tr-TR")} ₺
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  {yearExpenses.length} adet işlem kaydı
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <span className="text-2xl">🛒</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Mutfak & Market Gıda
                </span>
                <div className="text-xl font-black text-emerald-700 font-mono">
                  {expenseKpis.totalMarket.toLocaleString("tr-TR")} ₺
                </div>
                <span className="text-[10px] font-bold text-emerald-600">
                  Sebze, meyve, kahvaltılık
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Doğalgaz & Elektrik
                </span>
                <div className="text-xl font-black text-amber-700 font-mono">
                  {expenseKpis.totalBills.toLocaleString("tr-TR")} ₺
                </div>
                <span className="text-[10px] font-bold text-amber-600">
                  Isınma, enerji & su
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Fiş Fotoğrafı Ekli
                </span>
                <div className="text-xl font-black text-purple-700 font-mono">
                  {expenseKpis.withReceiptCount} / {yearExpenses.length}
                </div>
                <span className="text-[10px] font-bold text-purple-600">
                  Resmî belge / fiş mevcuttur
                </span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={expenseCategoryFilter}
                  onChange={(e) => setExpenseCategoryFilter(e.target.value as ExpenseCategory | "all")}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="all">Tüm Kategoriler</option>
                  {(Object.keys(CATEGORY_MAP) as ExpenseCategory[]).map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_MAP[cat].icon} {CATEGORY_MAP[cat].label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <select
                  value={expenseMonthFilter}
                  onChange={(e) => setExpenseMonthFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="all">Tüm Aylar</option>
                  {currentAcademicMonths.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Input and Add Button */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Market, harcama veya fiş no ara..."
                  value={expenseSearch}
                  onChange={(e) => setExpenseSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="button"
                onClick={handleOpenAddExpense}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Gider Ekle</span>
              </button>
            </div>
          </div>

          {/* Expense Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExpenses.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
                  🛒
                </div>
                <h4 className="text-base font-black text-slate-800">
                  Filtrelere Uygun Kreş Gideri Bulunamadı
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Arama kriterlerinizi değiştirebilir veya yeni bir harcama girişi yapabilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAddExpense}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-black shadow-sm"
                >
                  + Yeni Kreş Gideri Ekle
                </button>
              </div>
            ) : (
              filteredExpenses.map((exp) => {
                const catInfo = CATEGORY_MAP[exp.category] || CATEGORY_MAP.diger;
                return (
                  <div
                    key={exp.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Category & Date Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${catInfo.badge}`}
                        >
                          <span>{catInfo.icon}</span>
                          <span>{catInfo.label}</span>
                        </span>

                        <div className="text-right">
                          <span className="text-xs font-black text-slate-800 block">
                            {exp.date}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {exp.month}
                          </span>
                        </div>
                      </div>

                      {/* Title & Amount */}
                      <div className="flex items-start justify-between gap-3 pt-1">
                        <h4 className="text-base font-black text-slate-900 leading-snug">
                          {exp.title}
                        </h4>
                        <span className="text-lg font-black font-mono text-slate-900 shrink-0 text-right">
                          {exp.amount.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>

                      {/* Meta Information */}
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="text-slate-400 font-medium">Tedarikçi / Yer:</span>
                          <span className="font-bold text-slate-800">
                            {exp.supplier || "Belirtilmedi"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="text-slate-400 font-medium">Fiş / Fatura No:</span>
                          <span className="font-mono font-bold text-slate-800">
                            {exp.receiptNo || "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="text-slate-400 font-medium">Ödeme Biçimi:</span>
                          <span className="font-bold text-slate-700">
                            {exp.paymentMethod}
                          </span>
                        </div>
                        {exp.recordedBy && (
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="text-slate-400 font-medium">Yetkili / Harcayan:</span>
                            <span className="font-medium text-slate-700">
                              {exp.recordedBy}
                            </span>
                          </div>
                        )}
                        {exp.notes && (
                          <div className="pt-1 text-[11px] text-slate-500 italic border-t border-slate-200/50">
                            &quot;{exp.notes}&quot;
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Receipt Photo & Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      {/* Receipt Preview Thumbnail */}
                      {exp.receiptImage ? (
                        <button
                          type="button"
                          onClick={() => setViewingReceiptExpense(exp)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-black transition-all cursor-pointer group"
                        >
                          <div className="w-6 h-6 rounded-lg overflow-hidden border border-purple-300 shrink-0 bg-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={exp.receiptImage}
                              alt="Fiş Önizleme"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <span>Fiş Fotoğrafını Gör</span>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenEditExpense(exp)}
                          className="text-[11px] font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>+ Fiş Ekle</span>
                        </button>
                      )}

                      {/* Edit & Delete Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditExpense(exp)}
                          title="Harcamayı Düzenle"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteExpense(exp.id, exp.title)}
                          title="Harcamayı Sil"
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ÖĞRENCİ AİDAT TAKİBİ */}
      {accountingTab === "aidat" && (
        <div className="space-y-8 animate-in fade-in">
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
                <th className="p-3.5 sticky left-0 z-20 bg-slate-900 min-w-[140px] sm:min-w-[200px]">
                  Öğrenci & Sınıf Bilgisi
                </th>
                {currentAcademicMonths.map((month) => (
                  <th key={month} className="p-3 text-center min-w-[95px] whitespace-nowrap text-[11px]">
                    {month.split(" ")[0]}
                    <span className="block text-[9px] text-slate-400 font-normal">
                      {month.split(" ")[1]}
                    </span>
                  </th>
                ))}
                <th className="p-3.5 text-center min-w-[110px] md:sticky md:right-0 md:z-20 bg-slate-900">
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
                  const studentDues = yearDues
                    .filter((d) => d.studentId === student.id)
                    .sort((a, b) => a.monthIndex - b.monthIndex);

                  const paidAmount = studentDues
                    .filter((d) => d.status === "odendi")
                    .reduce((sum, d) => sum + d.amount, 0);

                  const totalStudentDue = studentDues.reduce((sum, d) => sum + d.amount, 0);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Student Info (Sticky Left) */}
                      <td className="p-3 sticky left-0 z-10 bg-white shadow-sm border-r border-slate-100 min-w-[140px] sm:min-w-[200px]">
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

                      {/* Summary (Sticky Right on md+) */}
                      <td className="p-3 text-center md:sticky md:right-0 md:z-10 bg-white shadow-sm border-l border-slate-100 min-w-[100px]">
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
    </div>
  )}

      {/* ======================================================== */}
      {/* TEACHER SALARIES TAB CONTENT */}
      {/* ======================================================== */}
      {accountingTab === "maas" && (
        <div className="space-y-8 animate-in fade-in">
          {/* Teacher Salary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Toplam Yıllık Maaş Bütçesi */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Yıllık Toplam Maaş Bütçesi
                </span>
                <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-slate-900">
                  {salaryKpis.totalBudget.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">
                  {teachers.length} Kadrolu Öğretmen × 10 Eğitim Ayı
                </p>
              </div>
            </div>

            {/* Ödenen Maaşlar */}
            <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/20 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Ödenen Maaşlar Toplamı
                </span>
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-emerald-700">
                  {salaryKpis.totalPaid.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{salaryKpis.paidCount} ay maaşı ödendi (%{salaryKpis.payRate})</span>
                </p>
              </div>
            </div>

            {/* Bekleyen / Ödenmeyen Maaşlar */}
            <div className="bg-white p-5 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                  Ödenmeyen / Bekleyen Maaşlar
                </span>
                <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-rose-700">
                  {salaryKpis.totalUnpaid.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[11px] font-semibold text-rose-600 mt-1">
                  {salaryKpis.unpaidCount} ay maaşı ödeme bekliyor
                </p>
              </div>
            </div>

            {/* Ortalama Öğretmen Maaşı */}
            <div className="bg-white p-5 rounded-3xl border border-indigo-200 bg-indigo-50/20 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Ortalama Aylık Maaş
                </span>
                <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-black text-indigo-800">
                  {salaryKpis.avgSalary.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-[11px] font-semibold text-indigo-600 mt-1">
                  Öğretmen başına ortalama net aylık
                </p>
              </div>
            </div>
          </div>

          {/* Official Payroll Info Banner */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Kurumsal Personel Maaş & Bordro Sistemi
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Öğretmen maaşları her ayın <strong>15&apos;inde</strong> kayıtlı banka hesaplarına aktarılır. Buradaki durum değişiklikleri öğretmenlerin kendi sayfalarına otomatik yansır.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="px-3.5 py-2 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl font-bold">
                <span>Maaş Ödeme Günü: </span>
                <span className="text-purple-700 font-black">Her Ayın 15&apos;i</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 font-bold">
                Ziraat Bankası Maaş Protokolü
              </div>
            </div>
          </div>

          {/* Teacher Salary Filters */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Öğretmen:</span>
                <select
                  value={salaryTeacherFilter}
                  onChange={(e) => setSalaryTeacherFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Tüm Öğretmenler ({teachers.length})</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.classId}. Sınıf: {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Ödeme Durumu:</span>
                <select
                  value={salaryStatusFilter}
                  onChange={(e) => setSalaryStatusFilter(e.target.value as SalaryPaymentStatus | "all")}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="odendi">✓ Sadece Ödenenler</option>
                  <option value="odenmedi">✕ Sadece Ödenmeyenler</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={salarySearch}
                onChange={(e) => setSalarySearch(e.target.value)}
                placeholder="Öğretmen veya unvan ara..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Matrix Legend & Hint */}
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-black text-purple-900">Durum Göstergeleri:</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-[11px] border border-emerald-300">
                <Check className="w-3 h-3 text-emerald-700" />
                <span>Ödendi (Maaş yattı)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 font-bold text-[11px] border border-rose-300">
                <X className="w-3 h-3 text-rose-600" />
                <span>Ödenmedi (Ödeme Bekleniyor)</span>
              </span>
            </div>
            <p className="text-[11px] text-purple-800 font-semibold mt-1 sm:mt-0">
              💡 İpucu: Hücreye tıklayarak maaş durumunu değiştirebilir, bordro dekontu ekleyebilirsiniz.
            </p>
          </div>

          {/* Teacher Salary Matrix Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold">
                    <th className="p-3.5 sticky left-0 z-20 bg-slate-900 min-w-[150px] sm:min-w-[220px]">
                      Öğretmen & Sorumlu Sınıf
                    </th>
                    {currentAcademicMonths.map((month) => (
                      <th key={month} className="p-3 text-center min-w-[105px] whitespace-nowrap text-[11px]">
                        {month.split(" ")[0]}
                        <span className="block text-[9px] text-slate-400 font-normal">
                          {month.split(" ")[1]}
                        </span>
                      </th>
                    ))}
                    <th className="p-3.5 text-center min-w-[120px] md:sticky md:right-0 md:z-20 bg-slate-900">
                      Toplam Ödenen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTeachers.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="p-10 text-center text-slate-500">
                        Arama kriterlerinize uygun öğretmen bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredTeachers.map((teacher) => {
                      const tClass = classes.find((c) => c.id === teacher.classId);
                      const tSalaries = yearSalaries
                        .filter((s) => s.teacherId === teacher.id)
                        .sort((a, b) => a.monthIndex - b.monthIndex);

                      const totalPaidAmount = tSalaries
                        .filter((s) => s.status === "odendi")
                        .reduce((sum, s) => sum + s.netTotal, 0);

                      const totalContractAmount = tSalaries.reduce((sum, s) => sum + s.netTotal, 0);

                      return (
                        <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Teacher Info (Sticky Left) */}
                          <td className="p-3 sticky left-0 z-10 bg-white shadow-sm border-r border-slate-100 min-w-[150px] sm:min-w-[220px]">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={teacher.avatar}
                                alt={teacher.name}
                                className="w-9 h-9 rounded-2xl object-cover shrink-0 border border-slate-200"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 text-xs truncate">
                                  {teacher.name}
                                </p>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                  <span className="font-bold text-purple-700">
                                    {tClass?.shortName || `${teacher.classId}. Sınıf`}
                                  </span>
                                  <span>•</span>
                                  <span className="text-slate-600 font-mono font-bold">
                                    {((teacher.baseSalary || 42500)).toLocaleString("tr-TR")} ₺
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* 10 Month Cells */}
                          {tSalaries.map((sal) => {
                            const isPaid = sal.status === "odendi";

                            return (
                              <td key={sal.id} className="p-2 text-center">
                                <div className="flex flex-col items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenSalaryEdit(sal)}
                                    className={`w-full py-1.5 px-2 rounded-xl text-[11px] border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                      isPaid
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 font-black shadow-xs"
                                        : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 font-bold"
                                    }`}
                                    title={
                                      isPaid
                                        ? `Ödendi: ${sal.paidDate} - Dekont: ${sal.dekontNo || 'Mevcut'}`
                                        : "Ödenmedi - Düzenlemek için tıklayın"
                                    }
                                  >
                                    {isPaid ? (
                                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                    ) : (
                                      <X className="w-3 h-3 text-rose-500 shrink-0" />
                                    )}
                                    <span>{isPaid ? "Ödendi" : "Ödenmedi"}</span>
                                  </button>
                                  <span className="text-[10px] font-mono font-semibold text-slate-500">
                                    {sal.netTotal.toLocaleString("tr-TR")} ₺
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => handleQuickToggleSalary(sal, e)}
                                    title="Maaş Durumunu Hızlı Değiştir"
                                    className="text-[9px] text-slate-400 hover:text-slate-700 underline tracking-tight cursor-pointer"
                                  >
                                    Durum Çevir
                                  </button>
                                </div>
                              </td>
                            );
                          })}

                          {/* Total Paid (Sticky Right on md+) */}
                          <td className="p-3 text-center md:sticky md:right-0 md:z-10 bg-white shadow-sm border-l border-slate-100 min-w-[110px]">
                            <p className="font-mono font-black text-emerald-700 text-xs">
                              {totalPaidAmount.toLocaleString("tr-TR")} ₺
                            </p>
                            <p className="text-[9px] text-slate-400 font-medium">
                              / {totalContractAmount.toLocaleString("tr-TR")} ₺
                            </p>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Payment Modal */}
      {editingDue && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-2 border-emerald-100 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[92vh] overflow-y-auto">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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

      {/* Teacher Salary Edit Modal */}
      {editingSalary && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Öğretmen Maaşı & Bordro Düzenle
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {teachers.find((t) => t.id === editingSalary.teacherId)?.name} • {editingSalary.month}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingSalary(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSalary} className="space-y-4 text-xs">
              {/* Status Switcher Buttons */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Maaş Ödeme Durumu
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSalFormStatus("odendi")}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      salFormStatus === "odendi"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Ödendi (Maaş Yatırıldı)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSalFormStatus("odenmedi")}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      salFormStatus === "odenmedi"
                        ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>Ödenmedi (Beklemede)</span>
                  </button>
                </div>
              </div>

              {/* Amount, Bonus & Deduction */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Net Maaş (₺)
                  </label>
                  <input
                    type="number"
                    value={salFormAmount}
                    onChange={(e) => setSalFormAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Ek Prim / Nöbet (₺)
                  </label>
                  <input
                    type="number"
                    value={salFormBonus}
                    onChange={(e) => setSalFormBonus(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Kesinti (₺)
                  </label>
                  <input
                    type="number"
                    value={salFormDeduction}
                    onChange={(e) => setSalFormDeduction(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Total Net Calculation Box */}
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl flex items-center justify-between">
                <span className="font-bold text-purple-900">Ele Geçecek Toplam Net Tutar:</span>
                <span className="font-mono font-black text-purple-800 text-sm">
                  {(Number(salFormAmount) + Number(salFormBonus) - Number(salFormDeduction)).toLocaleString("tr-TR")} ₺
                </span>
              </div>

              {/* Date & Method */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Ödeme Tarihi
                  </label>
                  <input
                    type="date"
                    value={salFormPaidDate}
                    onChange={(e) => setSalFormPaidDate(e.target.value)}
                    disabled={salFormStatus !== "odendi"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Ödeme Yöntemi
                  </label>
                  <select
                    value={salFormMethod}
                    onChange={(e) =>
                      setSalFormMethod(e.target.value as "Banka Transferi / EFT" | "Nakit")
                    }
                    disabled={salFormStatus !== "odendi"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    <option value="Banka Transferi / EFT">Banka Transferi / EFT</option>
                    <option value="Nakit">Nakit / Elden</option>
                  </select>
                </div>
              </div>

              {/* Dekont No */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Bordro / Banka Dekont No
                </label>
                <input
                  type="text"
                  value={salFormDekont}
                  onChange={(e) => setSalFormDekont(e.target.value)}
                  disabled={salFormStatus !== "odendi"}
                  placeholder="BORD-2026-..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Muhasebe Açıklaması / Notu
                </label>
                <textarea
                  rows={2}
                  value={salFormNotes}
                  onChange={(e) => setSalFormNotes(e.target.value)}
                  placeholder="Örn: Ziraat Bankası maaş hesabına aktarıldı."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSalary(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  Kaydet ve Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Kindergarten Expense Modal */}
      {editingExpense !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border-2 border-rose-200 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider block mb-0.5">
                  Kreş İşletme Harcaması
                </span>
                <h3 className="text-lg font-black text-slate-950">
                  {editingExpense === "new" ? "Yeni Harcama Kaydı & Fiş Girişi" : "Harcama Bilgisini Düzenle"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingExpense(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveExpense} className="space-y-4 text-xs font-medium">
              {/* Title */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Harcama Açıklaması / Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="Örn: Haftalık Meyve, Sebze ve Kahvaltılık Market Alışverişi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Category & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Harcama Kategorisi *
                  </label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    {(Object.keys(CATEGORY_MAP) as ExpenseCategory[]).map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_MAP[cat].icon} {CATEGORY_MAP[cat].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Tutar (TL) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-black text-sm text-slate-900 focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Date & Month */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Harcama Tarihi
                  </label>
                  <input
                    type="date"
                    required
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    İlgili Dönem Ayı
                  </label>
                  <select
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    {ACADEMIC_MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Supplier, Receipt No & Payment Method */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Alışveriş Yeri / Tedarikçi
                  </label>
                  <input
                    type="text"
                    value={expSupplier}
                    onChange={(e) => setExpSupplier(e.target.value)}
                    placeholder="Örn: Migros, Metro, A101"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Fiş / Fatura No
                  </label>
                  <input
                    type="text"
                    value={expReceiptNo}
                    onChange={(e) => setExpReceiptNo(e.target.value)}
                    placeholder="Örn: MGR-8841"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Ödeme Şekli
                  </label>
                  <select
                    value={expPaymentMethod}
                    onChange={(e) =>
                      setExpPaymentMethod(
                        e.target.value as "Kurumsal Kredi Kartı" | "Nakit / Kasa" | "Banka Havalesi / EFT"
                      )
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Kurumsal Kredi Kartı">Kurumsal Kredi Kartı</option>
                    <option value="Nakit / Kasa">Nakit / Kasa</option>
                    <option value="Banka Havalesi / EFT">Banka Havalesi / EFT</option>
                  </select>
                </div>
              </div>

              {/* Receipt Photo Upload & Preset Area */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-rose-600" />
                    <span>Fiş / Fatura Fotoğrafı Ekle</span>
                  </span>
                  {expReceiptImage && (
                    <button
                      type="button"
                      onClick={() => setExpReceiptImage("")}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline cursor-pointer"
                    >
                      Fotoğrafı Kaldır
                    </button>
                  )}
                </div>

                {/* Upload or Preset Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload Input */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      Cihazdan Fotoğraf Seç
                    </span>
                    <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-300 hover:border-rose-400 rounded-xl cursor-pointer bg-white transition-colors text-center">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-700">Görsel Yükle</span>
                      <span className="text-[10px] text-slate-400">PNG, JPG, WebP</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Preset Selector */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      Veya Hazır Şablon Fiş Seç
                    </span>
                    <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                      {SAMPLE_RECEIPT_PRESETS.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleApplyReceiptPreset(pIdx)}
                          className="w-full text-left p-1.5 px-2.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-[11px] font-bold text-slate-700 hover:text-rose-800 transition-colors truncate block cursor-pointer"
                        >
                          + {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Receipt Thumbnail Preview */}
                {expReceiptImage && (
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-emerald-400 bg-white shadow-xs shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={expReceiptImage}
                        alt="Yüklenen Fiş"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-800 block flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fiş fotoğrafı hazır</span>
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Kaydettiğinizde harcama detayında incelenebilecek.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Recorded By & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Harcamayı Yapan / Sorumlu
                  </label>
                  <input
                    type="text"
                    value={expRecordedBy}
                    onChange={(e) => setExpRecordedBy(e.target.value)}
                    placeholder="Örn: Zehra Yılmaz (Müdür)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Ek Açıklama / Not
                  </label>
                  <input
                    type="text"
                    value={expNotes}
                    onChange={(e) => setExpNotes(e.target.value)}
                    placeholder="Örn: Sınıf etkinlikleri için alındı"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-black shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  {editingExpense === "new" ? "Gideri Sisteme Kaydet" : "Değişiklikleri Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Viewing Receipt Lightbox Modal */}
      {viewingReceiptExpense && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-slate-800 space-y-4 animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider block">
                  Kurumsal Harcama Belgesi
                </span>
                <h3 className="text-base font-black text-slate-900">
                  {viewingReceiptExpense.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingReceiptExpense(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Receipt Metadata Pills */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Tedarikçi / Mağaza
                </span>
                <span className="font-black text-slate-800 block">
                  {viewingReceiptExpense.supplier || "Mağaza"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Tarih & Dönem
                </span>
                <span className="font-bold text-slate-800 block">
                  {viewingReceiptExpense.date} ({viewingReceiptExpense.month})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Fiş / Fatura No
                </span>
                <span className="font-mono font-bold text-slate-800 block">
                  {viewingReceiptExpense.receiptNo || "—"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Ödenen Tutar
                </span>
                <span className="font-mono font-black text-emerald-700 text-sm block">
                  {viewingReceiptExpense.amount.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>

            {/* Receipt Image Display */}
            {viewingReceiptExpense.receiptImage ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewingReceiptExpense.receiptImage}
                  alt="Fiş / Fatura Görseli"
                  className="max-h-[60vh] w-auto object-contain rounded-xl shadow-xs"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs font-medium">
                Bu harcamaya ait kayıtlı bir fiş fotoğrafı bulunmamaktadır.
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">
                Kayıt: {viewingReceiptExpense.recordedBy || "Yönetici"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Yazdır</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingReceiptExpense(null)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Academic Year Modal */}
      {showAddYearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base">Yeni Eğitim Yılı Aç</h3>
                    <p className="text-[11px] text-emerald-100 font-medium">
                      Gelecek dönemleri planlayın
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddYearModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateNewYear} className="p-6 space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-2.5">
                <span className="text-base">🛡️</span>
                <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                  <strong>Kayıt Güvenliği Garantisi:</strong> Yeni yıl eklediğinizde veya yıllar arasında geçiş yaptığınızda, 2026 dahil geçmiş yıllara ait hiçbir aidat, maaş veya gider kaydı <strong>asla silinmez</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                  Akademik Yıl Tanımı (YYYY-YYYY)
                </label>
                <input
                  type="text"
                  value={newYearInput}
                  onChange={(e) => setNewYearInput(e.target.value)}
                  placeholder="Örn: 2031-2032"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-black text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                  10 aylık takvim (Eylül - Haziran) otomatik olarak hesaplanacaktır.
                </p>
              </div>

              {/* Quick suggestion tags */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">Hızlı Öneriler:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["2031-2032", "2032-2033", "2033-2034"].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setNewYearInput(sug)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors border border-slate-200/60 cursor-pointer"
                    >
                      +{sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddYearModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Dönemi Aç ve Geç</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
