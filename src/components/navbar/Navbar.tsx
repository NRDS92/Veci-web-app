"use client";

import { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import {
    Menu,
    X,
    ChevronDown,
    User,
    Heart,
    CalendarDays,
    Store,
    Users,
    LogOut,
    Globe,
} from "lucide-react";
import {
    Link,
    usePathname,
    useRouter,
} from "../../i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import VeciLogo from "../../../public/logoVeci.webp";
import { useLocale, useTranslations } from "next-intl";

const locales = [
{ code: "es", label: "ES" },
{ code: "en", label: "EN" },
{ code: "de", label: "DE" },
] as const;

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations("Navbar");

    const {
        user,
        isAuthenticated,
        loading,
        logout,
    } = useAuth();

    /* =====================================================
    SCROLL / NAVBAR VISIBILITY
    ====================================================== */

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Navbar background
        setScrolled(current > 20);

        // Always visible at the top
        if (current <= 20) {
            setNavbarVisible(true);
            return;
        }

        // Scrolling down -> hide navbar
        if (current > previous) {
            setNavbarVisible(false);
        }

        // Scrolling up -> show navbar
        if (current < previous) {
            setNavbarVisible(true);
        }
    });

    /* =====================================================
    LOCALE
    ====================================================== */

    const changeLocale = (
        locale: "es" | "en" | "de"
    ) => {
        const pathnameWithoutLocale =
            pathname.replace(
                /^\/(es|en|de)(?=\/|$)/,
                ""
            ) || "/";

        router.replace(
            pathnameWithoutLocale,
            { locale }
        );

        setOpen(false);
        setUserMenuOpen(false);
        setLanguageOpen(false);
    };

    /* =====================================================
    LOGOUT
    ====================================================== */

    const handleLogout = () => {
        logout();

        setOpen(false);
        setUserMenuOpen(false);

        router.push("/");
    };

    /* =====================================================
    USER NAVIGATION
    ====================================================== */

    const handleUserNavigation = (
        path: string
    ) => {
        setUserMenuOpen(false);
        setOpen(false);

        router.push(path);
    };

    return (
        <>
            {/* =====================================================
                DESKTOP / MAIN NAVBAR
            ====================================================== */}

            <motion.header
                initial={{ y: -100}}
                animate={{
                    y: navbarVisible ? 0 : -120,
                }}
                transition={{
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1],
                }}
                className={`
                    fixed
                    top-4
                    left-1/2
                    -translate-x-1/2
                    z-100
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
                            : "bg-transparent"
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
                    {/* =================================================
                        LOGO
                    ================================================== */}
                    <Link
                        href="/"
                        onClick={() => {
                            setUserMenuOpen(false);
                        }}
                    >
                        <img
                            src={VeciLogo.src}
                            alt="Veci Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                    {/* =================================================
                        DESKTOP NAVIGATION
                    ================================================== */}
                    <nav
                        className="
                            hidden
                            items-center
                            gap-2
                            lg:flex
                        "
                    >
                        {/* EVENTOS */}
                        <Link
                            href="/events"
                            className={`
                                group
                                relative
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                                ${
                                    pathname.includes("/events")
                                        ? `
                                            bg-[#F2C94C]/20
                                            text-[#111827]
                                        `
                                        : `
                                            text-neutral-600
                                            hover:bg-[#F2C94C]/10
                                            hover:text-[#111827]
                                        `
                                }
                            `}
                        >
                            <CalendarDays
                                size={17}
                                strokeWidth={1.8}
                                className="
                                    transition-transform
                                    duration-200
                                    group-hover:-translate-y-0.5
                                "
                            />
                            <span>
                                {t("events")}
                            </span>
                            {pathname.includes("/events") && (
                                <span
                                    className="
                                        absolute
                                        bottom-0.5
                                        left-1/2
                                        h-0.5
                                        w-5
                                        -translate-x-1/2
                                        rounded-full
                                        bg-[#F2C94C]
                                    "
                                />
                            )}
                        </Link>
                        {/* NEGOCIOS */}
                        <Link
                            href="/business"
                            className={`
                                group
                                relative
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                                ${
                                    pathname.includes("/business")
                                        ? `
                                            bg-[#F2C94C]/20
                                            text-[#111827]
                                        `
                                        : `
                                            text-neutral-600
                                            hover:bg-[#F2C94C]/10
                                            hover:text-[#111827]
                                        `
                                }
                            `}
                        >
                            <Store
                                size={17}
                                strokeWidth={1.8}
                                className="
                                    transition-transform
                                    duration-200
                                    group-hover:-translate-y-0.5
                                "
                            />
                            <span>
                                {t("businesses")}
                            </span>
                            {pathname.includes("/business") && (
                                <span
                                    className="
                                        absolute
                                        bottom-0.5
                                        left-1/2
                                        h-0.5
                                        w-5
                                        -translate-x-1/2
                                        rounded-full
                                        bg-[#F2C94C]
                                    "
                                />
                            )}
                        </Link>
                        {/* COMUNIDAD */}
                        <Link
                            href="/community"
                            className={`
                                group
                                relative
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                                ${
                                    pathname.includes("/community")
                                        ? `
                                            bg-[#F2C94C]/20
                                            text-[#111827]
                                        `
                                        : `
                                            text-neutral-600
                                            hover:bg-[#F2C94C]/10
                                            hover:text-[#111827]
                                        `
                                }
                            `}
                        >
                            <Users
                                size={17}
                                strokeWidth={1.8}
                                className="
                                    transition-transform
                                    duration-200
                                    group-hover:-translate-y-0.5
                                "
                            />

                            <span>
                                {t("community")}
                            </span>

                            {pathname.includes("/community") && (
                                <span
                                    className="
                                        absolute
                                        bottom-0.5
                                        left-1/2
                                        h-0.5
                                        w-5
                                        -translate-x-1/2
                                        rounded-full
                                        bg-[#F2C94C]
                                    "
                                />
                            )}
                        </Link>
                    </nav>
                    {/* =================================================
                        RIGHT SIDE
                    ================================================== */}
                    <div
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-6
                        "
                    >
                        {/* LANGUAGE */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setLanguageOpen((prev) => !prev)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-neutral-500
                                    transition
                                    hover:text-black
                                "
                            >
                                <span>
                                    {locales.find(
                                        (item) => item.code === locale
                                    )?.label}
                                </span>

                                <ChevronDown
                                    size={15}
                                    className={`transition-transform duration-200 ${
                                        languageOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {languageOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.15 }}
                                        className="
                                            absolute
                                            right-0
                                            top-full
                                            z-50
                                            mt-2
                                            min-w-[90px]
                                            overflow-hidden
                                            rounded-xl
                                            border
                                            border-neutral-200
                                            bg-white
                                            py-1
                                            shadow-lg
                                        "
                                    >
                                        {locales.map((item) => (
                                            <button
                                                key={item.code}
                                                type="button"
                                                onClick={() => {
                                                    changeLocale(item.code);
                                                    setLanguageOpen(false);
                                                }}
                                                className={`
                                                    flex
                                                    w-full
                                                    items-center
                                                    px-4
                                                    py-2
                                                    text-left
                                                    text-sm
                                                    font-medium
                                                    transition
                                                    ${
                                                        item.code === locale
                                                            ? "bg-[#F2C94C]/15 text-black"
                                                            : "text-neutral-500 hover:bg-neutral-50 hover:text-black"
                                                    }
                                                `}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* =================================================
                            AUTHENTICATION
                        ================================================== */}

                        {loading ? (
                            <div
                                className="
                                    h-10
                                    w-24
                                    animate-pulse
                                    rounded-xl
                                    bg-neutral-200
                                "
                            />
                        ) : isAuthenticated &&
                        user ? (
                            <div className="relative">
                                {/* USER BUTTON */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setUserMenuOpen(
                                            !userMenuOpen
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        px-3
                                        py-2
                                        text-sm
                                        font-medium
                                        text-neutral-700
                                        transition
                                        hover:bg-white/70
                                    "
                                >
                                    {user.profileImage ? (
                                        <img
                                            src={
                                                user.profileImage
                                            }
                                            alt={
                                                user.name
                                            }
                                            className="
                                                h-9
                                                w-9
                                                rounded-full
                                                object-cover
                                            "
                                        />
                                    ) : (
                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#F2C94C]
                                                text-sm
                                                font-bold
                                                text-[#111827]
                                            "
                                        >
                                            {user.name
                                                .charAt(
                                                    0
                                                )
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <span>
                                        {user.name}
                                    </span>

                                    <ChevronDown
                                        size={16}
                                        className={`
                                            transition-transform
                                            duration-200
                                            ${
                                                userMenuOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />
                                </button>

                                {/* USER DROPDOWN */}

                                {userMenuOpen && (
                                    <div
                                        className="
                                            absolute
                                            right-0
                                            top-14
                                            w-64
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-neutral-100
                                            bg-white
                                            shadow-xl
                                        "
                                    >
                                        {/* USER HEADER */}

                                        <div
                                            className="
                                                border-b
                                                border-neutral-100
                                                px-4
                                                py-4
                                            "
                                        >
                                            <div className="flex items-center gap-3">
                                                {user.profileImage ? (
                                                    <img
                                                        src={
                                                            user.profileImage
                                                        }
                                                        alt={
                                                            user.name
                                                        }
                                                        className="
                                                            h-11
                                                            w-11
                                                            rounded-full
                                                            object-cover
                                                        "
                                                    />
                                                ) : (
                                                    <div
                                                        className="
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            bg-[#F2C94C]
                                                            font-bold
                                                            text-[#111827]
                                                        "
                                                    >
                                                        {user.name
                                                            .charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <p
                                                        className="
                                                            truncate
                                                            text-sm
                                                            font-semibold
                                                            text-neutral-900
                                                        "
                                                    >
                                                        {
                                                            user.name
                                                        }
                                                    </p>

                                                    <p
                                                        className="
                                                            truncate
                                                            text-xs
                                                            text-neutral-500
                                                        "
                                                    >
                                                        {
                                                            user.email
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* USER LINKS */}

                                        <div className="p-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUserNavigation(
                                                        "/profile"
                                                    )
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-700
                                                    transition
                                                    hover:bg-neutral-100
                                                "
                                            >
                                                <User
                                                    size={
                                                        17
                                                    }
                                                />
                                                <span>
                                                    {t("profile")}
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUserNavigation(
                                                        "/favorites"
                                                    )
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-700
                                                    transition
                                                    hover:bg-neutral-100
                                                "
                                            >
                                                <Heart
                                                    size={
                                                        17
                                                    }
                                                />

                                                <span>
                                                    {t("favorites")}
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUserNavigation(
                                                        "/my-events"
                                                    )
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-700
                                                    transition
                                                    hover:bg-neutral-100
                                                "
                                            >
                                                <CalendarDays
                                                    size={
                                                        17
                                                    }
                                                />

                                                <span>
                                                    My Events
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUserNavigation(
                                                        "/my-businesses"
                                                    )
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-700
                                                    transition
                                                    hover:bg-neutral-100
                                                "
                                            >
                                                <Store
                                                    size={
                                                        17
                                                    }
                                                />

                                                <span>
                                                    {t("myBusinesses")}
                                                </span>
                                            </button>
                                        </div>

                                        {/* LOGOUT */}

                                        <div
                                            className="
                                                border-t
                                                border-neutral-100
                                                p-2
                                            "
                                        >
                                            <button
                                                type="button"
                                                onClick={
                                                    handleLogout
                                                }
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    font-medium
                                                    text-red-600
                                                    transition
                                                    hover:bg-red-50
                                                "
                                            >
                                                <LogOut
                                                    size={
                                                        17
                                                    }
                                                />

                                                <span>
                                                    Logout
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
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
                                {t("login")}
                            </Link>
                        )}

                       
                    </div>

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================== */}

                    <button
                        onClick={() => {
                            setOpen(!open);
                            setUserMenuOpen(false);
                        }}
                        className="lg:hidden"
                        aria-label={t("toggleMenu")}
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.header>

            {/* =====================================================
                MOBILE MENU
            ====================================================== */}

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
                            p-6
                            shadow-xl
                            lg:hidden
                        "
                    >
                        <div className="flex flex-col gap-3">

                            {/* NAV LINKS */}

                            <Link
                                href="/events"
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    font-medium
                                    transition-all
                                    duration-200
                                    ${
                                        pathname.includes("/events")
                                            ? "bg-[#F2C94C]/20 text-[#111827]"
                                            : "text-neutral-700 hover:bg-[#F2C94C]/10 hover:text-[#111827]"
                                    }
                                `}
                                onClick={() =>
                                    setOpen(false)
                                }
                            >
                                <CalendarDays
                                    size={19}
                                    strokeWidth={1.8}
                                />

                                <span>
                                    {t("events")}
                                </span>
                            </Link>

                            <Link
                                href="/business"
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    font-medium
                                    transition-all
                                    duration-200
                                    ${
                                        pathname.includes("/business")
                                            ? "bg-[#F2C94C]/20 text-[#111827]"
                                            : "text-neutral-700 hover:bg-[#F2C94C]/10 hover:text-[#111827]"
                                    }
                                `}
                                onClick={() =>
                                    setOpen(false)
                                }
                            >
                                <Store
                                    size={19}
                                    strokeWidth={1.8}
                                />

                                <span>
                                    {t("businesses")}
                                </span>
                            </Link>

                            <Link
                                href="/community"
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    font-medium
                                    transition-all
                                    duration-200
                                    ${
                                        pathname.includes("/community")
                                            ? "bg-[#F2C94C]/20 text-[#111827]"
                                            : "text-neutral-700 hover:bg-[#F2C94C]/10 hover:text-[#111827]"
                                    }
                                `}
                                onClick={() =>
                                    setOpen(false)
                                }
                            >
                                <Users
                                    size={19}
                                    strokeWidth={1.8}
                                />

                                <span>
                                    {t("community")}
                                </span>
                            </Link>

                            {/* LANGUAGE */}

                            <div
                                className="
                                    border-t
                                    pt-4
                                    mt-2
                                "
                            >
                                <div className="flex items-center gap-3">
                                    {locales.map(
                                        (
                                            locale,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    locale.code
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                "
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
                                                    {
                                                        locale.label
                                                    }
                                                </button>

                                                {index <
                                                    locales.length -
                                                        1 && (
                                                    <span className="ml-3 text-neutral-300">
                                                        |
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* =================================================
                                MOBILE AUTH
                            ================================================== */}

                            {loading ? (
                                <div
                                    className="
                                        h-20
                                        w-full
                                        animate-pulse
                                        rounded-xl
                                        bg-neutral-200
                                    "
                                />
                            ) : isAuthenticated &&
                            user ? (
                                <div
                                    className="
                                        border-t
                                        pt-4
                                    "
                                >
                                    {/* USER */}

                                    <div className="mb-4 flex items-center gap-3">
                                        {user.profileImage ? (
                                            <img
                                                src={
                                                    user.profileImage
                                                }
                                                alt={
                                                    user.name
                                                }
                                                className="
                                                    h-11
                                                    w-11
                                                    rounded-full
                                                    object-cover
                                                "
                                            />
                                        ) : (
                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-[#F2C94C]
                                                    font-bold
                                                    text-[#111827]
                                                "
                                            >
                                                {user.name
                                                    .charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="text-xs text-neutral-500">
                                                {t("loggedInAs")}
                                            </p>

                                            <p className="truncate font-semibold text-neutral-900">
                                                {
                                                    user.name
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* PROFILE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleUserNavigation(
                                                "/profile"
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-left
                                            text-sm
                                            text-neutral-700
                                            transition
                                            hover:bg-neutral-100
                                        "
                                    >
                                        <User
                                            size={18}
                                        />

                                        {t("profile")}
                                    </button>

                                    {/* FAVORITES */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleUserNavigation(
                                                "/favorites"
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-left
                                            text-sm
                                            text-neutral-700
                                            transition
                                            hover:bg-neutral-100
                                        "
                                    >
                                        <Heart
                                            size={18}
                                        />
                                        {t("favorites")}
                                    </button>
                                    {/* MY EVENTS */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleUserNavigation(
                                                "/my-events"
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-left
                                            text-sm
                                            text-neutral-700
                                            transition
                                            hover:bg-neutral-100
                                        "
                                    >
                                        <CalendarDays
                                            size={18}
                                        />
                                        {t("myEvents")} 
                                    </button>

                                    {/* MY BUSINESSES */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleUserNavigation(
                                                "/my-businesses"
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-left
                                            text-sm
                                            text-neutral-700
                                            transition
                                            hover:bg-neutral-100
                                        "
                                    >
                                        <Store
                                            size={18}
                                        />
                                        {t("myBusinesses")}
                                    </button>
                                    {/* LOGOUT */}
                                    <div
                                        className="
                                            mt-3
                                            border-t
                                            pt-3
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                gap-3
                                                rounded-xl
                                                px-3
                                                py-3
                                                text-left
                                                text-sm
                                                font-medium
                                                text-red-600
                                                transition
                                                hover:bg-red-50
                                            "
                                        >
                                            <LogOut
                                                size={
                                                    18
                                                }
                                            />

                                            {t("logout")}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() =>
                                        setOpen(
                                            false
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-[#FF7A00]
                                        px-5
                                        py-3
                                        text-center
                                        font-semibold
                                        text-white
                                        transition
                                        hover:scale-[1.02]
                                    "
                                >
                                    {t("login")}
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );


}
