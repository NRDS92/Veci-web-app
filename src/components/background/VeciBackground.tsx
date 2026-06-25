"use client";

import {
  Coffee,
  Music4,
  Store,
  Users,
  PartyPopper,
  Utensils,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

import { motion, useScroll, useTransform } from "framer-motion";

type City = {
  name: string;
  x: number;
  y: number;
  icons: LucideIcon[];
};

const cities: City[] = [
  // Germany
  { name: "Berlin", x: 68, y: 18, icons: [Users, Music4] },
  { name: "Hamburg", x: 63, y: 10, icons: [PartyPopper] },
  { name: "Munich", x: 68, y: 35, icons: [Store] },
  { name: "Cologne", x: 57, y: 22, icons: [Coffee] },

  // Netherlands
  { name: "Amsterdam", x: 50, y: 18, icons: [Users] },
  { name: "Rotterdam", x: 48, y: 22, icons: [Store] },

  // Belgium
  { name: "Brussels", x: 45, y: 28, icons: [Briefcase] },
  { name: "Antwerp", x: 47, y: 24, icons: [Users] },

  // France
  { name: "Paris", x: 40, y: 35, icons: [Briefcase, Users] },
  { name: "Lyon", x: 44, y: 48, icons: [Utensils] },

  // Spain
  { name: "Madrid", x: 30, y: 70, icons: [Coffee, Store] },
  { name: "Barcelona", x: 42, y: 66, icons: [Music4] },
  { name: "Valencia", x: 38, y: 72, icons: [PartyPopper] },
  { name: "Seville", x: 24, y: 78, icons: [Utensils] },

  // Portugal
  { name: "Lisbon", x: 15, y: 74, icons: [Coffee] },
  { name: "Porto", x: 18, y: 66, icons: [Store] },

  // Italy
  { name: "Milan", x: 55, y: 54, icons: [Briefcase] },
  { name: "Rome", x: 60, y: 68, icons: [Users] },

  // Switzerland
  { name: "Zurich", x: 52, y: 48, icons: [Users] },
  { name: "Geneva", x: 47, y: 52, icons: [Coffee] },

  // Austria
  { name: "Vienna", x: 74, y: 45, icons: [Music4] },
  { name: "Salzburg", x: 70, y: 40, icons: [PartyPopper] },
];

const routes = [
  ["Berlin", "Hamburg"],
  ["Berlin", "Cologne"],
  ["Berlin", "Munich"],
  ["Berlin", "Amsterdam"],

  ["Amsterdam", "Rotterdam"],
  ["Amsterdam", "Brussels"],
  ["Brussels", "Paris"],
  ["Paris", "Lyon"],

  ["Paris", "Geneva"],
  ["Geneva", "Zurich"],
  ["Zurich", "Milan"],

  ["Milan", "Rome"],
  ["Milan", "Vienna"],
  ["Vienna", "Salzburg"],

  ["Paris", "Madrid"],
  ["Madrid", "Barcelona"],
  ["Madrid", "Valencia"],
  ["Madrid", "Seville"],

  ["Madrid", "Lisbon"],
  ["Lisbon", "Porto"],

  ["Barcelona", "Milan"],
  ["Cologne", "Amsterdam"],
  ["Munich", "Vienna"],
];

function city(name: string) {
  return cities.find((c) => c.name === name)!;
}

export default function VeciBackground() {
  const { scrollY } = useScroll();

  const routesY = useTransform(scrollY, [0, 2000], [0, -50]);
  const citiesY = useTransform(scrollY, [0, 2000], [0, -100]);
  const iconsY = useTransform(scrollY, [0, 2000], [0, -150]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FAF9F5]">

      {/* BACKGROUND */}

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#FAF9F5_45%,#F3EBDD_100%)]
        "
      />

      {/* GLOWS */}

      <div className="absolute top-[-300px] left-[-300px] h-[1000px] w-[1000px] rounded-full bg-[#FBBF24]/10 blur-3xl" />

      <div className="absolute bottom-[-400px] right-[-400px] h-[1200px] w-[1200px] rounded-full bg-[#2563EB]/10 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF4444]/5 blur-3xl" />
        <motion.svg
  style={{ y: routesY }}
  viewBox="0 0 1000 700"
  className="
    absolute
    inset-0
    w-full
    h-full
    opacity-[0.03]
  "
>
  <path
    d="
      M250 150
      C320 120 420 120 500 160
      C580 200 640 240 720 230
      C800 220 850 260 840 330
      C830 390 760 420 720 470
      C680 520 620 560 540 570
      C460 580 370 550 300 500
      C220 450 180 380 170 300
      C160 230 190 180 250 150
      Z
    "
    fill="#2563EB"
  />
</motion.svg>
      {/* ROUTES */}

      <motion.svg
        style={{ y: routesY }}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {routes.map(([from, to]) => {
          const start = city(from);
          const end = city(to);

          const cx = (start.x + end.x) / 2;
          const cy = Math.min(start.y, end.y) - 6;

          return (
            <path
              key={`${from}-${to}`}
              d={`
                M ${start.x}% ${start.y}%
                Q ${cx}% ${cy}%
                ${end.x}% ${end.y}%
              `}
              fill="none"
              stroke="#2563EB"
              strokeWidth="1"
              opacity="0.12"
            />
          );
        })}
      </motion.svg>

      {/* CITIES */}

      <motion.div
        style={{ y: citiesY }}
        className="absolute inset-0"
      >
        {cities.map((city) => (
          <div
            key={city.name}
            className="absolute"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
            }}
          >
            {/* DOT */}

            <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />

            {/* LABEL */}

            <div
              className="
                absolute
                left-3
                top-[-8px]
                text-[10px]
                font-medium
                text-neutral-400
                whitespace-nowrap
              "
            >
              {city.name}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ICONS */}

      <motion.div
        style={{ y: iconsY }}
        className="absolute inset-0"
      >
        {cities.map((city) => (
          <div
            key={`${city.name}-icons`}
            className="absolute"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
            }}
          >
            {city.icons.map((Icon, index) => {
              const positions = [
                { x: -40, y: -35 },
                { x: 40, y: -20 },
                { x: 0, y: 40 },
              ];

              const pos = positions[index];

              return (
                <div
                  key={index}
                  className="absolute animate-float opacity-20"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <Icon
                    size={28}
                    className="text-[#2563EB]"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}