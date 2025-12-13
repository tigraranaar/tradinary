"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

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
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Poster fallback - shown on mobile or when video fails */}
      <div
        className={`absolute inset-0 h-full w-full ${videoError ? "" : "md:hidden"}`}
        aria-hidden="true"
      >
        <Image
          src="/assets/bg-video-poster.webp"
          alt="Trading platform interface background"
          fill
          priority
          className="object-cover opacity-30 blur-[5px]"
          sizes="100vw"
        />
      </div>

      {/* Video - hidden on mobile, shown on desktop */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
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
