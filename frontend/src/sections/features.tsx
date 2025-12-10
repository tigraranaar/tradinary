'use client';

import SectionTitle from "@/components/section-title";
import { FaChartLine, FaBrain, FaRobot, FaBolt } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Features() {

    const featuresData = [
        {
            icon: FaChartLine,
            title: "Technical Analysis",
            description: "Comprehensive technical analysis to generate accurate buy, sell, and hold signals.",
        },
        {
            icon: FaBrain,
            title: "ML-Powered Signals",
            description: "Advanced machine learning model enhances signal accuracy with predictive insights.",
        },
        {
            icon: FaRobot,
            title: "Multi-AI Analysis",
            description: "Multiple AI models work together to provide comprehensive market intelligence.",
        },
        {
            icon: FaBolt,
            title: "Real-time Signals",
            description: "Get instant buy/sell/hold recommendations based on live market data analysis.",
        }
    ];

    return (
        <section className="mt-32">
            <SectionTitle
                title="Trading Features"
                description="Advanced AI-powered trading signals to help you make informed decisions and optimize your trading strategy."
            />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="hover:-translate-y-0.5 p-6 rounded-xl space-y-4 glass max-w-80 w-full transition duration-300"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 320,
                            damping: 70,
                            mass: 1
                        }}
                    >
                        <feature.icon className="size-8.5" />
                        <h3 className="text-base font-medium text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-100 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

