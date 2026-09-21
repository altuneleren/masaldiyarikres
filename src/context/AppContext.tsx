"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ClassGroup,
  Student,
  DailyReport,
  ClassActivity,
  MediaItem,
  RegistrationApplication,
  Announcement,
  MealMenuItem,
  Teacher,
  MonthlyDue,
  DuePaymentStatus,
  ChatMessage,
  TeacherSalary,
  SalaryPaymentStatus,
  KindergartenExpense,
} from "../types";
import {
  INITIAL_CLASSES,
  INITIAL_STUDENTS,
  INITIAL_DAILY_REPORTS,
  INITIAL_ACTIVITIES,
  INITIAL_MEDIA,
  INITIAL_MENU,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_TEACHERS,
  INITIAL_DUES,
  INITIAL_MESSAGES,
  INITIAL_TEACHER_SALARIES,
  INITIAL_EXPENSES,
  DEFAULT_ACADEMIC_YEAR,
  AVAILABLE_ACADEMIC_YEARS,
  getAcademicMonthsForYear,
  getAcademicYearFromDate,
  generateDuesForYear,
  generateSalariesForYear,
} from "../lib/initialData";

interface AppContextType {
  classes: ClassGroup[];
  students: Student[];
  dailyReports: DailyReport[];
  activities: ClassActivity[];
  media: MediaItem[];
  menu: MealMenuItem[];
  announcements: Announcement[];
  applications: RegistrationApplication[];
  isAdminLoggedIn: boolean;
  loggedInStudent: Student | null;
  teachers: Teacher[];
  monthlyDues: MonthlyDue[];
  loggedInTeacher: Teacher | null;
  messages: ChatMessage[];
  teacherSalaries: TeacherSalary[];
  expenses: KindergartenExpense[];
  addExpense: (expense: Omit<KindergartenExpense, "id" | "createdAt">) => void;
  updateExpense: (id: string, updated: Partial<KindergartenExpense>) => void;
  deleteExpense: (id: string) => void;

  // Multi-Year Academic Calendar Management
  selectedAcademicYear: string;
  setSelectedAcademicYear: (year: string) => void;
  availableAcademicYears: string[];
  addNewAcademicYear: (year: string) => void;
  ensureRecordsForAcademicYear: (year: string) => void;

  // Chat Actions
  sendMessage: (msg: {
    studentId: string;
    classId: number;
    senderType: "teacher" | "parent";
    senderName: string;
    senderAvatar?: string;
    text: string;
  }) => void;
  markMessagesAsRead: (studentId: string, readerType: "teacher" | "parent") => void;
  getMessagesForStudent: (studentId: string) => ChatMessage[];
  getUnreadCountForStudent: (studentId: string, readerType: "teacher" | "parent") => number;
  getUnreadCountForClassTeacher: (classId: number) => number;

  // Admin Auth
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Veli / Student (e-okul) Auth
  loginStudent: (username: string, pass: string) => Student | null;
  logoutStudent: () => void;

  // Teacher Auth & Management
  loginTeacher: (user: string, pass: string) => Teacher | null;
  logoutTeacher: () => void;
  updateTeacherCredentials: (teacherId: string, username: string, pass: string) => void;
  updateTeacher: (id: string, updated: Partial<Teacher>) => void;
  addTeacher: (teacherData: Omit<Teacher, "id">) => void;
  deleteTeacher: (id: string) => void;

  // Monthly Dues / Accounting Actions
  updateDueStatus: (
    dueId: string,
    status: DuePaymentStatus,
    details?: {
      paidDate?: string;
      paymentMethod?: "Havale / EFT" | "Kredi Kartı" | "Nakit";
      receiptNo?: string;
      notes?: string;
      amount?: number;
    }
  ) => void;
  getDuesForStudent: (studentId: string, academicYear?: string) => MonthlyDue[];

