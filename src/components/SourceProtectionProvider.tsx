"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Lock, Copy, ClipboardPaste, Check, ShieldAlert } from "lucide-react";

interface CustomMenuState {
  x: number;
  y: number;
  selectedText: string;
  isInput: boolean;
  targetElement: HTMLElement | null;
}

export default function SourceProtectionProvider({ children }: { children: React.ReactNode }) {
  const [warningMessage, setWarningMessage] = useState<{ text: string; type: "info" | "success" | "warning" } | null>(null);
  const [customMenu, setCustomMenu] = useState<CustomMenuState | null>(null);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  const showToast = (text: string, type: "info" | "success" | "warning" = "info") => {
    setWarningMessage({ text, type });
    setTimeout(() => {
      setWarningMessage(null);
    }, 3200);
  };

  // Close custom context menu on outside click or scroll
  useEffect(() => {
    const handleOutsideClick = () => setCustomMenu(null);
    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleOutsideClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // 1. Console Legal Copyright Warning & Console Wipe
    try {
      console.clear();
      console.log(
        "%c🛡️ TELİF HAKKI VE KAYNAK KOD KORUMASI",
        "color: #dc2626; font-size: 22px; font-weight: 900; background: #fee2e2; padding: 6px 12px; border-radius: 8px;"
      );
      console.log(
        "%c© Masal Diyarı Kreş ve Gündüz Bakımevi - Tüm Hakları Saklıdır.\n\nBu yazılımın tüm tasarım, veri yapısı ve kaynak kodları 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile korunmaktadır. Kaynak kodların izinsiz incelenmesi, kopyalanması veya tersine mühendislik uygulanması yasal yaptırıma tabidir.",
        "color: #d97706; font-size: 13px; font-weight: 600; line-height: 1.6;"
      );
    } catch {
      // ignore
    }

    // 2. Anti-DevTools Detection (Docked & Undocked)
    const checkDevTools = () => {
      // Dimension check for docked DevTools
      const widthDiff = window.outerWidth - window.innerWidth > 160;
      const heightDiff = window.outerHeight - window.innerHeight > 160;
      
      if (widthDiff || heightDiff) {
        setIsDevToolsOpen(true);
        return;
      }

      // Timing check for undocked DevTools (debugger trap)
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        setIsDevToolsOpen(true);
        return;
      }

      setIsDevToolsOpen(false);
    };

    const devtoolsInterval = setInterval(checkDevTools, 1200);
    window.addEventListener("resize", checkDevTools);

    // 3. Right-Click Interception: NEVER show Chrome's native menu (blocks "İncele" completely)
    const handleContextMenu = (e: MouseEvent) => {
      // ALWAYS prevent native Chrome context menu so "İncele / Inspect" NEVER appears!
      e.preventDefault();

      const target = e.target as HTMLElement | null;
      const isInputField = !!(
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      );

      const selection = typeof window !== "undefined" ? window.getSelection()?.toString().trim() || "" : "";

      if (selection || isInputField) {
        // Automatically copy selected text to clipboard as instant convenience
        if (selection) {
          try {
            navigator.clipboard.writeText(selection);
            showToast("✓ Metin panoya kopyalandı!", "success");
          } catch {
            // fallback
          }
        }

        // Show our secure, custom in-page floating menu (NO "İncele" option exists)
        setCustomMenu({
          x: Math.min(e.clientX, window.innerWidth - 180),
          y: Math.min(e.clientY, window.innerHeight - 130),
          selectedText: selection,
          isInput: isInputField,
          targetElement: target,
        });
      } else {
        setCustomMenu(null);
        showToast("🛡️ Kaynak kod ve İncele menüsü telif koruması altındadır.", "warning");
      }
    };

    // 4. Keyboard Shortcuts Prevention (F12, Ctrl+U, Ctrl+Shift+I/J/C, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12 (DevTools)
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        showToast("⚠️ Geliştirici konsolu telif koruması gereği kısıtlanmıştır.", "warning");
        return;
      }

      // Ctrl+U (View Source)
      if (isCtrlOrCmd && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
        e.preventDefault();
        showToast("🛡️ Sayfa kaynak kodu görüntüleme telif koruması altındadır.", "warning");
        return;
      }

      // Ctrl+S (Save HTML Source)
      if (isCtrlOrCmd && (e.key === "s" || e.key === "S" || e.keyCode === 83)) {
        const target = e.target as HTMLElement | null;
        if (!target || (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA")) {
          e.preventDefault();
          showToast("🛡️ Sayfa kaynak kodlarının indirilmesi kısıtlanmıştır.", "warning");
          return;
        }
      }

      // Ctrl+Shift+I / J / C (Inspect / Console)
      if (
        isCtrlOrCmd &&
        e.shiftKey &&
        (e.key === "I" ||
          e.key === "i" ||
          e.key === "J" ||
          e.key === "j" ||
          e.key === "C" ||
          e.key === "c" ||
          e.keyCode === 73 ||
          e.keyCode === 74 ||
          e.keyCode === 67)
      ) {
        e.preventDefault();
        showToast("⚠️ Kaynak kod inceleme araçları telif koruması altındadır.", "warning");
        return;
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(devtoolsInterval);
      window.removeEventListener("resize", checkDevTools);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Action handlers for Custom Menu
  const handleCopy = () => {
    if (customMenu?.selectedText) {
      navigator.clipboard.writeText(customMenu.selectedText);
      showToast("✓ Metin panoya kopyalandı!", "success");
    }
    setCustomMenu(null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (customMenu?.targetElement) {
        const el = customMenu.targetElement as HTMLInputElement | HTMLTextAreaElement;
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          const start = el.selectionStart || 0;
          const end = el.selectionEnd || 0;
          const val = el.value || "";
          el.value = val.substring(0, start) + text + val.substring(end);
          el.dispatchEvent(new Event("input", { bubbles: true }));
          showToast("✓ Metin yapıştırıldı!", "success");
        }
      }
    } catch {
      showToast("Lütfen yapıştırmak için Ctrl + V tuşlarını kullanınız.", "info");
    }
    setCustomMenu(null);
  };

  return (
    <>
      {children}

      {/* SECURE IN-PAGE CUSTOM CONTEXT MENU (NO INSPECT OPTION) */}
      {customMenu && (
        <div
          style={{ top: `${customMenu.y}px`, left: `${customMenu.x}px` }}
          className="fixed z-[99999] bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 py-1.5 px-1 min-w-[170px] animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
            <span>İşlemler</span>
            <Lock className="w-3 h-3 text-emerald-400" />
          </div>

          {customMenu.selectedText && (
            <button
              type="button"
              onClick={handleCopy}
              className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-slate-800 hover:text-emerald-300 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kopyala</span>
              <span className="ml-auto text-[10px] text-slate-500 font-mono">Ctrl+C</span>
            </button>
          )}

          {customMenu.isInput && (
            <button
              type="button"
              onClick={handlePaste}
              className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-slate-800 hover:text-sky-300 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-sky-400" />
              <span>Yapıştır</span>
              <span className="ml-auto text-[10px] text-slate-500 font-mono">Ctrl+V</span>
            </button>
          )}

          <div className="mt-1 pt-1 border-t border-slate-800 px-3 py-1 text-[9px] text-slate-500 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Telif Korumalı İçerik</span>
          </div>
        </div>
      )}

      {/* DEVTOOLS BLACKOUT SHIELD (Triggers if user somehow opens DevTools) */}
      {isDevToolsOpen && (
        <div className="fixed inset-0 z-[999999] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6 text-center text-white animate-in fade-in duration-200">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border-2 border-rose-500 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-rose-400 tracking-tight">
              Geliştirici Konsolu Engellendi
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Bu web uygulamasının tüm tasarım, veri yapısı ve kaynak kodları <strong>5846 sayılı Fikir ve Sanat Eserleri Kanunu</strong> kapsamında tescillidir.
            </p>
            <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-amber-300 font-bold space-y-1">
              <p>⚠️ Devam etmek için lütfen tarayıcınızın <u>İncele (DevTools)</u> penceresini kapatınız.</p>
              <p className="text-[10px] text-slate-400 font-normal">Pencere kapatıldığında sayfa otomatik olarak açılacaktır.</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Security / Copyright Toast */}
      {warningMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm pointer-events-none">
          <div
            className={`text-white p-4 rounded-2xl shadow-2xl border-2 flex items-start gap-3 ${
              warningMessage.type === "success"
                ? "bg-slate-900/95 border-emerald-500"
                : warningMessage.type === "warning"
                ? "bg-slate-900/95 border-rose-500"
                : "bg-slate-900/95 border-amber-500"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                warningMessage.type === "success"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : warningMessage.type === "warning"
                  ? "bg-rose-500/20 text-rose-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              {warningMessage.type === "success" ? (
                <Check className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  {warningMessage.type === "success" ? "İşlem Başarılı" : "Telif & Kaynak Koruması"}
                </span>
                <Lock className="w-3 h-3 text-slate-400" />
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {warningMessage.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
