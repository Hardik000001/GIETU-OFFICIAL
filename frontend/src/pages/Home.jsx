import React from "react";
import Hero from "../components/home/Hero";
import EventSection from "../components/home/EventSection";
import NoticeAnnouncementSection from "../components/home/NoticeAnnouncementSection";
import HodMessage from "../components/home/HodMessage";
import ToppersSection from "../components/home/ToppersSection";
import GallerySection from "../components/home/GallerySection";

function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <EventSection />
      <NoticeAnnouncementSection />
      <HodMessage />
      <ToppersSection />
      <GallerySection />
    </div>
  );
}

export default Home;
