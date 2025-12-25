"use client";

import { FaBars, FaX } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  const publicLinks = [
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];
  const privateLinks = [{ name: "Dashboard", href: "/dashboard" }];

  useEffect(() => {
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Don't track scroll for dashboard routes
    if (isDashboardRoute) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    router.push("/");
    router.refresh();
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {isDashboardRoute ? (
        <nav
          className="bg-background sticky top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 md:px-16 lg:px-24"
          suppressHydrationWarning
        >
          <Link href="/" suppressHydrationWarning>
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={0}
              height={0}
              className="h-14 w-auto"
              style={{ height: "3.5rem", width: "auto" }}
              loading="eager"
              unoptimized
              suppressHydrationWarning
            />
          </Link>

          <div className="hidden items-center space-x-10 md:flex" suppressHydrationWarning>
            {publicLinks.map((link) => (
              <Link key={link.name} href={link.href} className="transition hover:text-gray-300">
                {link.name}
              </Link>
            ))}
            {!loading &&
              user &&
              privateLinks.map((link) => (
                <Link key={link.name} href={link.href} className="transition hover:text-gray-300">
                  {link.name}
                </Link>
              ))}
            {!loading &&
              (user ? (
                <div className="user-menu-container relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="btn flex items-center gap-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-medium">
                      {getInitials(user.email || "U")}
                    </div>
                    <span className="hidden lg:inline">{user.email?.split("@")[0]}</span>
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass absolute right-0 mt-2 w-48 rounded-lg border border-white/20 p-2"
                      >
                        <button
                          onClick={handleSignOut}
                          className="w-full cursor-pointer rounded px-3 py-2 text-left text-sm transition hover:bg-white/10"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="transition hover:text-gray-300">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn glass">
                    Sign Up
                  </Link>
                </>
              ))}
          </div>

          <button onClick={() => setIsOpen(true)} className="transition active:scale-90 md:hidden">
            <FaBars className="size-6.5" />
          </button>
        </nav>
      ) : (
        <motion.nav
          className={`sticky top-0 z-50 flex w-full items-center justify-between px-4 py-3.5 transition-colors md:px-16 lg:px-24 ${isScrolled ? "bg-white/15 backdrop-blur-lg" : ""}`}
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
          suppressHydrationWarning
        >
          <Link href="/" suppressHydrationWarning>
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={0}
              height={0}
              className="h-14 w-auto"
              style={{ height: "3.5rem", width: "auto" }}
              loading="eager"
              unoptimized
              suppressHydrationWarning
            />
          </Link>

          <div className="hidden items-center space-x-10 md:flex" suppressHydrationWarning>
            {publicLinks.map((link) => (
              <Link key={link.name} href={link.href} className="transition hover:text-gray-300">
                {link.name}
              </Link>
            ))}
            {!loading &&
              user &&
              privateLinks.map((link) => (
                <Link key={link.name} href={link.href} className="transition hover:text-gray-300">
                  {link.name}
                </Link>
              ))}
            {!loading &&
              (user ? (
                <div className="user-menu-container relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="btn flex items-center gap-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-medium">
                      {getInitials(user.email || "U")}
                    </div>
                    <span className="hidden lg:inline">{user.email?.split("@")[0]}</span>
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass absolute right-0 mt-2 w-48 rounded-lg border border-white/20 p-2"
                      >
                        <button
                          onClick={handleSignOut}
                          className="w-full cursor-pointer rounded px-3 py-2 text-left text-sm transition hover:bg-white/10"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="transition hover:text-gray-300">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn glass">
                    Sign Up
                  </Link>
                </>
              ))}
          </div>

          <button onClick={() => setIsOpen(true)} className="transition active:scale-90 md:hidden">
            <FaBars className="size-6.5" />
          </button>
        </motion.nav>
      )}

      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/20 text-lg font-medium backdrop-blur-2xl transition duration-300 md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        suppressHydrationWarning
      >
        {publicLinks.map((link) => (
          <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
            {link.name}
          </Link>
        ))}
        {!loading &&
          user &&
          privateLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}

        {!loading &&
          (user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-medium">
                  {getInitials(user.email || "U")}
                </div>
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="btn glass"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn glass" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn glass" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          ))}

        <button onClick={() => setIsOpen(false)} className="glass rounded-md p-2">
          <FaX />
        </button>
      </div>
    </>
  );
}
