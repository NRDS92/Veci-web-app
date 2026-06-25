"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import screen1 from "../../../images/screen1.webp";
import screen2 from "../../../images/screen2.webp";
import screen3 from "../../../images/screen3.webp";
import screen4 from "../../../images/screen4.webp";
import PhoneMockup from "../hero/PhoneMockup";

type Step = {
  id: number;
  title: string;
  icon: string;
  description: string;
  image: StaticImageData;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Descubre",
    icon: "fa-magnifying-glass",
    description:
      "Encuentra eventos, restaurantes y negocios latinos cerca de ti.",
    image: screen1,
  },
  {
    id: 2,
    title: "Conecta",
    icon: "fa-users",
    description:
      "Conoce personas y comunidades que comparten tu cultura.",
    image: screen2,
  },
  {
    id: 3,
    title: "Participa",
    icon: "fa-calendar-days",
    description:
      "Asiste a eventos oficiales o creados por la comunidad.",
    image: screen3,
  },
  {
    id: 4,
    title: "Crece",
    icon: "fa-chart-line",
    description:
      "Promociona tu negocio y llega a más personas.",
    image: screen4,
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="text-center max-w-3xl mx-auto mb-5">
          <span
            className="
              inline-flex
              rounded-full
              bg-[#F3EBDD]
              px-4
              py-2
              text-sm
              font-medium
              mb-6
            "
          >
            Cómo funciona
          </span>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-[0.95]
            "
          >
            Todo comienza
            <br />
            con un evento.
          </h2>

          <p
            className="
              mt-8
              text-xl
              text-neutral-600
            "
          >
            Descubre lo que ocurre cerca de ti,
            conecta con tu comunidad
            y encuentra nuevas oportunidades.
          </p>
        </div>

        {/* CONTENT */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >
          {/* LEFT */}

          <div className="space-y-10">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className="
                  flex
                  gap-6
                  text-left
                  w-full
                "
              >
                <div
                  className={`
                    h-14
                    w-14
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all

                    ${
                      active === index
                        ? "bg-[#FF7A00] text-white shadow-lg"
                        : "bg-white border border-black/10"
                    }
                  `}
                >
                  <i
                    className={`fa-solid ${step.icon} text-xl`}
                  />
                </div>

                <div>
                  <h3
                    className={`
                      text-2xl
                      font-bold

                      ${
                        active === index
                          ? "text-black"
                          : "text-neutral-400"
                      }
                    `}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`
                      mt-2

                      ${
                        active === index
                          ? "text-neutral-600"
                          : "text-neutral-400"
                      }
                    `}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* RIGHT */}

          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[active].id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  rounded-[40px]
                  overflow-hidden
                  shadow-2xl
                  bg-white
                  border
                  border-black/5
                "
              >
                <div className="flex justify-center">
  <AnimatePresence mode="wait">
    <motion.div
      key={steps[active].id}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <PhoneMockup
        image={steps[active].image}
      />
    </motion.div>
  </AnimatePresence>
</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}