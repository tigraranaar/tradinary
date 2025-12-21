"use client";

import VideoBackground from "@/components/video-background";

export default function HeroSection() {
  return (
    <>
      <VideoBackground />

      <section className="flex flex-col items-center">
        <div className="mt-32 flex items-center gap-3">
          <p>AI-Powered Trading Signals</p>
          <button className="btn glass px-3 py-1 text-xs">Free Plan</button>
        </div>
        <h1 className="mt-4 max-w-3xl text-center text-4xl/13 font-semibold tracking-tight md:text-6xl/19">
          Make Smarter Trading Decisions with AI
        </h1>
        <p className="mt-6 max-w-md text-center text-base/7 text-gray-100">
          Get instant buy, sell, and hold signals powered by technical analysis and machine
          learning. Trade with confidence.
        </p>
      </section>
    </>
  );
}
