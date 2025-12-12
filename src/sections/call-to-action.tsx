'use client';

import { FaArrowRight, FaChartLine } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function CallToAction() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // For authenticated users
    if (!loading && user) {
        return (
            <motion.div className="flex flex-col max-w-5xl mt-40 px-4 mx-auto items-center justify-center text-center py-16 rounded-xl glass"
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <motion.h2 className="text-2xl md:text-4xl font-medium mt-2"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                Welcome back, {user.email?.split('@')[0]}!
                </motion.h2>
                <motion.p className="mt-4 text-sm/7 max-w-md"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
                >
                    Access your trading signals and analytics. Get AI-powered insights to make smarter trading decisions.
                </motion.p>
                <motion.button 
                    onClick={() => router.push('/dashboard')}
                    className="btn glass transition-none flex items-center gap-2 mt-8"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    Go to Dashboard
                    <FaChartLine className="size-4" />
                </motion.button>
            </motion.div>
        );
    }

    // For non-authenticated users
    return (
        <motion.div className="flex flex-col max-w-5xl mt-40 px-4 mx-auto items-center justify-center text-center py-16 rounded-xl glass"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
            <motion.h2 className="text-2xl md:text-4xl font-medium mt-2"
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                Ready to start trading smarter?
            </motion.h2>
            <motion.p className="mt-4 text-sm/7 max-w-md"
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
            >
                Get AI-powered trading signals and make informed decisions. Start with our free plan, no credit card required.
            </motion.p>
            <motion.button 
                onClick={() => router.push('/auth/signup')}
                className="btn glass transition-none flex items-center gap-2 mt-8"
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                Get Started Free
                <FaArrowRight className="size-4" />
            </motion.button>
        </motion.div>
    );
}

