'use client';
import { FaGithub, FaLinkedin, FaXTwitter, FaGlobe } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
    const links = [
        { name: 'Contact', href: '/contact' },
        { name: 'Terms of Use', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
    ];
    return (
        <motion.footer className="flex flex-col items-center px-4 md:px-16 lg:px-24 justify-center w-full pt-16 glass border-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
                <Image 
                    src='/assets/logo.svg' 
                    alt='logo' 
                    width={0} 
                    height={0} 
                    className='h-8.5 w-auto' 
                    style={{ height: "2.125rem", width: "auto" }}
                    unoptimized
                />

            <div className="flex flex-wrap items-center justify-center gap-8 py-8">
                {links.map((link, index) => (
                    <Link key={index} href={link.href} className='transition hover:text-gray-300'>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-6 pb-6">
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <FaGlobe />
                </a>
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <FaLinkedin />
                </a>
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <FaXTwitter />
                </a>
                <a href="#" className="hover:-translate-y-0.5 text-gray-200 transition-all duration-300">
                    <FaGithub />
                </a>
            </div>
            <hr className="w-full border-white/20 mt-6" />
            <div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 py-4">
                <p>Trade with your AI assistant</p>
                <p>Copyright © 2026 Tradinary. All rights reservered.</p>
            </div>
        </motion.footer>
    );
}

