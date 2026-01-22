"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Play,
  AlertTriangle,
  Server,
  Info,
} from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  projectTitle: string;
  demoUrl: string;
  hasDemoVideo: boolean;
  isAwsHosted?: boolean;
}

export default function DemoModal({
  isOpen,
  onClose,
  onProceed,
  projectTitle,
  demoUrl,
  hasDemoVideo,
  isAwsHosted = false,
}: DemoModalProps) {
  const hasLiveDemo = !!demoUrl;

  const scrollToVideo = () => {
    onClose();
    setTimeout(() => {
      // Find the "Demo Video" heading and scroll to it
      const headings = Array.from(document.querySelectorAll("h2"));
      const videoHeading = headings.find(
        (h2) => h2.textContent === "Demo Video",
      );

      if (videoHeading) {
        videoHeading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative"
            >
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-gray-800/50">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${hasLiveDemo ? "bg-amber-500/20" : "bg-gray-800"}`}
                  >
                    {hasLiveDemo ? (
                      isAwsHosted ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <ExternalLink className="w-5 h-5 text-amber-500" />
                      )
                    ) : (
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {hasLiveDemo ? "Demo Access" : "Demo Unavailable"}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">{projectTitle}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {hasLiveDemo ? (
                  <>
                    {/* AWS Specific Content */}
                    {isAwsHosted ? (
                      <>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <div className="flex items-start gap-3">
                            <Server className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-amber-200 text-sm font-medium">
                                AWS Free Tier Hosting
                              </p>
                              <p className="text-amber-200/70 text-sm leading-relaxed">
                                This project is hosted on AWS free tier. The
                                server may take
                                <span className="font-semibold text-amber-200">
                                  {" "}
                                  30-60 seconds to wake up
                                </span>{" "}
                                if it has been inactive.
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                          If you don't find the website working, please come
                          back to see the video demo.
                        </p>
                      </>
                    ) : (
                      /* Non-AWS Content (Vercel etc) */
                      <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-gray-300 text-sm leading-relaxed">
                            You are about to view the live demo. The application
                            is hosted on Vercel and should be ready instantly.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Video Suggestion */}
                    {hasDemoVideo && (
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Play className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-blue-200 text-sm font-medium">
                              {isAwsHosted
                                ? "Watch the Video Instead?"
                                : "Prefer a Walkthrough?"}
                            </p>
                            <p className="text-blue-200/70 text-sm leading-relaxed">
                              {isAwsHosted
                                ? "If the demo is taking too long or unreachable, check out the demo video below."
                                : "You can also watch the video demonstration below to see all features in action."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
                      <p className="text-gray-300 text-sm font-medium mb-1">
                        Live Demo Not Available
                      </p>
                      <p className="text-gray-500 text-sm">
                        The live preview for this project is currently not
                        hosted or under maintenance.
                      </p>
                    </div>

                    {hasDemoVideo && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Play className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-emerald-200 text-sm font-medium">
                              Good news!
                            </p>
                            <p className="text-emerald-200/70 text-sm leading-relaxed">
                              A complete walk-through video is available. Watch
                              it to see all the features and functionality.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 flex gap-3">
                {hasLiveDemo ? (
                  <>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 rounded-xl text-gray-300 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onProceed}
                      className="flex-1 px-4 py-3 bg-white hover:bg-gray-100 active:scale-[0.98] rounded-xl text-black font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Demo
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 rounded-xl text-gray-300 font-medium transition-colors"
                    >
                      Close
                    </button>
                    {hasDemoVideo && (
                      <button
                        onClick={scrollToVideo}
                        className="flex-1 px-4 py-3 bg-white hover:bg-gray-100 active:scale-[0.98] rounded-xl text-black font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Watch Video
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