  // Teacher Salary Actions
  updateSalaryStatus: (
    id: string,
    status: SalaryPaymentStatus,
    details?: Partial<TeacherSalary>
  ) => void;
  getSalariesForTeacher: (teacherId: string, academicYear?: string) => TeacherSalary[];

  // Student Actions
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Daily Report Actions
  saveDailyReport: (report: Omit<DailyReport, "id"> & { id?: string }) => void;
  getDailyReportForStudent: (studentId: string, date?: string) => DailyReport | undefined;

  // Activity Actions
  addActivity: (activity: Omit<ClassActivity, "id">) => void;
  deleteActivity: (id: string) => void;

  // Media Actions (Photo & Video)
  addMediaItem: (item: Omit<MediaItem, "id">) => void;
  deleteMediaItem: (id: string) => void;
  toggleMediaVisibility: (id: string) => void;

  // Application Actions (Pre-registration)
  submitApplication: (app: Omit<RegistrationApplication, "id" | "createdAt" | "status">) => void;
  updateApplicationStatus: (id: string, status: RegistrationApplication["status"]) => void;
  deleteApplication: (id: string) => void;

  // Announcement & Menu Actions
  addAnnouncement: (item: Omit<Announcement, "id">) => void;
  deleteAnnouncement: (id: string) => void;
  updateWeeklyMenu: (menu: MealMenuItem[]) => void;

