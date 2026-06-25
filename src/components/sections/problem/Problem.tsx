"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import problemImg from "@/images/personLost.webp";

export default function Problem() {
    return (
        <section className="relative overflow-hidden py-10 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT SIDE */}
            <div className="relative h-187">

            {/* GLOW */}

            <div
                className="
                absolute
                left-1/2
                top-1/2
                h-125
                w-125
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#FF7A00]/10
                blur-3xl
                "
            />

            {/* ORBITS */}

            <div
                className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                "
            >
                <div className="absolute h-112 w-md rounded-full border border-[#2563EB]/10" />
                <div className="absolute h-150 w-150 rounded-full border border-[#FF7A00]/10" />
                <div className="absolute h-187 w-187 rounded-full border border-[#2563EB]/10" />
            </div>

            {/* ROTATING ICONS */}

            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
                }}
            >
                <OrbitIcon
                icon="fa-whatsapp"
                className="top-10 left-1/2"
                />

                <OrbitIcon
                icon="fa-instagram"
                className="top-32 right-8"
                />

                <OrbitIcon
                icon="fa-facebook-f"
                className="top-1/2 left-6"
                />

                <OrbitIcon
                icon="fa-telegram"
                className="top-[65%] right-10"
                />

                <OrbitIcon
                icon="fa-meetup"
                className="bottom-20 left-20"
                />

                <OrbitIcon
                icon="fa-tiktok"
                className="bottom-16 right-24"
                />
            </motion.div>

            {/* PERSON */}

            <div
                className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                z-10
                "
            >
                <div
                className="
                    relative
                    h-162
                    w-130
                "
                >
                <Image
                    src={problemImg}
                    alt="Usuario confundido"
                    fill
                    className="object-contain"
                    priority
                />
                </div>
            </div>

            {/* QUESTIONS */}

            <Question
                text="¿Lo vi en historias?"
                className="top-20 right-0"
            />

            <Question
                text="¿En qué grupo estaba?"
                className="top-32 left-0"
            />

            <Question
                text="¿Lo publicaron en Facebook?"
                className="bottom-40 left-0"
            />

            <Question
                text="¿Era un evento de Meetup?"
                className="bottom-24 right-0"
            />
            </div>
            

            {/* RIGHT SIDE */}

            <div>
            <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#F3EBDD]
                px-4
                py-2
                text-sm
                font-medium
                mb-8
                "
            >
                ⚠️ El problema
            </div>

            <h2
                className="
                text-5xl
                md:text-7xl
                font-black
                leading-[0.95]
                "
            >
                La comunidad existe.
                <br />

                <span className="text-[#FF7A00]">
                La información está perdida.
                </span>
            </h2>

            <p
                className="
                mt-8
                text-xl
                leading-relaxed
                text-neutral-600
                max-w-xl
                "
            >
                Eventos, restaurantes, negocios y oportunidades
                para la comunidad latina están repartidos entre
                grupos de WhatsApp, Instagram, Facebook,
                Telegram y decenas de plataformas diferentes.
            </p>

            {/* SOLUTION */}

            <div
                className="
                mt-12
                rounded-4xl
                border
                border-[#FF7A00]/20
                bg-white/70
                backdrop-blur-xl
                p-8
                shadow-xl
                "
            >
                <div className="text-sm font-semibold text-[#FF7A00]">
                ✨ La solución
                </div>

                <div
                className="
                    mt-4
                    text-6xl
                    font-black
                    text-[#FF7A00]
                "
                >
                Veci
                </div>

                <p
                className="
                    mt-4
                    text-lg
                    text-neutral-600
                "
                >
                Todo lo que ocurre en la comunidad latina,
                organizado en un solo lugar.
                </p>

                <div
                className="
                    mt-8
                    grid
                    grid-cols-3
                    gap-6
                "
                >
                <Feature
                    icon="fa-calendar-days"
                    title="Eventos"
                />

                <Feature
                    icon="fa-store"
                    title="Negocios"
                />

                <Feature
                    icon="fa-users"
                    title="Comunidad"
                />
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}

function Feature({
    icon,
    title,
    }: {
    icon: string;
    title: string;
    }) {
    return (
        <div className="text-center">
        <i
            className={`fa-solid ${icon} text-3xl text-[#FF7A00]`}
        />
        <div className="mt-3 font-medium">
            {title}
        </div>
        </div>
    );
    }

    function OrbitIcon({
            icon,
            className,
        }: {
            icon: string;
            className: string;
        }) {
        return (
            <div className={`absolute ${className}`}>
            <div
                className="
                h-20
                w-20
                rounded-full
                bg-white
                shadow-2xl
                flex
                items-center
                justify-center
                "
            >
                <i
                className={`fa-brands ${icon} text-4xl text-[#FF7A00]`}
                />
            </div>
            </div>
        );
    }

    function Question({
    text,
    className,
    }: {
    text: string;
    className: string;
    }) {
    return (
        <div
        className={`
            absolute
            z-20
            rounded-2xl
            bg-white/90
            backdrop-blur
            px-4
            py-3
            shadow-xl
            text-sm
            max-w-47.5
            ${className}
        `}
        >
        {text}
        </div>
    );
}