
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import ConsentManager from "@/components/privacy/ConsentManager";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";

const locales = ["es", "en", "de"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NotificationProvider>
        <AuthProvider>
          <ConsentManager />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </NotificationProvider>
    </NextIntlClientProvider>
  );
}