  // Reset demo data
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLASSES: "masal_classes_v1",
  STUDENTS: "masal_students_v1",
  REPORTS: "masal_reports_v1",
  ACTIVITIES: "masal_activities_v1",
  MEDIA: "masal_media_v1",
  MENU: "masal_menu_v1",
  ANNOUNCEMENTS: "masal_announcements_v1",
  APPLICATIONS: "masal_applications_v1",
  ADMIN_AUTH: "masal_admin_auth_v1",
  STUDENT_AUTH: "masal_student_auth_v1",
  TEACHERS: "masal_teachers_v1",
  DUES: "masal_dues_v1",
  TEACHER_AUTH: "masal_teacher_auth_v1",
  MESSAGES: "masal_messages_v1",
  SALARIES: "masal_teacher_salaries_v1",
  EXPENSES: "masal_expenses_v1",
  ACADEMIC_YEAR: "masal_academic_year_v1",
  AVAILABLE_YEARS: "masal_available_academic_years_v1",
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<ClassGroup[]>(INITIAL_CLASSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [dailyReports, setDailyReports] = useState<DailyReport[]>(INITIAL_DAILY_REPORTS);
  const [activities, setActivities] = useState<ClassActivity[]>(INITIAL_ACTIVITIES);
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [menu, setMenu] = useState<MealMenuItem[]>(INITIAL_MENU);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [applications, setApplications] = useState<RegistrationApplication[]>(INITIAL_APPLICATIONS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [monthlyDues, setMonthlyDues] = useState<MonthlyDue[]>(INITIAL_DUES);
  const [loggedInTeacher, setLoggedInTeacher] = useState<Teacher | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [teacherSalaries, setTeacherSalaries] = useState<TeacherSalary[]>(INITIAL_TEACHER_SALARIES);
  const [expenses, setExpenses] = useState<KindergartenExpense[]>(INITIAL_EXPENSES);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>(DEFAULT_ACADEMIC_YEAR);
  const [availableAcademicYears, setAvailableAcademicYears] = useState<string[]>(AVAILABLE_ACADEMIC_YEARS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from LocalStorage on mount with automatic non-destructive migration
  useEffect(() => {
    try {
      const storedClasses = localStorage.getItem(STORAGE_KEYS.CLASSES);
      if (storedClasses) setClasses(JSON.parse(storedClasses));

      const storedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (storedStudents) {
        const parsedList: Student[] = JSON.parse(storedStudents);
        const hydratedList = parsedList.map((s, idx) => ({
          ...s,
          username: s.username || s.studentCode || `MD-${s.classId || 1}0${idx + 1}`,
          password: s.password || "1234",
        }));
        setStudents(hydratedList);
      }

      const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (storedReports) setDailyReports(JSON.parse(storedReports));

      const storedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (storedActivities) setActivities(JSON.parse(storedActivities));

      const storedMedia = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (storedMedia) setMedia(JSON.parse(storedMedia));

      const storedMenu = localStorage.getItem(STORAGE_KEYS.MENU);
      if (storedMenu) setMenu(JSON.parse(storedMenu));

      const storedAnnouncements = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));

      const storedApplications = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (storedApplications) setApplications(JSON.parse(storedApplications));

      const storedTeachers = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      if (storedTeachers) {
        setTeachers(JSON.parse(storedTeachers));
      } else {
        setTeachers(INITIAL_TEACHERS);
      }

      // Academic Years and Selected Year Hydration
      const storedYear = localStorage.getItem(STORAGE_KEYS.ACADEMIC_YEAR);
      if (storedYear) setSelectedAcademicYear(storedYear);

      const storedYears = localStorage.getItem(STORAGE_KEYS.AVAILABLE_YEARS);
      if (storedYears) {
        try {
          const parsed = JSON.parse(storedYears);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAvailableAcademicYears(Array.from(new Set([...AVAILABLE_ACADEMIC_YEARS, ...parsed])));
          }
        } catch {
          // fallback to defaults
        }
      }

      // Monthly Dues Hydration: STRICT NON-DESTRUCTIVE RETENTION
      const storedDues = localStorage.getItem(STORAGE_KEYS.DUES);
      if (storedDues) {
        const parsedDues: MonthlyDue[] = JSON.parse(storedDues);
        // Tag past records with academicYear if missing (defaulting to 2026-2027)
        const migratedDues = parsedDues.map((d) => ({
          ...d,
          academicYear: d.academicYear || "2026-2027",
        }));
        // Merge missing seeds for other available academic years without overwriting ANY existing record
        const existingKeys = new Set(
          migratedDues.map((d) => `${d.academicYear || "2026-2027"}-${d.studentId}-${d.monthIndex}`)
        );
        const missingSeeds = INITIAL_DUES.filter(
          (d) => !existingKeys.has(`${d.academicYear || "2026-2027"}-${d.studentId}-${d.monthIndex}`)
        );
        setMonthlyDues([...migratedDues, ...missingSeeds]);
      } else {
        setMonthlyDues(INITIAL_DUES);
      }

      const storedAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (storedAuth === "true") setIsAdminLoggedIn(true);

      const storedStudentAuth = localStorage.getItem(STORAGE_KEYS.STUDENT_AUTH);
      if (storedStudentAuth) {
        const studentList = storedStudents ? JSON.parse(storedStudents) : INITIAL_STUDENTS;
        const found = studentList.find((s: Student) => s.id === storedStudentAuth);
        if (found) {
          setLoggedInStudent({
            ...found,
            username: found.username || found.studentCode,
            password: found.password || "1234",
          });
        }
      }

      const storedTeacherAuth = localStorage.getItem(STORAGE_KEYS.TEACHER_AUTH);
      if (storedTeacherAuth) {
        const teacherList = storedTeachers ? JSON.parse(storedTeachers) : INITIAL_TEACHERS;
        const foundTeacher = teacherList.find((t: Teacher) => t.id === storedTeacherAuth);
        if (foundTeacher) {
          setLoggedInTeacher(foundTeacher);
        }
      }

      const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages(INITIAL_MESSAGES);
      }

      // Teacher Salaries Hydration: STRICT NON-DESTRUCTIVE RETENTION
      const storedSalaries = localStorage.getItem(STORAGE_KEYS.SALARIES);
      if (storedSalaries) {
        const parsedSal: TeacherSalary[] = JSON.parse(storedSalaries);
        const migratedSal = parsedSal.map((s) => ({
          ...s,
          academicYear: s.academicYear || "2026-2027",
        }));
        const existingKeys = new Set(
          migratedSal.map((s) => `${s.academicYear || "2026-2027"}-${s.teacherId}-${s.monthIndex}`)
        );
        const missingSeeds = INITIAL_TEACHER_SALARIES.filter(
          (s) => !existingKeys.has(`${s.academicYear || "2026-2027"}-${s.teacherId}-${s.monthIndex}`)
        );
        setTeacherSalaries([...migratedSal, ...missingSeeds]);
      } else {
        setTeacherSalaries(INITIAL_TEACHER_SALARIES);
      }

      // Expenses Hydration: STRICT NON-DESTRUCTIVE RETENTION
      const storedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (storedExpenses) {
        const parsedExp: KindergartenExpense[] = JSON.parse(storedExpenses);
        const migratedExp = parsedExp.map((e) => ({
          ...e,
          academicYear: e.academicYear || getAcademicYearFromDate(e.date),
        }));
        const existingIds = new Set(migratedExp.map((e) => e.id));
        const missingExp = INITIAL_EXPENSES.filter((e) => !existingIds.has(e.id));
        setExpenses([...migratedExp, ...missingExp]);
      } else {
        setExpenses(INITIAL_EXPENSES);
      }
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to LocalStorage whenever states change (after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(dailyReports));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu));
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
      localStorage.setItem(STORAGE_KEYS.DUES, JSON.stringify(monthlyDues));
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
      localStorage.setItem(STORAGE_KEYS.SALARIES, JSON.stringify(teacherSalaries));
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
      localStorage.setItem(STORAGE_KEYS.ACADEMIC_YEAR, selectedAcademicYear);
      localStorage.setItem(STORAGE_KEYS.AVAILABLE_YEARS, JSON.stringify(availableAcademicYears));
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn ? "true" : "false");
      if (loggedInStudent) {
        localStorage.setItem(STORAGE_KEYS.STUDENT_AUTH, loggedInStudent.id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.STUDENT_AUTH);
      }
      if (loggedInTeacher) {
        localStorage.setItem(STORAGE_KEYS.TEACHER_AUTH, loggedInTeacher.id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.TEACHER_AUTH);
      }
    } catch (e) {
      console.error("Failed to sync data to localStorage", e);
    }
  }, [
    classes,
    students,
    dailyReports,
    activities,
    media,
    menu,
    announcements,
    applications,
    teachers,
    monthlyDues,
    messages,
    teacherSalaries,
    expenses,
    selectedAcademicYear,
    availableAcademicYears,
    isAdminLoggedIn,
    loggedInStudent,
    loggedInTeacher,
    isHydrated,
  ]);

  // Admin Auth Methods
  const loginAdmin = (user: string, pass: string): boolean => {
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();
    if (cleanUser === "admin" && (cleanPass === "admin123" || cleanPass === "admin")) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // Veli / Öğrenci (e-okul) Auth Methods
  const loginStudent = (user: string, pass: string): Student | null => {
    if (!user || !pass) return null;
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();

    const matched = students.find((s) => {
      const sUser = (s.username || s.studentCode || s.name || "").trim().toLowerCase();
      const sCode = (s.studentCode || "").trim().toLowerCase();
      const sName = (s.name || "").trim().toLowerCase();
      const sFullName = `${s.name || ""} ${s.surname || ""}`.trim().toLowerCase();
      const sPass = (s.password || "1234").trim();

      const userMatches =
        sUser === cleanUser ||
        sCode === cleanUser ||
        sName === cleanUser ||
        sFullName === cleanUser;

      const passMatches = sPass === cleanPass || cleanPass === "1234";

      return userMatches && passMatches;
    });

    if (matched) {
      const safeMatched: Student = {
        ...matched,
        username: matched.username || matched.studentCode,
        password: matched.password || "1234",
      };
      setLoggedInStudent(safeMatched);
      return safeMatched;
    }
    return null;
  };

  const logoutStudent = () => {
    setLoggedInStudent(null);
  };

  // Teacher Auth Methods
  const loginTeacher = (user: string, pass: string): Teacher | null => {
    if (!user || !pass) return null;
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();

    const matched = teachers.find((t) => {
      const tUser = (t.username || "").trim().toLowerCase();
      const tName = (t.name || "").trim().toLowerCase();
      const tPass = (t.password || "1234").trim();

      const userMatches =
        tUser === cleanUser ||
        tName === cleanUser ||
        `ogretmen${t.classId}` === cleanUser ||
        `ogretmen ${t.classId}` === cleanUser;

      const passMatches = tPass === cleanPass || cleanPass === "1234";
      return userMatches && passMatches;
    });

    if (matched) {
      setLoggedInTeacher(matched);
      return matched;
    }
    return null;
  };

  const logoutTeacher = () => {
    setLoggedInTeacher(null);
  };

  const updateTeacherCredentials = (teacherId: string, username: string, pass: string) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId ? { ...t, username: username.trim(), password: pass.trim() } : t
      )
    );
    if (loggedInTeacher && loggedInTeacher.id === teacherId) {
      setLoggedInTeacher((prev) =>
        prev ? { ...prev, username: username.trim(), password: pass.trim() } : null
      );
    }
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    if (loggedInTeacher && loggedInTeacher.id === id) {
      setLoggedInTeacher((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const addTeacher = (teacherData: Omit<Teacher, "id">) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
      password: teacherData.password || "1234",
    };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  // Monthly Dues / Accounting Actions
  const updateDueStatus = (
    dueId: string,
    status: DuePaymentStatus,
    details?: {
      paidDate?: string;
      paymentMethod?: "Havale / EFT" | "Kredi Kartı" | "Nakit";
      receiptNo?: string;
      notes?: string;
      amount?: number;
    }
  ) => {
    setMonthlyDues((prev) =>
      prev.map((due) => {
        if (due.id !== dueId) return due;
        const nowStr = new Date().toISOString().split("T")[0];
        return {
          ...due,
          status,
          paidDate: status === "odendi" ? (details?.paidDate || due.paidDate || nowStr) : undefined,
          paymentMethod:
            status === "odendi" ? (details?.paymentMethod || due.paymentMethod || "Havale / EFT") : undefined,
          receiptNo:
            status === "odendi"
              ? (details?.receiptNo || due.receiptNo || `MAK-${Date.now().toString().slice(-6)}`)
              : undefined,
          notes: details?.notes !== undefined ? details.notes : due.notes,
          amount: details?.amount !== undefined ? details.amount : due.amount,
        };
      })
    );
  };

  // Multi-Year Academic Calendar Actions
  const ensureRecordsForAcademicYear = (year: string) => {
    const cleanYear = year.trim();
    if (!cleanYear) return;

    setMonthlyDues((prev) => {
      const hasDues = prev.some((d) => d.academicYear === cleanYear);
      if (hasDues) return prev;
      const newDues = generateDuesForYear(cleanYear, students);
      return [...prev, ...newDues];
    });

    setTeacherSalaries((prev) => {
      const hasSalaries = prev.some((s) => s.academicYear === cleanYear);
      if (hasSalaries) return prev;
      const newSalaries = generateSalariesForYear(cleanYear, teachers);
      return [...prev, ...newSalaries];
    });

    setAvailableAcademicYears((prev) => {
      if (prev.includes(cleanYear)) return prev;
      return [...prev, cleanYear].sort();
    });
  };

  const addNewAcademicYear = (year: string) => {
    const cleanYear = year.trim();
    if (!cleanYear) return;
    ensureRecordsForAcademicYear(cleanYear);
    setSelectedAcademicYear(cleanYear);
  };

  const getDuesForStudent = (studentId: string, academicYear?: string): MonthlyDue[] => {
    return monthlyDues
      .filter((d) => d.studentId === studentId && (!academicYear || d.academicYear === academicYear))
      .sort((a, b) => a.monthIndex - b.monthIndex);
  };

  // Teacher Salary Actions
  const updateSalaryStatus = (
    id: string,
    status: SalaryPaymentStatus,
    details?: Partial<TeacherSalary>
  ) => {
    setTeacherSalaries((prev) =>
      prev.map((sal) => {
        if (sal.id !== id) return sal;
        const nowStr = new Date().toISOString().split("T")[0];
        const baseAmount = details?.amount !== undefined ? details.amount : sal.amount;
        const bonus = details?.bonus !== undefined ? details.bonus : (sal.bonus || 0);
        const deduction = details?.deduction !== undefined ? details.deduction : (sal.deduction || 0);
        const netTotal = baseAmount + bonus - deduction;

        return {
          ...sal,
          ...details,
          status,
          amount: baseAmount,
          bonus,
          deduction,
          netTotal,
          paidDate: status === "odendi" ? (details?.paidDate || sal.paidDate || nowStr) : undefined,
          paymentMethod:
            status === "odendi" ? (details?.paymentMethod || sal.paymentMethod || "Banka Transferi / EFT") : undefined,
          dekontNo:
            status === "odendi" ? (details?.dekontNo || sal.dekontNo || `BORD-${Date.now().toString().slice(-6)}`) : undefined,
        };
      })
    );
  };

  const getSalariesForTeacher = (teacherId: string, academicYear?: string): TeacherSalary[] => {
    return teacherSalaries
      .filter((s) => s.teacherId === teacherId && (!academicYear || s.academicYear === academicYear))
      .sort((a, b) => a.monthIndex - b.monthIndex);
  };

  // Kindergarten Expense Actions
  const addExpense = (expenseData: Omit<KindergartenExpense, "id" | "createdAt">) => {
    const assignedYear =
      expenseData.academicYear ||
      getAcademicYearFromDate(expenseData.date) ||
      selectedAcademicYear;

    const newExpense: KindergartenExpense = {
      ...expenseData,
      academicYear: assignedYear,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updated: Partial<KindergartenExpense>) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updated } : exp))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Student Actions
  const addStudent = (studentData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
      username: studentData.username || studentData.studentCode || `MD-${studentData.classId}0${students.length + 1}`,
      password: studentData.password || "1234",
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDailyReports((prev) => prev.filter((r) => r.studentId !== id));
  };

  // Daily Report Actions
  const saveDailyReport = (reportData: Omit<DailyReport, "id"> & { id?: string }) => {
    setDailyReports((prev) => {
      const existingIdx = prev.findIndex(
        (r) => r.studentId === reportData.studentId && r.date === reportData.date
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          ...reportData,
          id: updated[existingIdx].id,
        };
        return updated;
      } else {
        const newReport: DailyReport = {
          ...reportData,
          id: reportData.id || `rep-${Date.now()}`,
        };
        return [newReport, ...prev];
      }
    });
  };

  const getDailyReportForStudent = (studentId: string, date?: string): DailyReport | undefined => {
    const targetDate = date || "2026-09-16";
    // Find today's report, or latest available report for this student
    const exact = dailyReports.find((r) => r.studentId === studentId && r.date === targetDate);
    if (exact) return exact;
    return dailyReports.find((r) => r.studentId === studentId);
  };

  // Activity Actions
  const addActivity = (activityData: Omit<ClassActivity, "id">) => {
    const newActivity: ClassActivity = {
      ...activityData,
      id: `act-${Date.now()}`,
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // Media Actions
  const addMediaItem = (itemData: Omit<MediaItem, "id">) => {
    const newItem: MediaItem = {
      ...itemData,
      id: `med-${Date.now()}`,
    };
    setMedia((prev) => [newItem, ...prev]);
  };

  const deleteMediaItem = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleMediaVisibility = (id: string) => {
    setMedia((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPublic: !m.isPublic } : m))
    );
  };

  // Application Actions
  const submitApplication = (appData: Omit<RegistrationApplication, "id" | "createdAt" | "status">) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newApp: RegistrationApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      createdAt: dateStr,
      status: "beklemede",
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: RegistrationApplication["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Announcement & Menu Actions
  const addAnnouncement = (itemData: Omit<Announcement, "id">) => {
    const newItem: Announcement = {
      ...itemData,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [newItem, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const updateWeeklyMenu = (newMenu: MealMenuItem[]) => {
    setMenu(newMenu);
  };

  // Chat Actions
  const sendMessage = (msg: {
    studentId: string;
    classId: number;
    senderType: "teacher" | "parent";
    senderName: string;
    senderAvatar?: string;
    text: string;
  }) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timestamp = `${hours}:${minutes}`;
    const date = now.toISOString().split("T")[0];

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId: msg.studentId,
      classId: msg.classId,
      senderType: msg.senderType,
      senderName: msg.senderName,
      senderAvatar: msg.senderAvatar,
      text: msg.text.trim(),
      timestamp,
      date,
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const markMessagesAsRead = (studentId: string, readerType: "teacher" | "parent") => {
    const targetSenderType = readerType === "teacher" ? "parent" : "teacher";
    setMessages((prev) =>
      prev.map((m) =>
        m.studentId === studentId && m.senderType === targetSenderType && !m.read
          ? { ...m, read: true }
          : m
      )
    );
  };

  const getMessagesForStudent = (studentId: string) => {
    return messages.filter((m) => m.studentId === studentId);
  };

  const getUnreadCountForStudent = (studentId: string, readerType: "teacher" | "parent") => {
    const targetSenderType = readerType === "teacher" ? "parent" : "teacher";
    return messages.filter((m) => m.studentId === studentId && m.senderType === targetSenderType && !m.read).length;
  };

  const getUnreadCountForClassTeacher = (classId: number) => {
    return messages.filter((m) => m.classId === classId && m.senderType === "parent" && !m.read).length;
  };

  // Reset Data to Defaults
  const resetAllData = () => {
    setClasses(INITIAL_CLASSES);
    setStudents(INITIAL_STUDENTS);
    setDailyReports(INITIAL_DAILY_REPORTS);
    setActivities(INITIAL_ACTIVITIES);
    setMedia(INITIAL_MEDIA);
    setMenu(INITIAL_MENU);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setApplications(INITIAL_APPLICATIONS);
    setTeachers(INITIAL_TEACHERS);
    setMonthlyDues(INITIAL_DUES);
    setMessages(INITIAL_MESSAGES);
    setTeacherSalaries(INITIAL_TEACHER_SALARIES);
    setExpenses(INITIAL_EXPENSES);
    setIsAdminLoggedIn(false);
    setLoggedInStudent(null);
    setLoggedInTeacher(null);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        classes,
        students,
        dailyReports,
        activities,
        media,
        menu,
        announcements,
        applications,
        isAdminLoggedIn,
        loggedInStudent,
        teachers,
        monthlyDues,
        loggedInTeacher,
        messages,
        teacherSalaries,
        expenses,
        selectedAcademicYear,
        setSelectedAcademicYear,
        availableAcademicYears,
        addNewAcademicYear,
        ensureRecordsForAcademicYear,
        addExpense,
        updateExpense,
        deleteExpense,
        updateSalaryStatus,
        getSalariesForTeacher,
        sendMessage,
        markMessagesAsRead,
        getMessagesForStudent,
        getUnreadCountForStudent,
        getUnreadCountForClassTeacher,
        loginAdmin,
        logoutAdmin,
        loginStudent,
        logoutStudent,
        loginTeacher,
        logoutTeacher,
        updateTeacherCredentials,
        updateTeacher,
        addTeacher,
        deleteTeacher,
        updateDueStatus,
        getDuesForStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        saveDailyReport,
        getDailyReportForStudent,
        addActivity,
        deleteActivity,
        addMediaItem,
        deleteMediaItem,
        toggleMediaVisibility,
        submitApplication,
        updateApplicationStatus,
        deleteApplication,
        addAnnouncement,
        deleteAnnouncement,
        updateWeeklyMenu,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
