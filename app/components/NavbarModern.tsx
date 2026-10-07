"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";

export default function NavbarModern() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-warm-900/80 backdrop-blur-2xl shadow-large border-b border-warm-200/50 dark:border-warm-700/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center shadow-brand">
                  <Logo size={28} light />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 dark:from-brand-400 dark:to-brand-600 bg-clip-text text-transparent">
                CrownWrite
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-warm-700 dark:text-warm-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <a
                    href="#workspace"
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:scale-105"
                  >
                    Workspace
                  </a>
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-500 rounded-full blur-md opacity-30" />
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 ring-2 ring-brand-500 ring-offset-2",
                        },
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <a
                    href="/sign-in"
                    className="px-6 py-2.5 text-brand-700 dark:text-brand-400 font-semibold hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                  >
                    Sign In
                  </a>
                  <motion.a
                    href="/sign-up"
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free
                  </motion.a>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-warm-700 dark:text-warm-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-warm-900/95 backdrop-blur-2xl border-b border-warm-200 dark:border-warm-700 shadow-large"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-warm-700 dark:text-warm-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 border-t border-warm-200 dark:border-warm-700 space-y-3">
                {isSignedIn ? (
                  <>
                    <a
                      href="#workspace"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl text-center shadow-brand"
                    >
                      Go to Workspace
                    </a>
                    <div className="flex items-center justify-center gap-3 px-4 py-3">
                      <span className="text-sm text-warm-600 dark:text-warm-400">
                        {user?.emailAddresses[0]?.emailAddress}
                      </span>
                      <UserButton />
                    </div>
                  </>
                ) : (
                  <>
                    <a
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-center text-brand-700 dark:text-brand-400 font-semibold hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-xl transition-all"
                    >
                      Sign In
                    </a>
                    <a
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl text-center shadow-brand"
                    >
                      Start Free
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
