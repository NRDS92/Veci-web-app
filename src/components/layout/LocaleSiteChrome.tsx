"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";

export default function LocaleSiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isStandaloneBusinessWebsite =
    pathname.startsWith("/business/") ||
    pathname.startsWith("/business-preview/");

  return (
    <>
      {!isStandaloneBusinessWebsite && <Navbar />}
      {children}
      {!isStandaloneBusinessWebsite && <Footer />}
    </>
  );
}
