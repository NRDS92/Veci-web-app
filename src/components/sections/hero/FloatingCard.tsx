"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Music4,
  Users,
  Store,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";


type Props = {
  title: string;
  city: string;
  type?: "official" | "community";
  category?: "event" | "business";
  className?: string;
  image: StaticImageData;
};

export default function FloatingCard({
  title,
  city,
  type = "community",
  category = "event",
  className,
  image,
}: Props) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        w-72
        overflow-hidden
        rounded-3xl
        border
        border-black/5
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
        ${className ?? ""}
      `}
    >
      {/* Image */}

      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="288px"
          className="object-cover"
        />

        <div className="absolute right-3 top-3">
          <div
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              text-white

              ${
                type === "official"
                  ? "bg-green-500"
                  : "bg-slate-700"
              }
            `}
          >
            {type === "official"
              ? "Official"
              : "Community"}
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="p-4">
        <div className="flex items-center gap-2">
          {category === "event" ? (
            <Music4
              size={16}
              className="text-[#2563EB]"
            />
          ) : (
            <Store
              size={16}
              className="text-[#2563EB]"
            />
          )}

          <h3 className="font-semibold text-neutral-900">
            {title}
          </h3>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
          <MapPin size={14} />
          {city}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
          <CalendarDays size={14} />
          28 Jun 2026
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Users size={14} />
            120 asistentes
          </div>

          <button
            className="
              rounded-xl
              bg-[#2563EB]
              px-3
              py-2
              text-xs
              font-medium
              text-white
            "
          >
            Ver Evento
          </button>
        </div>
      </div>
    </motion.div>
  );
}