"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Copy,
  Check,
  MapPin,
  Mail,
  Phone,
  Github,
  Code,
} from "lucide-react";
import { personalInfo } from "@/lib/data/personal";
import dynamic from "next/dynamic";

// Lazy load particle background for performance
const ContactParticles = dynamic(
  () => import("@/components/Three/ContactParticles"),
  { ssr: false },
);
import { copyToClipboard } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // Call Web3Forms directly from the browser to avoid Cloudflare blocking
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Portfolio Contact from ${data.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        console.error("Web3Forms error:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 relative overflow-hidden"
      ref={ref}
    >
      {/* Interactive particle background */}
      <ContactParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-white focus:ring-0 outline-none transition-colors text-white"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-white focus:ring-0 outline-none transition-colors text-white"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-white focus:ring-0 outline-none transition-colors resize-none text-white"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <p className="text-green-400 text-center">
                  Message sent successfully! ✓
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-center">
                  Failed to send. Please try again.
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Info cards */}
            <div className="space-y-4">
              <button
                onClick={() => handleCopy(personalInfo.email, "email")}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all group"
              >
                <div className="p-2 rounded-lg bg-white/5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white">{personalInfo.email}</p>
                </div>
                {copiedField === "email" ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>

              <button
                onClick={() => handleCopy(personalInfo.phone, "phone")}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all group"
              >
                <div className="p-2 rounded-lg bg-white/5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-white">{personalInfo.phone}</p>
                </div>
                {copiedField === "phone" ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <div className="p-2 rounded-lg bg-white/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-white">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-gray-500 mb-4">Social Links</p>
              <div className="flex gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800 transition-all"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800 transition-all"
                >
                  <Code className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Response time */}
            <p className="text-sm text-gray-500">
              ⏱️ Response time: Usually within 24 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
