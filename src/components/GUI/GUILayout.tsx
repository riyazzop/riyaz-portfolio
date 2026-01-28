"use client";

import dynamic from "next/dynamic";
import { motion, useScroll } from "framer-motion";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Blog from "./Blog";
import ActivityStats from "./ActivityStats";
import Certifications from "./Certifications";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";

// Lazy load global particles for performance
const GlobalParticles = dynamic(
  () => import("@/components/Three/GlobalParticles"),
  { ssr: false },
);

export default function GUILayout() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-black relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-gray-400 to-white origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      {/* Global subtle particle background */}
      <GlobalParticles />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      < ActivityStats />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
