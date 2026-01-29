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

  const handleViewCertificate = (imageUrl: string) => {
    console.log("Opening certificate:", imageUrl);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setSelectedImage(null);
  };

  return (
    <>
      <section className="py-24 px-4 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
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

          {/* Certifications List */}
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Issued by {cert.issuer} • {cert.date}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    {cert.image && (
                      <button
                        type="button"
                        onClick={() =>
                          handleViewCertificate(cert.image as string)
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors cursor-pointer pointer-events-auto relative z-20"
                      >
                        <ImageIcon className="w-4 h-4" />
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <CertificateModal imageSrc={selectedImage} onClose={handleCloseModal} />
      )}
    </>
  );
}
