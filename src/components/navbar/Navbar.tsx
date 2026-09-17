"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import {
    Link,
    usePathname,
    useRouter,
} from "../../i18n/navigation";

import VeciLogo from "../../../public/logoVeci.webp";

const links = [
    "Eventos",
    "Negocios",
    "Cómo Funciona",
    "Para Emprendedores",
    "Comunidad",
];

const locales = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
] as const;

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    const changeLocale = (locale: "es" | "en" | "de") => {
        const pathnameWithoutLocale =
            pathname.replace(/^\/(es|en|de)(?=\/|$)/, "") || "/";

        router.replace(pathnameWithoutLocale, { locale });

        setOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`
                    fixed
                    top-4
                    left-1/2
                    -translate-x-1/2
                    z-50
                    w-[95%]
                    max-w-7xl
                    rounded-2xl
                    transition-all
                    duration-300

                    ${
                        scrolled
                            ? `
                                bg-white/70
                                backdrop-blur-xl
                                border
                                border-black/5
                                shadow-lg
                            `
                            : `bg-transparent`
                    }
                `}
            >
                <div
                    className="
                        flex
                        h-20
                        items-center
                        justify-between
                        px-6
                    "
                >
                    {/* LOGO */}

                    <Link href="/">
                        <img
                            src={VeciLogo.src}
                            alt="Veci Logo"
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* DESKTOP NAV */}

                    <nav
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-8
                        "
                    >
                        {links.map((item) => {
                            if (item === "Eventos") {
                                return (
                                    <Link
                                        key={item}
                                        href="/events"
                                        className="
                                            text-sm
                                            font-medium
                                            text-neutral-700
                                            transition
                                            hover:text-black
                                        "
                                    >
                                        {item}
                                    </Link>
                                );
                            }

                            if (item === "Negocios") {
                                return (
                                    <Link
                                        key={item}
                                        href="/business"
                                        className="
                                            text-sm
                                            font-medium
                                            text-neutral-700
                                            transition
                                            hover:text-black
                                        "
                                    >
                                        {item}
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={item}
                                    href="#"
                                    className="
                                        text-sm
                                        font-medium
                                        text-neutral-700
                                        transition
                                        hover:text-black
                                    "
                                >
                                    {item}
                                </a>
                            );
                        })}
                    </nav>

                    {/* RIGHT */}

                    <div
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-6
                        "
                    >
                        {/* LANGUAGE */}

                        <div className="flex items-center gap-2">
                            {locales.map((locale, index) => (
                                <div
                                    key={locale.code}
                                    className="flex items-center"
                                >
                                    <button
                                        onClick={() =>
                                            changeLocale(locale.code)
                                        }
                                        className={`
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                pathname
                                                    ? "text-neutral-500 hover:text-black"
                                                    : "text-neutral-500"
                                            }
                                        `}
                                    >
                                        {locale.label}
                                    </button>

                                    {index < locales.length - 1 && (
                                        <span className="mx-1 text-neutral-300">
                                            |
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* DOWNLOAD APP */}

                        <button
                            className="
                                rounded-xl
                                bg-[#FF7A00]
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:scale-105
                            "
                        >
                            Descargar App
                        </button>
                    </div>

                    {/* MOBILE */}

                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.header>

            {/* MOBILE MENU */}

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        className="
                            fixed
                            top-24
                            left-4
                            right-4
                            z-40
                            rounded-2xl
                            bg-white
                            shadow-xl
                            p-6
                            lg:hidden
                        "
                    >
                        <div className="flex flex-col gap-6">

                            {/* NAV LINKS */}

                            {links.map((item) => {
                                if (item === "Eventos") {
                                    return (
                                        <Link
                                            key={item}
                                            href="/events"
                                            className="
                                                font-medium
                                                text-neutral-700
                                            "
                                            onClick={() =>
                                                setOpen(false)
                                            }
                                        >
                                            {item}
                                        </Link>
                                    );
                                }

                                if (item === "Negocios") {
                                    return (
                                        <Link
                                            key={item}
                                            href="/business"
                                            className="
                                                font-medium
                                                text-neutral-700
                                            "
                                            onClick={() =>
                                                setOpen(false)
                                            }
                                        >
                                            {item}
                                        </Link>
                                    );
                                }

                                return (
                                    <a
                                        key={item}
                                        href="#"
                                        className="
                                            font-medium
                                            text-neutral-700
                                        "
                                        onClick={() =>
                                            setOpen(false)
                                        }
                                    >
                                        {item}
                                    </a>
                                );
                            })}

                            {/* LANGUAGE */}

                            <div
                                className="
                                    pt-4
                                    border-t
                                "
                            >
                                <div className="flex items-center gap-3">
                                    {locales.map((locale, index) => (
                                        <div
                                            key={locale.code}
                                            className="flex items-center"
                                        >
                                            <button
                                                onClick={() =>
                                                    changeLocale(
                                                        locale.code
                                                    )
                                                }
                                                className="
                                                    font-medium
                                                    text-neutral-500
                                                    transition
                                                    hover:text-black
                                                "
                                            >
                                                {locale.label}
                                            </button>

                                            {index <
                                                locales.length - 1 && (
                                                <span className="ml-3 text-neutral-300">
                                                    |
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DOWNLOAD APP */}

                            <button
                                className="
                                    rounded-xl
                                    bg-[#2563EB]
                                    px-5
                                    py-3
                                    text-white
                                    font-semibold
                                "
                            >
                                Descargar App
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}