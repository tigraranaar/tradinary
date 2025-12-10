'use client';

import SectionTitle from "@/components/section-title";
import { FaCheck, FaCrown, FaGift, FaBolt } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPlans() {
    const data = [
        {
            icon: FaGift,
            title: 'Free',
            description: 'Perfect for getting started',
            price: '$0',
            buttonText: 'Get Started',
            features: [
                'Full technical analysis',
                'Buy/Sell/Hold signals',
                'Basic market insights',
                'Limited signals per day',
                'Community support',
                'Email notifications'
            ],
        },
        {
            icon: FaBolt,
            title: 'Pro',
            description: 'For serious traders',
            price: '$29',
            mostPopular: true,
            buttonText: 'Upgrade Now',
            features: [
                'Everything in Free',
                'ML-powered signals',
                'Enhanced accuracy',
                'Unlimited signals',
                'Advanced analytics',
                'Priority support'
            ],
        },
        {
            icon: FaCrown,
            title: 'Premium',
            description: 'Maximum AI power',
            price: null,
            buttonText: 'Contact Sales',
            features: [
                'Everything in Pro',
                'Multiple AI models',
                'Highest accuracy signals',
                'Real-time alerts',
                'Custom strategies',
                '24/7 premium support'
            ],
        },
    ];

    return (
        <section className="mt-32">
            <SectionTitle
                title="Choose Your Plan"
                description="Start with our free plan and upgrade as you grow. All plans include AI-powered trading signals to help you make better decisions."
            />

            <div className='mt-12 flex flex-wrap items-center justify-center gap-6'>
                {data.map((item, index) => (
                    <motion.div key={index} className='group w-full max-w-80 glass p-6 rounded-xl hover:-translate-y-0.5 transition duration-300'
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <div className="flex items-center w-max ml-auto text-xs gap-2 glass rounded-full px-3 py-1">
                            <item.icon className='size-3.5' />
                            <span>{item.title}</span>
                        </div>
                        <h3 className='mt-4 text-2xl font-semibold'>
                            {item.price ? (
                                <>
                                    {item.price} <span className='text-sm font-normal'>/month</span>
                                </>
                            ) : (
                                <span className='text-lg'>Contact for pricing</span>
                            )}
                        </h3>
                        <p className='text-gray-200 mt-3'>{item.description}</p>
                        {item.buttonText === 'Contact Sales' ? (
                            <Link href="/contact" className={`mt-7 rounded-md w-full btn ${item.mostPopular ? 'bg-white text-gray-800' : 'glass'} block text-center`}>
                                {item.buttonText}
                            </Link>
                        ) : (
                            <button className={`mt-7 rounded-md w-full btn ${item.mostPopular ? 'bg-white text-gray-800' : 'glass'}`}>
                                {item.buttonText}
                            </button>
                        )}
                        <div className='mt-6 flex flex-col'>
                            {item.features.map((feature, index) => (
                                <div key={index} className='flex items-center gap-2 py-2'>
                                    <div className='rounded-full glass border-0 p-1'>
                                        <FaCheck className='size-3 text-white' />
                                    </div>
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

