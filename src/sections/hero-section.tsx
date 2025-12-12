'use client';

import { FaCirclePlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const { user, loading } = useAuth();
    const router = useRouter();

    return (
        <>
            <motion.div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none"
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[5px]"
                >
                    <source src="/assets/bg-video.mp4" type="video/mp4" />
                </video>
            </motion.div>
            
            <motion.section className="flex flex-col items-center">
                <motion.div className="flex items-center gap-3 mt-32"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p>AI-Powered Trading Signals</p>
                    <button className="btn glass py-1 px-3 text-xs">
                        Free Plan
                    </button>
                </motion.div>
                <motion.h1 className="text-center text-4xl/13 md:text-6xl/19 mt-4 font-semibold tracking-tight max-w-3xl"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    Make Smarter Trading Decisions with AI
                </motion.h1>
                <motion.p className="text-center text-gray-100 text-base/7 max-w-md mt-6"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    Get instant buy, sell, and hold signals powered by technical analysis and machine learning. Trade with confidence.
                </motion.p>

                <motion.div className="flex flex-col md:flex-row max-md:w-full items-center gap-4 md:gap-3 mt-6"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <button 
                        onClick={() => {
                            if (!loading) {
                                if (user) {
                                    router.push('/dashboard');
                                } else {
                                    router.push('/auth/signup');
                                }
                            }
                        }}
                        className="btn max-md:w-full glass py-3"
                    >
                        {!loading && user ? 'Go to Dashboard' : 'Get Started Free'}
                    </button>
                    <button className="btn max-md:w-full glass flex items-center justify-center gap-2 py-3">
                        <FaCirclePlay className="size-4.5" />
                        Watch Demo
                    </button>
                </motion.div>
            </motion.section>
        </>
    );
}

