"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-32 px-6 relative">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF7A00]/10 blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#121826] to-[#0B0F1A] border border-[#1f2937] rounded-3xl p-14 shadow-[0_0_80px_rgba(255,122,0,0.1)]"
        >

          {/* 🧠 HEADLINE */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Join the Latin community in Europe
          </h2>

          {/* 🧾 SUBTEXT */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover events, promote your business, and connect with your culture.
            VECI is where Latin life happens abroad.
          </p>

          {/* 🔥 BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">

            {/* PRIMARY */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF7A00] px-10 py-4 rounded-xl font-semibold text-lg shadow-[0_0_40px_rgba(255,122,0,0.4)]"
            >
              Explore events
            </motion.button>

            {/* SECONDARY */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border border-[#1f2937] px-10 py-4 rounded-xl text-gray-300 hover:border-[#FF7A00]/40"
            >
              Create event
            </motion.button>

            {/* DONATE */}
            <motion.a
              href="https://buymeacoffee.com/tuusuario"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="bg-pink-600 px-10 py-4 rounded-xl font-semibold"
            >
              ❤️ Support VECI
            </motion.a>

          </div>

        </motion.div>
      </div>
    </section>
  );
}