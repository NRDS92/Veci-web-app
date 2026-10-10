
"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import VeciLogo from "../../../../public/logoVeci.webp";

type Locale = "es" | "en" | "de";

type FaIconProps = {
  name: string;
  brand?: boolean;
  className?: string;
};

function FaIcon({
  name,
  brand = false,
  className = "",
}: FaIconProps) {
  return (
    <i
      className={`${brand ? "fa-brands" : "fa-solid"} fa-${name} ${className}`}
      aria-hidden="true"
    />
  );
}

const content: Record<Locale, Record<string, string>> = {
    es: {
        tagline: "Tu comunidad latina en Europa.",
        description:
        "Descubre lugares, conecta con personas y encuentra tu comunidad donde estés.",
        discover: "Descubre",
        participate: "Participa",
        about: "Conoce Veci",
        legal: "Legal y privacidad",
        events: "Eventos",
        businesses: "Negocios",
        community: "Comunidad",
        publishEvent: "Publicar un evento",
        registerBusiness: "Registrar un negocio",
        aboutUs: "Sobre nosotros",
        contact: "Contacto",
        privacy: "Política de privacidad",
        cookies: "Cookies y preferencias",
        terms: "Condiciones de uso",
        imprint: "Aviso legal",
        madeWith: "Hecho con",
        forCommunity: "para nuestra comunidad.",
        rights: "Todos los derechos reservados.",
        explore: "Tu próximo descubrimiento empieza aquí.",
    },
    en: {
        tagline: "Your Latin community in Europe.",
        description:
        "Discover places, connect with people, and find your community wherever you are.",
        discover: "Discover",
        participate: "Get involved",
        about: "About Veci",
        legal: "Legal & privacy",
        events: "Events",
        businesses: "Businesses",
        community: "Community",
        publishEvent: "Publish an event",
        registerBusiness: "Register a business",
        aboutUs: "About us",
        contact: "Contact",
        privacy: "Privacy policy",
        cookies: "Cookies & preferences",
        terms: "Terms of use",
        imprint: "Legal notice",
        madeWith: "Made with",
        forCommunity: "for our community.",
        rights: "All rights reserved.",
        explore: "Your next discovery starts here.",
    },
    de: {
        tagline: "Deine lateinamerikanische Community in Europa.",
        description:
        "Entdecke Orte, lerne Menschen kennen und finde deine Community.",
        discover: "Entdecken",
        participate: "Mitmachen",
        about: "Über Veci",
        legal: "Rechtliches & Datenschutz",
        events: "Veranstaltungen",
        businesses: "Unternehmen",
        community: "Community",
        publishEvent: "Veranstaltung veröffentlichen",
        registerBusiness: "Unternehmen registrieren",
        aboutUs: "Über uns",
        contact: "Kontakt",
        privacy: "Datenschutzerklärung",
        cookies: "Cookies & Einstellungen",
        terms: "Nutzungsbedingungen",
        imprint: "Impressum",
        madeWith: "Mit",
        forCommunity: "für unsere Community gemacht.",
        rights: "Alle Rechte vorbehalten.",
        explore: "Deine nächste Entdeckung beginnt hier.",
    },
};

const columns = [
    {
        key: "discover",
        icon: "compass",
        links: [
        { key: "events", href: "/events", icon: "calendar-days" },
        { key: "businesses", href: "/business", icon: "store" },
        { key: "community", href: "/community", icon: "users" },
        ],
    },
    {
        key: "participate",
        icon: "star",
        links: [
        { key: "publishEvent", href: "/events/create", icon: "calendar-days" },
        { key: "registerBusiness", href: "/create", icon: "store" },
        { key: "contact", href: "/contact", icon: "envelope" },
        ],
    },
    {
        key: "about",
        icon: "heart",
        links: [
        { key: "aboutUs", href: "/about", icon: "users" },
        { key: "contact", href: "/contact", icon: "envelope" },
        ],
    },
    {
        key: "legal",
        icon: "scale-balanced",
        links: [
        { key: "imprint", href: "/impressum", icon: "file-lines" },
        { key: "privacy", href: "/privacy", icon: "shield-halved" },
        { key: "cookies", href: "/cookies", icon: "cookie-bite" },
        { key: "terms", href: "/terms", icon: "scale-balanced" },
        ],
    },
] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

