"use client";

import Link from "next/link";
import { LayoutDashboard, Calendar, Building2, Users, Settings } from "lucide-react";

const menu = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Events",
        href: "/admin/moderation/events",
        icon: Calendar,
    },
    {
        title: "Businesses",
        href: "/admin/moderation/businesses",
        icon: Building2,
    },
    {
        title: "Users",
        href: "/admin/moderation/users",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r bg-white">
        <div className="p-6 text-xl font-bold">
            VECI Admin
        </div>

        <nav className="px-3">

            {menu.map((item) => {

            const Icon = item.icon;

            return (

                <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100 transition"
                >
                <Icon size={20} />
                {item.title}
                </Link>

            );
            })}

        </nav>

        </aside>
    );
}