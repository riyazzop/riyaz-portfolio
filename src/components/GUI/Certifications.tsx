"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Award, X, Image as ImageIcon } from "lucide-react";
import { certifications } from "@/lib/data/personal";
import { createPortal } from "react-dom";

// Modal component that renders in a portal
function CertificateModal({
  imageSrc,
  onClose,
}: {
  imageSrc: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "900px",
          maxHeight: "90vh",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-50px",
            right: "0",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <X size={32} />
        </button>
        <img
          src={imageSrc}
          alt="Certificate"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleViewCertificate = (imageUrl: string) => {
    console.log("Opening certificate:", imageUrl);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setSelectedImage(null);
  };

  // Duplicate certificates for seamless infinite scroll
  const duplicatedCerts = [...certifications, ...certifications];

  return (
    <>
      <section className="py-24 relative z-10 overflow-hidden" ref={ref}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Certifications
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Professional certifications and achievements
            </p>
          </motion.div>
        </div>

        {/* Infinite scrolling marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-6"
            style={{
              animation: `scroll 30s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running",
              width: "fit-content",
            }}
          >
            {duplicatedCerts.map((cert, index) => (
              <div
                key={`${cert.name}-${index}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="flex-shrink-0 w-[350px] p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 hover:bg-gray-900/80 transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {cert.topics.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                        +{cert.topics.length - 3}
                      </span>
                    )}
                  </div>
                  {cert.image && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCertificate(cert.image as string);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors cursor-pointer mt-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* Modal */}
      {selectedImage && (
        <CertificateModal imageSrc={selectedImage} onClose={handleCloseModal} />
      )}
    </>
  );
}
