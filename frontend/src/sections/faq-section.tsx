'use client';

import SectionTitle from '@/components/section-title';
import { FaChevronDown } from 'react-icons/fa6';
import { useState } from 'react';
import { motion } from "framer-motion";

export default function FaqSection() {
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const data = [
        {
            question: 'How does the free version work?',
            answer: 'The free version provides comprehensive technical analysis to generate buy, sell, and hold trading signals. You get access to full technical indicators and market analysis tools.',
        },
        {
            question: 'What is included in the Pro version?',
            answer: 'Pro version includes everything from the free plan plus our advanced machine learning model that enhances signal accuracy with predictive insights and improved trading recommendations.',
        },
        {
            question: 'What makes Premium different from Pro?',
            answer: 'Premium includes technical analysis, ML-powered signals, plus multiple AI models working together to provide comprehensive market intelligence and the most accurate trading signals.',
        },
        {
            question: 'How accurate are the trading signals?',
            answer: 'Signal accuracy improves with each tier. Free version uses technical analysis, Pro adds ML model predictions, and Premium combines multiple AI models for the highest accuracy.',
        },
        {
            question: 'Do I need trading experience to use Tradinary?',
            answer: 'No prior trading experience is required. Our AI assistant provides clear buy/sell/hold signals that are easy to understand, making it suitable for both beginners and experienced traders.',
        },
        {
            question: 'Can I try Tradinary before subscribing?',
            answer: 'Yes, you can start with our free version that includes full technical analysis and trading signals. Upgrade to Pro or Premium anytime to unlock advanced features.',
        },
    ];

    return (
        <section className='mt-32'>
            <SectionTitle title="FAQ's" description="Have questions about Tradinary? Find answers to common questions about our AI trading assistant and subscription plans." />
            <div className='mx-auto mt-12 space-y-4 w-full max-w-xl'>
                {data.map((item, index) => (
                    <motion.div key={index} className='flex flex-col glass rounded-md'
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <h3 className='flex cursor-pointer hover:bg-white/10 transition items-start justify-between gap-4 p-4 font-medium' onClick={() => setIsOpen(isOpen === index ? null : index)}>
                            {item.question}
                            <FaChevronDown className={`size-5 transition-all shrink-0 duration-400 ${isOpen === index ? 'rotate-180' : ''}`} />
                        </h3>
                        <p className={`px-4 text-sm/6 transition-all duration-400 overflow-hidden ${isOpen === index ? 'pt-2 pb-4 max-h-80' : 'max-h-0'}`}>{item.answer}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

