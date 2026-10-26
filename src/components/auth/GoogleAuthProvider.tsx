
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function GoogleAuthProvider({
  children,
}: Props) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local"
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
