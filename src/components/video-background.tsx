"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Video background component for hero section
 * - Mobile (< 768px): shows only poster image
 * - Desktop: plays video with fallback to poster on error
 */
export default function VideoBackground() {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      initial={{ opacity: 0.4 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Poster fallback - shown on mobile or when video fails */}
      <div
        className={`absolute inset-0 h-full w-full bg-cover bg-center opacity-30 blur-[5px] ${
          videoError ? "" : "md:hidden"
        }`}
        style={{ backgroundImage: "url(/assets/bg-video-poster.webp)" }}
        aria-hidden="true"
      />

      {/* Video - hidden on mobile, shown on desktop */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/bg-video-poster.webp"
          onError={handleVideoError}
          className="absolute inset-0 hidden h-full w-full object-cover opacity-30 blur-[5px] md:block"
          aria-hidden="true"
        >
          <source src="/assets/bg-video.webm" type="video/webm" />
          <source src="/assets/bg-video.mp4" type="video/mp4" />
        </video>
      )}
    </motion.div>
  );
}
