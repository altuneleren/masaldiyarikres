"use client";

import React, { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import {
  Camera,
  Video,
  UploadCloud,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Play,
  X,
  Plus,
} from "lucide-react";
import { MediaItem } from "@/types";

export default function AdminMedyaPage() {
  const { media, classes, addMediaItem, deleteMediaItem, toggleMediaVisibility } = useApp();

  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [filterClass, setFilterClass] = useState<number | "all">("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  // Upload Form State
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [sourceMode, setSourceMode] = useState<"file" | "url">("file");
  const [mediaUrl, setMediaUrl] = useState("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Genel");
  const [assignedClassId, setAssignedClassId] = useState<number | "general">("general");
  const [isPublic, setIsPublic] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Detect type
    if (file.type.startsWith("video/")) {
      setMediaType("video");
    } else {
      setMediaType("image");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFilePreview(result);
      setMediaUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = sourceMode === "file" ? filePreview : mediaUrl;

    if (!finalUrl) {
      alert("Lütfen bir dosya seçin veya geçerli bir medya linki giriniz.");
      return;
    }

    if (!title) {
      alert("Lütfen bir başlık giriniz.");
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];

    addMediaItem({
      type: mediaType,
      url: finalUrl,
      thumbnailUrl: mediaType === "video" ? undefined : finalUrl,
      title,
      description,
      date: todayStr,
      classId: assignedClassId === "general" ? null : Number(assignedClassId),
      isPublic,
      category,
    });

    setSuccessToast(`"${title}" başarıyla siteye yüklendi!`);
    setTimeout(() => setSuccessToast(""), 4000);

    // Reset Form
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setFilePreview("");
    setShowUploadModal(false);
  };

  const filteredMedia = media.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesClass =
      filterClass === "all" || item.classId === filterClass;
    return matchesType && matchesClass;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-pink-500" />
            <span>Fotoğraf ve Video Medya Yöneticisi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Tanıtım vitrinine veya 1 - 6. sınıflara özel resim ve video ekleyin, düzenleyin ve silin.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs rounded-2xl shadow-md hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Resim veya Video Yükle</span>
        </button>
      </div>

      {successToast && (
        <div className="p-4 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filter Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Tür:</span>
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tümü ({media.length})
          </button>
          <button
            onClick={() => setFilterType("image")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              filterType === "image"
                ? "bg-sky-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Fotoğraflar</span>
          </button>
          <button
            onClick={() => setFilterType("video")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              filterType === "video"
                ? "bg-pink-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videolar</span>
          </button>
        </div>

        {/* Class Filter */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 shrink-0">Sınıf:</span>
          <button
            onClick={() => setFilterClass("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterClass === "all"
                ? "bg-amber-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tümü
          </button>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setFilterClass(cls.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterClass === cls.id
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cls.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
          <Camera className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">Bu filtrelere uygun medya bulunamadı.</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-3 text-xs font-bold text-pink-600 hover:underline"
          >
            Yeni bir resim veya video yükleyin
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => {
            const itemClass = classes.find((c) => c.id === item.classId);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail / Video View */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-black/70 text-white flex items-center gap-1">
                        {item.type === "video" ? (
                          <>
                            <Video className="w-3 h-3 text-pink-400" />
                            <span>Video</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-3 h-3 text-sky-400" />
                            <span>Foto</span>
                          </>
                        )}
                      </span>

                      {itemClass ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white">
                          {itemClass.shortName}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-600 text-white">
                          Genel Vitrin
                        </span>
                      )}
                    </div>

                    {/* Preview Button */}
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                      <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg">
                        {item.type === "video" ? <Play className="w-5 h-5 fill-slate-900" /> : <Eye className="w-5 h-5" />}
                      </span>
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                      <span>{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleMediaVisibility(item.id)}
                    className={`flex items-center gap-1 font-bold ${
                      item.isPublic ? "text-emerald-600" : "text-slate-400"
                    }`}
                    title="Görünürlük Değiştir"
                  >
                    {item.isPublic ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Sitede Açık</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Gizli / Veliye Özel</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`"${item.title}" medyasını silmek istediğinize emin misiniz?`)) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              Siteye Resim veya Video Yükle
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Bilgisayarınızdan dosya seçebilir veya bir web adresi (URL) girebilirsiniz.
            </p>

            <form onSubmit={handleSaveMedia} className="space-y-4">
              {/* Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Medya Türü:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMediaType("image")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-2 transition-all ${
                      mediaType === "image"
                        ? "border-sky-500 bg-sky-50 text-sky-800"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>Fotoğraf (Resim)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType("video")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-2 transition-all ${
                      mediaType === "video"
                        ? "border-pink-500 bg-pink-50 text-pink-800"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Video</span>
                  </button>
                </div>
              </div>

              {/* Source Mode: File vs URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Yükleme Yöntemi:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSourceMode("file")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                      sourceMode === "file" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Bilgisayardan Dosya Seç
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceMode("url")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                      sourceMode === "url" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    İnternet Bağlantısı (URL)
                  </button>
                </div>
              </div>

              {/* File Picker or URL Input */}
              {sourceMode === "file" ? (
                <div className="space-y-2">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-6 border-2 border-dashed border-slate-300 hover:border-pink-400 rounded-2xl text-center cursor-pointer bg-slate-50 transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">
                      {filePreview ? "Dosya Seçildi (Değiştirmek için tıklayın)" : "Dosya seçmek için tıklayın"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, MP4 veya WEBM</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={mediaType === "video" ? "video/*" : "image/*"}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {filePreview && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-black">
                      {mediaType === "video" ? (
                        <video src={filePreview} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={filePreview} alt="Önizleme" className="w-full h-full object-contain" />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Medya Web Adresi (URL) *</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                  {mediaUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-black mt-2">
                      <img src={mediaUrl} alt="Önizleme" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              )}

              {/* Title & Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Başlık *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 3. Sınıf Bahçe Ekim Atölyesi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                  >
                    <option value="Genel">Genel</option>
                    <option value="Sanat Atölyesi">Sanat Atölyesi</option>
                    <option value="Bahçe Oyunları">Bahçe Oyunları</option>
                    <option value="Doğa & Bilim">Doğa & Bilim</option>
                    <option value="Özel Günler">Özel Günler</option>
                    <option value="Müzik">Müzik</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Sınıf Seçimi</label>
                  <select
                    value={assignedClassId}
                    onChange={(e) =>
                      setAssignedClassId(
                        e.target.value === "general" ? "general" : Number(e.target.value)
                      )
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                  >
                    <option value="general">Genel Tanıtım Galerisi</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Açıklama</label>
                <textarea
                  rows={2}
                  placeholder="Kısa bir açıklama yazın..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                ></textarea>
              </div>

              {/* Public toggle */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Site Vitrininde Herkese Göster</span>
                  <span className="text-[11px] text-slate-400">
                    Açık olursa ana sayfa fotoğraf/video galerisinde yayınlanır.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-5 h-5 accent-pink-500 rounded cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black shadow-sm"
                >
                  Medyayı Yükle ve Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Lightbox Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
              {previewItem.type === "video" ? (
                <video src={previewItem.url} controls autoPlay className="w-full max-h-[60vh] object-contain" />
              ) : (
                <img src={previewItem.url} alt={previewItem.title} className="max-h-[60vh] object-contain" />
              )}
            </div>

            <div className="p-6 bg-white space-y-1">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {previewItem.category}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">{previewItem.title}</h3>
              <p className="text-xs text-slate-600">{previewItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
