"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Camera, Video, Play, Eye, X, Tag, Sparkles } from "lucide-react";
import { MediaItem } from "@/types";

export default function MediaGallery() {
  const { media, classes } = useApp();
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [selectedClassId, setSelectedClassId] = useState<number | "all">("all");
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  // Filter public items for showcase
  const publicMedia = media.filter((m) => m.isPublic);

  const filteredItems = publicMedia.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesClass =
      selectedClassId === "all" || item.classId === selectedClassId;
    return matchesType && matchesClass;
  });

  return (
    <section id="galeri" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-sky-600" />
            <span>Neşeli Anlar & Etkinlikler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Masal Diyarı Fotoğraf & Video Galerisi
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Miniklerin atölye çalışmalarından, bahçe oyunlarına, deneylerden gösterilere kadar
            günbegün kaydedilen en güzel hatıralar.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          {/* Type Filter */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterType === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tümü ({publicMedia.length})
            </button>
            <button
              onClick={() => setFilterType("image")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterType === "image"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Camera className="w-4 h-4 text-sky-500" />
              <span>Fotoğraflar</span>
            </button>
            <button
              onClick={() => setFilterType("video")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterType === "video"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Video className="w-4 h-4 text-pink-500" />
              <span>Videolar</span>
            </button>
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 shrink-0">Sınıf Filtresi:</span>
            <button
              onClick={() => setSelectedClassId("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedClassId === "all"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Tümü
            </button>
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedClassId === cls.id
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cls.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="font-bold text-slate-700">Bu filtreye uygun medya bulunamadı.</p>
            <p className="text-xs text-slate-400 mt-1">Yönetim panelinden yeni fotoğraflar veya videolar ekleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const itemClass = classes.find((c) => c.id === item.classId);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                        {item.type === "video" ? (
                          <>
                            <Video className="w-3 h-3 text-pink-400" />
                            <span>Video</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-3 h-3 text-sky-400" />
                            <span>Fotoğraf</span>
                          </>
                        )}
                      </span>
                      {itemClass && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-white">
                          {itemClass.shortName}
                        </span>
                      )}
                    </div>

                    {/* Play Icon if Video */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 rounded-full bg-white/90 text-slate-800 shadow-lg">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Info below thumbnail */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mb-1">
                        <Tag className="w-3 h-3" />
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal / Lightbox for viewing image or playing video */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media Display Area */}
            <div className="bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              {activeItem.type === "video" ? (
                <video
                  src={activeItem.url}
                  controls
                  autoPlay
                  className="w-full max-h-[65vh] object-contain"
                >
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              ) : (
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              )}
            </div>

            {/* Media Metadata */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  {activeItem.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{activeItem.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{activeItem.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
