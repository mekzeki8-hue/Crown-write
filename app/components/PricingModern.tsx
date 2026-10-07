"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Basic",
    description: "Perfect for occasional use",
    monthly: 5.99,
    yearly: 35.88,
    popular: false,
    features: [
      "10,000 words/month",
      "Up to 600 words per request",
      "1 free re-humanization",
      "Basic humanization engine",
      "Standard processing priority",
      "Bypass all AI detectors",
      "3 tone options",
      "Email support",
    ],
    monthlyId: process.env.NEXT_PUBLIC_POLAR_BASIC_MONTHLY,
    yearlyId: process.env.NEXT_PUBLIC_POLAR_BASIC_YEARLY,
    gradient: "from-blue-500 to-cyan-500",
    icon: "📘",
  },
  {
    name: "Pro",
    description: "Best for content creators",
    monthly: 19.99,
    yearly: 119.88,
    popular: true,
    features: [
      "50,000 words/month",
      "Up to 2,000 words per request",
      "2 free re-humanizations",
      "Advanced humanization engine",
      "High processing priority",
      "Ultra Mode access",
      "All tone options",
      "Priority email support",
    ],
    monthlyId: process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY,
    yearlyId: process.env.NEXT_PUBLIC_POLAR_PRO_YEARLY,
    gradient: "from-brand-500 to-brand-700",
    icon: "👑",
  },
  {
    name: "Max",
    description: "For power users & teams",
    monthly: 39.99,
    yearly: 239.88,
    popular: false,
    features: [
      "Unlimited words/month",
      "Up to 3,000 words per request",
      "3 free re-humanizations",
      "Premium humanization engine",
      "Priority processing (always first)",
      "Ultra Mode included",
      "All features unlocked",
      "API access",
      "Dedicated support",
    ],
    monthlyId: process.env.NEXT_PUBLIC_POLAR_MAX_MONTHLY,
    yearlyId: process.env.NEXT_PUBLIC_POLAR_MAX_YEARLY,
    gradient: "from-purple-500 to-pink-500",
    icon: "⚡",
  },
];

export default function PricingModern() {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (productId: string | undefined, planName: string) => {
    if (!productId) {
      alert("Product not configured yet. Please contact support.");
      return;
    }

    setLoading(planName);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Checkout failed");
      }

      const { checkoutUrl } = await res.json();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to start checkout");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-warm-50 via-white to-warm-50 dark:from-warm-900 dark:via-warm-800 dark:to-warm-900 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 dark:text-warm-50 mb-4">
            Choose Your <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Power Plan</span>
          </h2>
          <p className="text-lg md:text-xl text-warm-600 dark:text-warm-400 max-w-2xl mx-auto mb-8">
            Transparent pricing. No hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-white/80 dark:bg-warm-800/80 backdrop-blur-xl rounded-full border border-warm-200 dark:border-warm-700 shadow-soft">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                !isYearly
                  ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-brand"
                  : "text-warm-700 dark:text-warm-300 hover:text-brand-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                isYearly
                  ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-brand"
                  : "text-warm-700 dark:text-warm-300 hover:text-brand-600"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                -40%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => {
            const price = isYearly ? (plan.yearly / 12).toFixed(2) : plan.monthly.toFixed(2);
            const productId = isYearly ? plan.yearlyId : plan.monthlyId;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative group ${
                  plan.popular ? "md:-mt-4 md:mb-4" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-bold rounded-full shadow-brand">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`relative h-full p-8 rounded-3xl backdrop-blur-2xl border-2 transition-all duration-300 ${
                  plan.popular
                    ? "bg-white/90 dark:bg-warm-900/90 border-brand-400 dark:border-brand-600 shadow-brand-lg"
                    : "bg-white/60 dark:bg-warm-900/60 border-warm-200 dark:border-warm-700 shadow-large hover:shadow-xl hover:border-brand-300"
                }`}>
                  
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{plan.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-warm-900 dark:text-warm-50">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-warm-600 dark:text-warm-400">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-warm-900 dark:text-warm-50">
                        ${price}
                      </span>
                      <span className="text-warm-600 dark:text-warm-400">
                        /mo
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mt-1">
                        Billed ${plan.yearly.toFixed(2)} yearly
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleCheckout(productId, plan.name)}
                    disabled={loading === plan.name}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-brand hover:shadow-brand-lg"
                        : "bg-warm-100 dark:bg-warm-800 text-brand-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading === plan.name ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Get Started"
                    )}
                  </motion.button>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-warm-700 dark:text-warm-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-warm-600 dark:text-warm-400"
        >
          All plans include 14-day money-back guarantee • Secure checkout via Polar
        </motion.p>

      </div>
    </section>
  );
}
