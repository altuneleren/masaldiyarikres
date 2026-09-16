import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ClassesSection from "@/components/landing/ClassesSection";
import DailyFlow from "@/components/landing/DailyFlow";
import WeeklyMenu from "@/components/landing/WeeklyMenu";
import MediaGallery from "@/components/landing/MediaGallery";
import TeachersSection from "@/components/landing/TeachersSection";
import PreRegisterForm from "@/components/landing/PreRegisterForm";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#fffdf9]">
      <Navbar />
      <Hero />
      <Features />
      <ClassesSection />
      <DailyFlow />
      <WeeklyMenu />
      <MediaGallery />
      <TeachersSection />
      <PreRegisterForm />
      <Footer />
    </main>
  );
}
