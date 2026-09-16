"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Smile,
  Phone,
  AlertCircle,
  X,
  Calendar,
  MapPin,
  Baby,
} from "lucide-react";
import { Student, ClassActivity } from "@/types";

export default function AdminSiniflarPage() {
  const searchParams = useSearchParams();
  const { classes, students, activities, addStudent, updateStudent, deleteStudent, addActivity, deleteActivity } = useApp();

  const [activeClassId, setActiveClassId] = useState<number>(1);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [showActivityModal, setShowActivityModal] = useState(false);

  // Read classId from query string if passed
  useEffect(() => {
    const cid = searchParams.get("classId");
    if (cid && !isNaN(Number(cid))) {
      setActiveClassId(Number(cid));
    }
  }, [searchParams]);

  const activeClass = classes.find((c) => c.id === activeClassId) || classes[0];
  const classStudents = students.filter((s) => s.classId === activeClassId);
  const classActivities = activities.filter((a) => a.classId === activeClassId);

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    name: "",
    surname: "",
    studentCode: "",
    username: "",
    password: "1234",
    gender: "kız" as "kız" | "erkek",
    avatar: "",
    birthDate: "2023-01-01",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    emergencyContact: "",
    bloodType: "A Rh+",
    allergies: "",
    notes: "",
  });

  // Activity Form State
  const [activityForm, setActivityForm] = useState({
    title: "",
    time: "10:00 - 11:00",
    date: "Bugün",
    category: "Sanat" as ClassActivity["category"],
    description: "",
    instructor: activeClass?.teacher || "",
  });

  const openNewStudentModal = () => {
    setEditingStudent(null);
    const newCode = `MD-${activeClassId}0${classStudents.length + 1}`;
    setStudentForm({
      name: "",
      surname: "",
      studentCode: newCode,
      username: newCode,
      password: "1234",
      gender: "kız",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
      birthDate: "2023-01-01",
      parentName: "",
      parentPhone: "05",
      parentEmail: "",
      emergencyContact: "",
      bloodType: "A Rh+",
      allergies: "",
      notes: "",
    });
    setShowStudentModal(true);
  };

  const openEditStudentModal = (stu: Student) => {
    setEditingStudent(stu);
    setStudentForm({
      name: stu.name,
      surname: stu.surname,
      studentCode: stu.studentCode,
      username: stu.username || stu.studentCode,
      password: stu.password || "1234",
      gender: stu.gender,
      avatar: stu.avatar,
      birthDate: stu.birthDate,
      parentName: stu.parentName,
      parentPhone: stu.parentPhone,
      parentEmail: stu.parentEmail,
      emergencyContact: stu.emergencyContact,
      bloodType: stu.bloodType,
      allergies: stu.allergies || "",
      notes: stu.notes || "",
    });
    setShowStudentModal(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.surname || !studentForm.parentName) {
      alert("Lütfen ad, soyad ve veli adını doldurunuz.");
      return;
    }

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        ...studentForm,
      });
    } else {
      addStudent({
        ...studentForm,
        classId: activeClassId,
      });
    }

    setShowStudentModal(false);
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.title) {
      alert("Lütfen etkinlik başlığı giriniz.");
      return;
    }

    addActivity({
      ...activityForm,
      classId: activeClassId,
    });

    setActivityForm({
      title: "",
      time: "10:00 - 11:00",
      date: "Bugün",
      category: "Sanat",
      description: "",
      instructor: activeClass?.teacher || "",
    });
    setShowActivityModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            <span>1 - 6. Sınıflar & Öğrenci Yönetimi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Her sınıfın öğrencilerini, veli bilgilerini ve sınıfa özel etkinliklerini buradan yönetebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openNewStudentModal}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Öğrenci Ekle</span>
          </button>
        </div>
      </div>

      {/* Class Selector Bar (1 to 6) */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
        {classes.map((cls) => {
          const count = students.filter((s) => s.classId === cls.id).length;
          const isActive = cls.id === activeClassId;

          return (
            <button
              key={cls.id}
              onClick={() => setActiveClassId(cls.id)}
              className={`px-4 py-3 rounded-2xl border-2 font-bold text-xs flex items-center gap-2.5 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white border-amber-500 text-slate-900 shadow-md scale-105"
                  : "bg-white/60 border-slate-200 text-slate-600 hover:border-amber-300"
              }`}
            >
              <span className="text-lg">{cls.icon}</span>
              <div className="text-left">
                <p className="font-black leading-tight">{cls.shortName}</p>
                <p className="text-[10px] text-slate-400">{cls.ageGroup} • ({count} Öğrenci)</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Class Info Banner */}
      {activeClass && (
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 bg-amber-50 rounded-2xl">{activeClass.icon}</span>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                  {activeClass.ageGroup}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">{activeClass.name}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeClass.room}</span>
              </span>
              <span>•</span>
              <span>Öğretmen: <strong>{activeClass.teacher}</strong></span>
              <span>•</span>
              <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-100">
                Doluluk: {classStudents.length} / {activeClass.capacity}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {activeClass.description}
          </p>
        </div>
      )}

      {/* Two Column Layout: Öğrenciler Listesi & Sınıf Etkinlikleri */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Öğrenci Listesi (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Baby className="w-4 h-4 text-pink-500" />
              <span>Bu Sınıftaki Öğrenciler ({classStudents.length})</span>
            </h3>
            <button
              onClick={openNewStudentModal}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Öğrenci Ekle</span>
            </button>
          </div>

          {classStudents.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-400">Bu sınıfta henüz kayıtlı öğrenci yok.</p>
              <button
                onClick={openNewStudentModal}
                className="mt-2 text-xs font-bold text-amber-600 hover:underline"
              >
                İlk öğrenciyi ekleyin
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classStudents.map((stu) => (
                <div
                  key={stu.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                        />
                        <div>
                          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {stu.studentCode}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">
                            {stu.name} {stu.surname}
                          </h4>
                          <span className="text-[10px] text-slate-500 capitalize">{stu.gender} • D.T: {stu.birthDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditStudentModal(stu)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                          title="Düzenle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`${stu.name} ${stu.surname} öğrencisini silmek istiyor musunuz?`)) {
                              deleteStudent(stu.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Veli Bilgileri */}
                    <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-600 space-y-1">
                      <p className="font-semibold">Veli: <strong>{stu.parentName}</strong></p>
                      <p className="flex items-center gap-1 text-slate-500">
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span>{stu.parentPhone}</span>
                      </p>
                      {stu.allergies && (
                        <p className="text-amber-700 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Alerji: {stu.allergies}</span>
                        </p>
                      )}
                    </div>

                    {/* Veli E-Okul Giriş Bilgisi */}
                    <div className="p-2.5 bg-purple-50 rounded-xl text-[11px] text-purple-900 border border-purple-100 flex items-center justify-between">
                      <span className="font-bold">Veli Giriş:</span>
                      <span className="font-mono text-purple-800 bg-white px-2 py-0.5 rounded border border-purple-200">
                        {stu.username || stu.studentCode} • Şifre: {stu.password || "1234"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/admin/gunluk-karne?studentId=${stu.id}`}
                      className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Smile className="w-3.5 h-3.5 text-amber-600" />
                      <span>Bugünkü Durumu Gir / Düzenle</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sınıf Etkinlikleri (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Sınıfın Etkinlikleri ({classActivities.length})</span>
            </h3>
            <button
              onClick={() => {
                setActivityForm((prev) => ({ ...prev, instructor: activeClass.teacher }));
                setShowActivityModal(true);
              }}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Etkinlik Ekle</span>
            </button>
          </div>

          <div className="space-y-3">
            {classActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 relative group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-800">
                    {act.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {act.time}
                    </span>
                    <button
                      onClick={() => deleteActivity(act.id)}
                      className="text-slate-300 hover:text-rose-500 p-1"
                      title="Etkinliği Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-extrabold text-sm text-slate-900">{act.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{act.description}</p>
                <p className="text-[11px] text-slate-400 font-semibold pt-1 border-t border-slate-100">
                  Eğitmen: {act.instructor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Yeni / Düzenle Öğrenci */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowStudentModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {editingStudent ? "Öğrenci Bilgilerini Düzenle" : `Yeni Öğrenci Ekle (${activeClass.shortName})`}
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Öğrencinin kimlik, veli ve sağlık bilgilerini eksiksiz doldurunuz.
            </p>

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Öğrenci Adı *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="Ali"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.surname}
                    onChange={(e) => setStudentForm({ ...studentForm, surname: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="Yılmaz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Öğrenci Kodu</label>
                  <input
                    type="text"
                    value={studentForm.studentCode}
                    onChange={(e) => setStudentForm({ ...studentForm, studentCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="MD-101"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Cinsiyet</label>
                  <select
                    value={studentForm.gender}
                    onChange={(e) => setStudentForm({ ...studentForm, gender: e.target.value as "kız" | "erkek" })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                  >
                    <option value="kız">Kız</option>
                    <option value="erkek">Erkek</option>
                  </select>
                </div>
              </div>

              {/* Veli E-Okul Giriş Bilgileri */}
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <p className="text-xs font-black text-purple-900">Veli Portalı (E-Okul) Giriş Bilgileri</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Kullanıcı Adı (Öğr. Kodu)</label>
                    <input
                      type="text"
                      required
                      value={studentForm.username}
                      onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-purple-200 text-xs font-medium bg-white"
                      placeholder="MD-101"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Veli Şifresi</label>
                    <input
                      type="text"
                      required
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-purple-200 text-xs font-medium bg-white"
                      placeholder="1234"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Fotoğraf URL (Avatar)</label>
                <input
                  type="text"
                  value={studentForm.avatar}
                  onChange={(e) => setStudentForm({ ...studentForm, avatar: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Veli Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.parentName}
                    onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="Ahmet Yılmaz (Baba)"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Veli Telefonu *</label>
                  <input
                    type="tel"
                    required
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="0532 123 45 67"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kan Grubu</label>
                  <input
                    type="text"
                    value={studentForm.bloodType}
                    onChange={(e) => setStudentForm({ ...studentForm, bloodType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="A Rh+"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Alerji Durumu (Varsa)</label>
                  <input
                    type="text"
                    value={studentForm.allergies}
                    onChange={(e) => setStudentForm({ ...studentForm, allergies: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="Çilek alerjisi"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Özel Notlar</label>
                <input
                  type="text"
                  value={studentForm.notes}
                  onChange={(e) => setStudentForm({ ...studentForm, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  placeholder="Uykudan önce masal dinlemeyi sever."
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-sm"
                >
                  {editingStudent ? "Güncellemeleri Kaydet" : "Öğrenciyi Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Yeni Etkinlik Ekle */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowActivityModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              Sınıfa Yeni Etkinlik Ata
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              {activeClass.name} için günlük veya haftalık etkinlik girin.
            </p>

            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Etkinlik Başlığı *</label>
                <input
                  type="text"
                  required
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  placeholder="Örn: Renkli Ebru Sanatı Atölyesi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori</label>
                  <select
                    value={activityForm.category}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
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
                    value={activityForm.time}
                    onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                    placeholder="10:30 - 11:30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Açıklama</label>
                <textarea
                  rows={3}
                  value={activityForm.description}
                  onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  placeholder="Etkinliğin amacı ve uygulanış yöntemi..."
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Eğitmen / Sorumlu</label>
                <input
                  type="text"
                  value={activityForm.instructor}
                  onChange={(e) => setActivityForm({ ...activityForm, instructor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-sm"
                >
                  Etkinliği Ata
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
