"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, PlusCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Calendar size={32} />,
      title: "Discover Latin events",
      text: "Find reggaeton parties, salsa nights, and Latin festivals happening in your city across Europe.",
    },
    {
      icon: <Heart size={32} />,
      title: "Save your favorites",
      text: "Keep track of events, places, and experiences you love — all in one place.",
    },
    {
      icon: <PlusCircle size={32} />,
      title: "Promote your business",
      text: "Reach the Latin community directly and grow your audience with targeted events and promotions.",
    },
  ];

  return (
    <section className="py-32 px-6 relative">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px]  blur-[120px]" />

      <div className="max-w-6xl mx-auto">

        {/* 🧠 TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Everything you need in one place
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            VECI connects Latin events, businesses, and people across Europe.
          </p>
        </motion.div>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-gradient-to-br from-[#121826] to-[#0B0F1A] p-10 rounded-2xl border border-[#1f2937] hover:border-[#FF7A00]/40 transition shadow-[0_0_40px_rgba(0,0,0,0.3)]"
            >
              {/* ICON */}
              <div className="mb-6 flex justify-center text-[#FF7A00] group-hover:scale-110 transition">
                {f.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-3">
                {f.title}
              </h3>

              {/* TEXT */}
              <p className="text-gray-400 leading-relaxed">
                {f.text}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}