import { FaGithub, FaLinkedin, FaXTwitter, FaGlobe } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const links = [
    { name: "Contact", href: "/contact" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ];
  return (
    <footer className="glass flex w-full flex-col items-center justify-center border-0 px-4 pt-16 md:px-16 lg:px-24">
      <Image
        src="/assets/logo.svg"
        alt="logo"
        width={0}
        height={0}
        className="h-8.5 w-auto"
        style={{ height: "2.125rem", width: "auto" }}
        unoptimized
      />

      <div className="flex flex-wrap items-center justify-center gap-8 py-8">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="transition hover:text-gray-300">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-6 pb-6">
        <a href="#" className="text-gray-200 transition-all duration-300 hover:-translate-y-0.5">
          <FaGlobe />
        </a>
        <a href="#" className="text-gray-200 transition-all duration-300 hover:-translate-y-0.5">
          <FaLinkedin />
        </a>
        <a href="#" className="text-gray-200 transition-all duration-300 hover:-translate-y-0.5">
          <FaXTwitter />
        </a>
        <a href="#" className="text-gray-200 transition-all duration-300 hover:-translate-y-0.5">
          <FaGithub />
        </a>
      </div>
      <hr className="mt-6 w-full border-white/20" />
      <div className="flex w-full flex-col items-center justify-between gap-4 py-4 md:flex-row">
        <p>Trade with your AI assistant</p>
        <p>Copyright © 2026 Tradinary. All rights reservered.</p>
      </div>
    </footer>
  );
}
