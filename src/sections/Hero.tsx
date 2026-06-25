"use client";

import { motion } from "framer-motion";
import HeroVisual from "../components/sections/hero/HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
        
        <div>
          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              inline-flex
              items-center
              rounded-full
              bg-[#F3EBDD]
              px-4
              py-2
              text-sm
              font-medium
              mb-8
            "
          >
            🌎 Conectando latinos en toda Europa
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="
              text-5xl
              md:text-7xl
              font-black
              tracking-tight
              leading-[0.95]
            "
          >
            Encuentra tu
            <br />

            <span className="text-[#FF7A00]">
              comunidad latina
            </span>

            <br />
            donde sea que estés.
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="
              mt-8
              max-w-xl
              text-lg
              leading-relaxed
              text-neutral-600
            "
          >
            Descubre eventos, restaurantes, negocios,
            emprendimientos y oportunidades cerca de ti.
            Todo lo que ocurre en la comunidad latina de
            Europa, conectado en una sola plataforma.
          </motion.p>

          {/* CTA */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            <button
              className="
                rounded-xl
                bg-[#FF7A00]
                px-6
                py-4
                text-white
                font-semibold
                shadow-lg
                shadow-blue-500/20
                transition-all
                hover:scale-105
              "
            >
              Explorar Eventos
            </button>

            <button
              className="
                rounded-xl
                border
                border-black/10
                bg-white/80
                backdrop-blur
                px-6
                py-4
                font-semibold
                transition-all
                hover:bg-white
              "
            >
              Registrar Mi Negocio
            </button>
          </motion.div>

          {/* Social proof */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="
              mt-10
              flex
              items-center
              gap-8
              text-sm
              text-neutral-500
            "
          >
            <div>
              <span className="font-bold text-black">
                50+
              </span>
              <br />
              Ciudades
            </div>

            <div>
              <span className="font-bold text-black">
                1000+
              </span>
              <br />
              Eventos
            </div>

            <div>
              <span className="font-bold text-black">
                500+
              </span>
              <br />
              Negocios
            </div>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}