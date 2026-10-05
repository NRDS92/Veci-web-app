"use client";

import { motion } from "framer-motion";


import {
    Notification,
    NotificationType,
} from "./notification.types";

interface NotificationToastProps {
    notification: Notification;
    onClose: () => void;
}

const notificationConfig: Record<
    NotificationType,
    {
        icon: string;
        iconColor: string;
        iconBackground: string;
    }
> = {
    success: {
        icon: "fa-solid fa-check",
        iconColor: "text-green-600",
        iconBackground: "bg-green-100",
    },

    error: {
        icon: "fa-solid fa-xmark",
        iconColor: "text-red-600",
        iconBackground: "bg-red-100",
    },

    warning: {
        icon: "fa-solid fa-triangle-exclamation",
        iconColor: "text-amber-600",
        iconBackground: "bg-amber-100",
    },

    info: {
        icon: "fa-solid fa-circle-info",
        iconColor: "text-blue-600",
        iconBackground: "bg-blue-100",
    },
};

export default function NotificationToast({
    notification,
    onClose,
}: NotificationToastProps) {
    const config =
        notificationConfig[notification.type];

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 40,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                x: 40,
                scale: 0.96,
            }}
            transition={{
                duration: 0.2,
            }}
            className="pointer-events-auto w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
            <div className="flex gap-3 p-4">
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.iconBackground}`}
                >
                    <i
                        className={`${config.icon} ${config.iconColor} text-sm`}
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                        {notification.title}
                    </h3>

                    {notification.message && (
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                            {notification.message}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close notification"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                    <i className="fa-solid fa-xmark text-xs" />
                </button>
            </div>
        </motion.div>
    );
}