export default function Footer() {
    const locale = useLocale() as Locale;
    const t = content[locale] ?? content.es;
    const reduceMotion = useReducedMotion();

    const localizedHref = (href: string) => `/${locale}${href}`;

    const reveal = reduceMotion
        ? {}
        : {
            initial: "hidden" as const,
            whileInView: "visible" as const,
            viewport: { once: true, amount: 0.15 },
            variants: fadeUp,
            transition: {
            duration: 0.5,
            ease: "easeOut" as const,
            },
        };

    return (
        <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#111827] text-white">
        {/* Ambient background */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-32 -z-10 h-80 w-80 rounded-full bg-[#4C76F2]/10 blur-3xl"
        />

        <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-80 w-80 rounded-full bg-[#F2C94C]/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-6 pb-6 pt-12 sm:px-8 sm:pt-16 lg:px-10">
            {/* Brand section */}
            <motion.div
            {...reveal}
            className="mb-12 flex flex-col justify-between gap-7 rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 md:flex-row md:items-center"
            >
            <div className="max-w-xl">
                <Link
                    href={localizedHref("/")}
                    aria-label="Veci home"
                    className="group inline-flex items-center gap-3"
                    >
                    <motion.span
                        whileHover={
                        reduceMotion ? undefined : { rotate: -8, scale: 1.07 }
                        }
                        transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        }}
                        className="relative flex h-20 w-30 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-[#F2C94C]/10"
                    >
                        <img
                        src={VeciLogo.src}
                        alt=""
                        width={58}
                        height={58}

                        className="h-full w-full object-contain"
                        />
                        
                    </motion.span>
                </Link>
                <h2 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
                {t.tagline}
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                {t.description}
                </p>
            </div>

            <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-[#F2C94C]/20 bg-[#F2C94C]/[0.07] px-4 py-3 md:self-center"
            >
                <motion.span
                aria-hidden="true"
                animate={
                    reduceMotion ? undefined : { y: [0, -4, 0] }
                }
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="text-[#F2C94C]"
                >
                <FaIcon name="compass" className="text-xl" />
                </motion.span>

                <span className="text-sm font-medium text-gray-200">
                {t.explore}
                </span>
            </motion.div>
            </motion.div>

            {/* Navigation */}
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-7">
            {/* Brand and social */}
            <motion.div
                {...reveal}
                className="lg:col-span-4"
            >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                <span className="h-px w-6 bg-[#F2C94C]" />
                {t.about}
                </div>

                <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
                {t.description}
                </p>

                <motion.a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={
                    reduceMotion ? undefined : { y: -4, scale: 1.06 }
                }
                whileTap={
                    reduceMotion ? undefined : { scale: 0.94 }
                }
                className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition-colors hover:border-[#F2C94C]/50 hover:bg-[#F2C94C]/10 hover:text-[#F2C94C]"
                >
                <FaIcon
                    name="instagram"
                    brand
                    className="text-xl"
                />
                </motion.a>
            </motion.div>

            {/* Link columns */}
            {columns.map((column, index) => (
                <motion.div
                key={column.key}
                {...reveal}
                transition={
                    reduceMotion
                    ? undefined
                    : {
                        duration: 0.45,
                        delay: index * 0.08,
                        ease: "easeOut",
                        }
                }
                className="lg:col-span-2"
                >
                <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2C94C]/10 text-[#F2C94C]">
                    <FaIcon
                        name={column.icon}
                        className="text-base"
                    />
                    </span>

                    {t[column.key]}
                </h3>

                <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                    <li key={`${column.key}-${link.key}`}>
                        <Link
                        href={localizedHref(link.href)}
                        className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                        >
                        <FaIcon
                            name={link.icon}
                            className="shrink-0 text-sm text-gray-600 transition-colors group-hover:text-[#F2C94C]"
                        />

                        <span>{t[link.key]}</span>

                        <FaIcon
                            name="arrow-up-right-from-square"
                            className="text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                        </Link>
                    </li>
                    ))}
                </ul>
                </motion.div>
            ))}
            </div>

            {/* Colombia-inspired colors */}
            <div
            aria-hidden="true"
            className="mt-12 flex h-1.5 overflow-hidden rounded-full opacity-80"
            >
            <span className="w-1/2 bg-[#F2C94C]" />
            <span className="w-1/4 bg-[#4C76F2]" />
            <span className="w-1/4 bg-[#EF4444]" />
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col gap-4 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
                © {new Date().getFullYear()} Veci. {t.rights}
            </p>

            <p className="flex flex-wrap items-center gap-1.5">
                {t.madeWith}

                <motion.span
                aria-hidden="true"
                animate={
                    reduceMotion ? undefined : { scale: [1, 1.2, 1] }
                }
                transition={{
                    duration: 1.4,
                    repeat: Infinity,
                }}
                className="text-[#F2C94C]"
                >
                <FaIcon name="heart" className="text-xs" />
                </motion.span>

                {t.forCommunity}
            </p>

            <div className="flex items-center gap-2 self-start rounded-full border border-white/10 px-3 py-2 sm:self-auto">
                <FaIcon
                name="earth-europe"
                className="text-sm text-[#F2C94C]"
                />

                <span className="font-semibold tracking-wide">
                {locale.toUpperCase()}
                </span>
            </div>
            </div>
        </div>
        </footer>
    );
}