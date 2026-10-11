
"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";

import NotificationToast from "./NotificationToast";
import {
  Notification,
  NotifyOptions,
} from "./notification.types";

interface NotificationContextValue {
  notify: (options: NotifyOptions) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext =
  createContext<NotificationContextValue | undefined>(
    undefined
  );

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const timers = useRef(
    new Map<string, ReturnType<typeof setTimeout>>()
  );

  const removeNotification = useCallback((id: string) => {
    const timer = timers.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }

    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  }, []);

  const notify = useCallback(
    ({
      type,
      title,
      message,
      duration = 5000,
    }: NotifyOptions) => {
      const id = crypto.randomUUID();

      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration,
      };

      setNotifications((current) => [
        ...current,
        notification,
      ]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          removeNotification(id);
        }, duration);

        timers.current.set(id, timer);
      }
    },
    [removeNotification]
  );

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      notify,
      removeNotification,
    }),
    [notify, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex justify-end px-4 sm:left-auto sm:right-4 sm:w-full sm:max-w-md">
        <div className="flex w-full flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {notifications.map((notification) => (
              <NotificationToast
                key={notification.id}
                notification={notification}
                onClose={() =>
                  removeNotification(notification.id)
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}
