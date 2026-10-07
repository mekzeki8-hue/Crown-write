"use client";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function HeroModern() {
  const { isSignedIn } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-warm-50 via-brand-50 to-warm-100">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          
          {/* Trust Badge */}
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-warm-900/80 backdrop-blur-xl rounded-full border border-brand-200/50 dark:border-brand-700/50 shadow-soft hover:shadow-brand transition-all duration-300 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <svg className="relative w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-warm-800 dark:text-warm-200">
                Trusted by <span className="text-brand-600 dark:text-brand-400">1.2M+</span> writers
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="mb-6">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-warm-900 dark:text-warm-50">Transform </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 bg-clip-text text-transparent animate-gradient">
                  AI Text
                </span>
                {/* Underline SVG */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-400/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <motion.path
                    d="M0,5 Q50,2 100,5 T200,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </span>
            <span className="block mt-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-warm-900 dark:text-warm-50">
              Into Human Gold
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl md:text-2xl text-warm-700 dark:text-warm-300 leading-relaxed font-light"
          >
            Bypass all AI detectors with our advanced humanization engine. 
            <span className="block mt-2 font-medium text-brand-700 dark:text-brand-400">
              Undetectable. Natural. Professional.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {!isSignedIn ? (
              <>
                <motion.a
                  href="#workspace"
                  className="group relative px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Start Humanizing Free
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.a>
                <motion.a
                  href="#pricing"
                  className="px-8 py-4 bg-white/80 dark:bg-warm-900/80 backdrop-blur-xl text-brand-700 dark:text-brand-400 font-semibold rounded-2xl border-2 border-brand-300 dark:border-brand-700 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Pricing
                </motion.a>
              </>
            ) : (
              <motion.a
                href="#workspace"
                className="group relative px-10 py-5 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-2xl shadow-brand hover:shadow-brand-lg transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <span className="relative flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Go to Workspace
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.a>
            )}
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white/60 dark:bg-warm-900/60 backdrop-blur-2xl rounded-3xl border border-warm-200/50 dark:border-warm-700/50 shadow-large">
              {[
                { value: "99.9%", label: "Undetectable" },
                { value: "2M+", label: "Words Humanized" },
                { value: "<30s", label: "Processing Time" },
                { value: "14+", label: "AI Detectors Bypassed" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-brand-600 to-brand-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-warm-600 dark:text-warm-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-50 to-transparent dark:from-warm-900 dark:to-transparent" />

    </section>
  );
}
