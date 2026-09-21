"use client";

import React from "react";
import { AppProvider } from "@/context/AppContext";
import SourceProtectionProvider from "@/components/SourceProtectionProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <SourceProtectionProvider>{children}</SourceProtectionProvider>
    </AppProvider>
  );
}
