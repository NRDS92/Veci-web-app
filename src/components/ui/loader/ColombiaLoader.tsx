"use client";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import {
    Empanada,
    Arepa,
    TazaDeTinto,
    SombreroVueltiao,
    AcordeonVallenato,
    Mariposa,
} from "@mteherandev/colombia-icons-react";

interface ColombiaLoaderProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    showText?: boolean;
}

const icons = [
    {
        Component: Empanada,
        color: "#F2C94C",
    },
    {
        Component: TazaDeTinto,
        color: "#4C76F2",
    },
    {
        Component: Arepa,
        color: "#F2C94C",
    },
    {
        Component: Mariposa,
        color: "#4C76F2",
    },
    {
        Component: SombreroVueltiao,
        color: "#F2C94C",
    },
    {
        Component: AcordeonVallenato,
        color: "#4C76F2",
    },
];

const sizeConfig = {
    sm: {
        width: 220,
        icon: 20,
        centerWidth: 100,
        centerHeight: 36,
    },

    md: {
        width: 320,
        icon: 26,
        centerWidth: 130,
        centerHeight: 44,
    },

    lg: {
        width: 420,
        icon: 34,
        centerWidth: 160,
        centerHeight: 52,
    },
};

export default function ColombiaLoader({
    size = "md",
    text = "Connecting...",
    showText = true,
}: ColombiaLoaderProps) {
    const config = sizeConfig[size];

    return (
        <div className="flex flex-col items-center justify-center">

            {/* Main animation */}
            <div
                className="relative"
                style={{
                    width: config.width,
                    height: 150,
                }}
            >
                {/* Background connection line */}
                <motion.div
                    className="absolute left-0 right-0 top-1/2 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, #E5E7EB 15%, #E5E7EB 85%, transparent)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Animated connection pulse */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] rounded-full"
                    style={{
                        background:
                            "linear-gradient(90deg, #F2C94C, #4C76F2)",
                    }}
                    initial={{
                        left: "0%",
                        width: "0%",
                        opacity: 0,
                    }}
                    animate={{
                        left: ["0%", "15%", "35%", "65%", "85%", "100%"],
                        width: ["0%", "18%", "24%", "20%", "15%", "0%"],
                        opacity: [0, 1, 1, 1, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Center brand */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="relative flex items-center justify-center rounded-full bg-[#111827] px-7"
                        style={{
                            width: config.centerWidth,
                            height: config.centerHeight,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {/* Glow */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background:
                                    "linear-gradient(90deg, #F2C94C, #4C76F2)",
                                filter: "blur(12px)",
                                opacity: 0.15,
                            }}
                            animate={{
                                opacity: [0.1, 0.25, 0.1],
                                scale: [0.95, 1.08, 0.95],
                            }}
                            transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <span className="relative z-10 text-sm font-bold tracking-[0.35em] text-white">
                            VECI
                        </span>
                    </motion.div>
                </div>

                {/* Moving Colombian icons */}
                <AnimatePresence mode="wait">
                    {icons.map(({ Component, color }, index) => (
                        <motion.div
                            key={index}
                            className="absolute left-1/2 top-1/2"
                            initial={{
                                x: -20,
                                y: -20,
                                opacity: 0,
                                scale: 0.5,
                            }}
                            animate={{
                                x: [
                                    -config.width / 2 + 15,
                                    -config.width / 4,
                                    0,
                                    config.width / 4,
                                    config.width / 2 - 15,
                                ],
                                y: [
                                    index % 2 === 0 ? -22 : 22,
                                    index % 2 === 0 ? -15 : 15,
                                    0,
                                    index % 2 === 0 ? 15 : -15,
                                    index % 2 === 0 ? 22 : -22,
                                ],
                                opacity: [0, 0.5, 1, 0.5, 0],
                                scale: [0.6, 0.9, 1, 0.9, 0.6],
                            }}
                            transition={{
                                duration: 3.2,
                                delay: index * 0.53,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                marginLeft: -config.icon / 2,
                                marginTop: -config.icon / 2,
                            }}
                        >
                            <Component
                                size={config.icon}
                                color={color}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Small connection nodes */}
                {[0, 1].map((index) => (
                    <motion.div
                        key={index}
                        className="absolute top-1/2 h-1.5 w-1.5 rounded-full bg-[#F2C94C]"
                        style={{
                            left: index === 0 ? "18%" : "82%",
                            transform: "translateY(-50%)",
                        }}
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.35, 1, 0.35],
                        }}
                        transition={{
                            duration: 1.8,
                            delay: index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Loading text */}
            {showText && (
                <motion.div
                    className="mt-2 flex items-center gap-1 text-sm text-gray-500"
                    initial={{
                        opacity: 0,
                        y: 5,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.5,
                    }}
                >
                    <span>{text}</span>

                    <motion.span
                        className="flex gap-0.5"
                        aria-hidden="true"
                    >
                        {[0, 1, 2].map((dot) => (
                            <motion.span
                                key={dot}
                                className="h-1 w-1 rounded-full bg-gray-400"
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                }}
                                transition={{
                                    duration: 1.2,
                                    delay: dot * 0.2,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </motion.span>
                </motion.div>
            )}
        </div>
    );
}