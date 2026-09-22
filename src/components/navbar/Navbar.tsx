"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    Menu,
    X,
    ChevronDown,
    User,
    Heart,
    CalendarDays,
    Store,
    LogOut,
} from "lucide-react";

import {
    Link,
    usePathname,
    useRouter,
} from "../../i18n/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

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
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const {
        user,
        isAuthenticated,
        loading,
        logout,
    } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

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
    };

    const handleLogout = () => {
        logout();

        setOpen(false);
        setUserMenuOpen(false);

        router.push("/");
    };

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

                        <div className="flex items-center gap-2">
                            {locales.map(
                                (locale, index) => (
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
                                                text-sm
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
                                            <span className="mx-1 text-neutral-300">
                                                |
                                            </span>
                                        )}
                                    </div>
                                )
                            )}
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
                                                    Profile
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
                                                    Favorites
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
                                                    My Businesses
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
                                Iniciar sesión
                            </Link>
                        )}

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

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================== */}

                    <button
                        onClick={() => {
                            setOpen(!open);
                            setUserMenuOpen(false);
                        }}
                        className="lg:hidden"
                        aria-label="Toggle menu"
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
                        <div className="flex flex-col gap-6">

                            {/* NAV LINKS */}

                            {links.map((item) => {
                                if (
                                    item ===
                                    "Eventos"
                                ) {
                                    return (
                                        <Link
                                            key={item}
                                            href="/events"
                                            className="
                                                font-medium
                                                text-neutral-700
                                            "
                                            onClick={() =>
                                                setOpen(
                                                    false
                                                )
                                            }
                                        >
                                            {item}
                                        </Link>
                                    );
                                }

                                if (
                                    item ===
                                    "Negocios"
                                ) {
                                    return (
                                        <Link
                                            key={item}
                                            href="/business"
                                            className="
                                                font-medium
                                                text-neutral-700
                                            "
                                            onClick={() =>
                                                setOpen(
                                                    false
                                                )
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
                                            setOpen(
                                                false
                                            )
                                        }
                                    >
                                        {item}
                                    </a>
                                );
                            })}

                            {/* LANGUAGE */}

                            <div
                                className="
                                    border-t
                                    pt-4
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
                                                Sesión iniciada como
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

                                        Profile
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

                                        Favorites
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

                                        My Events
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

                                        My Businesses
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

                                            Cerrar sesión
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
                                    Iniciar sesión
                                </Link>
                            )}

                            {/* DOWNLOAD APP */}

                            <button
                                className="
                                    rounded-xl
                                    bg-[#2563EB]
                                    px-5
                                    py-3
                                    font-semibold
                                    text-white
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