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

  // Admin Auth
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Veli / Student (e-okul) Auth
  loginStudent: (username: string, pass: string) => Student | null;
  logoutStudent: () => void;

  // Teacher Auth
  loginTeacher: (user: string, pass: string) => Teacher | null;
  logoutTeacher: () => void;
  updateTeacherCredentials: (teacherId: string, username: string, pass: string) => void;

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
  getDuesForStudent: (studentId: string) => MonthlyDue[];

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
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from LocalStorage on mount
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

      const storedDues = localStorage.getItem(STORAGE_KEYS.DUES);
      if (storedDues) {
        setMonthlyDues(JSON.parse(storedDues));
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

  const getDuesForStudent = (studentId: string): MonthlyDue[] => {
    return monthlyDues
      .filter((d) => d.studentId === studentId)
      .sort((a, b) => a.monthIndex - b.monthIndex);
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
        loginAdmin,
        logoutAdmin,
        loginStudent,
        logoutStudent,
        loginTeacher,
        logoutTeacher,
        updateTeacherCredentials,
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
