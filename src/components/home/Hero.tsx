"use client";

import { useEffect, useState } from "react";
import {
    MapPin,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface HeroProps {
    city?: string;
    country?: string;
}

interface HeroSlide {
    title: React.ReactNode;
    description: string;
    cta: string;
    backgroundImage: string;
    route: string;
    brand: React.ReactNode;
}

export default function Hero({
    city = "Köln",
    country = "Alemania",
}: HeroProps) {
    const router = useRouter();
    const t = useTranslations("hero");

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides: HeroSlide[] = [
        {
            title: (
                <>
                    {t("slide1.title")}
                    <br />
                    <span className="text-[#F2C94C]">
                        {t("slide1.highlight")}
                    </span>
                </>
            ),
            description: t("slide1.description"),
            cta: t("slide1.cta"),
            backgroundImage: "/heroImg1.webp",
            route: "/discover",
            brand: (
                <>
                    {t("slide1.brand1")}
                    <br />
                    {t("slide1.brand2")}
                    <br />
                    {t("slide1.brand3")}
                </>
            ),
        },

        {
            title: (
                <>
                    {t("slide2.title")}
                    <br />
                    <span className="text-[#F2C94C]">
                        {t("slide2.highlight")}
                    </span>
                </>
            ),
            description: t("slide2.description"),
            cta: t("slide2.cta"),
            backgroundImage: "/heroImg2.webp",
            route: "/create/event",
            brand: (
                <>
                    {t("slide2.brand1")}
                    <br />
                    {t("slide2.brand2")}
                    <br />
                    {t("slide2.brand3")}
                </>
            ),
        },

        {
            title: (
                <>
                    {t("slide3.title")}
                    <br />
                    <span className="text-[#F2C94C]">
                        {t("slide3.highlight")}
                    </span>
                </>
            ),
            description: t("slide3.description"),
            cta: t("slide3.cta"),
            backgroundImage: "/heroImg3.webp",
            route: "/create/business",
            brand: (
                <>
                    {t("slide3.brand1")}
                    <br />
                    {t("slide3.brand2")}
                    <br />
                    {t("slide3.brand3")}
                </>
            ),
        },

        {
            title: (
                <>
                    {t("slide4.title")}
                    <br />
                    <span className="text-[#F2C94C]">
                        {t("slide4.highlight")}
                    </span>
                </>
            ),
            description: t("slide4.description"),
            cta: t("slide4.cta"),
            backgroundImage: "/heroImg4.webp",
            route: "/discover",
            brand: (
                <>
                    {t("slide4.brand1")}
                    <br />
                    {t("slide4.brand2")}
                    <br />
                    {t("slide4.brand3")}
                </>
            ),
        },
    ];

    /** Autoplay */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(
                (prev) => (prev + 1) % slides.length
            );
        }, 7000);

        return () => clearInterval(interval);
    }, [slides.length]);

    /** Navigation */
    const nextSlide = () => {
        setCurrentSlide(
            (prev) => (prev + 1) % slides.length
        );
    };

    const previousSlide = () => {
        setCurrentSlide(
            (prev) =>
                (prev - 1 + slides.length) %
                slides.length
        );
    };

    /** CTA */
    const handleCTA = () => {
        router.push(slides[currentSlide].route);
    };

    const slide = slides[currentSlide];

    return (
        <section className="relative isolate mt-30 overflow-hidden rounded-none md:rounded-b-2xl">

            {/* Background */}
            <div
                key={slide.backgroundImage}
                className="absolute inset-0 -z-30 bg-cover bg-center transition-all duration-700"
                style={{
                    backgroundImage: `url("${slide.backgroundImage}")`,
                }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 -z-20 bg-black/10" />
            {/* Gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
            {/* Content */}
            <div className="mx-auto flex h-[420px] max-w-7xl items-center px-6 md:h-[450px] md:px-10 lg:h-[480px] lg:px-16">
                <div className="flex w-full items-center justify-between gap-10">
                    {/* Main content */}
                    <div
                        key={currentSlide}
                        className="
                            flex
                            h-[310px]
                            w-full
                            max-w-2xl
                            flex-col
                            justify-center
                            text-white
                            animate-[fadeIn_0.5s_ease-in-out]

                            md:h-[330px]
                            lg:h-[350px]
                        "
                    >

                        {/* Location */}
                        <div className="h-[42px]">
                            <button
                                type="button"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/30
                                    bg-black/20
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    backdrop-blur-sm
                                    transition
                                    hover:bg-white/15
                                "
                            >
                                <MapPin
                                    size={17}
                                    strokeWidth={2.2}
                                />

                                <span>
                                    {city}, {country}
                                </span>
                            </button>
                        </div>

                        {/* Heading */}
                        <div className="mt-4 flex h-[125px] items-start">
                            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
                                {slide.title}
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="mt-4 flex h-[70px] items-start">
                            <p className="max-w-xl text-m leading-relaxed md:text-lg text-white/90 lg:text-xl">
                                {slide.description}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="mt-6 h-[52px]">
                            <button
                                type="button"
                                onClick={handleCTA}
                                className="
                                    inline-flex
                                    items-center
                                    gap-3
                                    rounded-full
                                    bg-[#F2C94C]
                                    px-7
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-[#111827]
                                    shadow-lg
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-[#f5d45e]
                                    hover:shadow-xl
                                "
                            >
                                {slide.cta}

                                <ArrowRight
                                    size={18}
                                    strokeWidth={2.5}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Right branding */}
                    <div className="hidden max-w-[220px] text-white md:block lg:mr-8">
                        <div className="relative">

                            <p className="text-xl leading-tight italic">
                                {slide.brand}
                            </p>

                            <div className="mt-4 h-1 w-20 -rotate-3 rounded-full bg-[#F2C94C]" />

                        </div>
                    </div>

                </div>
            </div>

            {/* Previous */}
            <button
                type="button"
                onClick={previousSlide}
                aria-label={t("previousSlide")}
                className="
                    absolute
                    left-4
                    top-1/2
                    hidden
                    -translate-y-1/2
                    rounded-full
                    border
                    border-white/30
                    bg-black/25
                    p-2
                    text-white
                    backdrop-blur-sm
                    transition
                    hover:bg-black/50
                    md:block
                "
            >
                <ChevronLeft size={22} />
            </button>

            {/* Next */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label={t("nextSlide")}
                className="
                    absolute
                    right-4
                    top-1/2
                    hidden
                    -translate-y-1/2
                    rounded-full
                    border
                    border-white/30
                    bg-black/25
                    p-2
                    text-white
                    backdrop-blur-sm
                    transition
                    hover:bg-black/50
                    md:block
                "
            >
                <ChevronRight size={22} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={t("goToSlide", {
                            number: index + 1,
                        })}
                        className={`
                            h-2
                            rounded-full
                            transition-all
                            duration-300
                            ${
                                currentSlide === index
                                    ? "w-8 bg-[#F2C94C]"
                                    : "w-2 bg-white/60 hover:bg-white"
                            }
                        `}
                    />
                ))}
            </div>

        </section>
    );
}