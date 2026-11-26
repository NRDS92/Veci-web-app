"use client";

import { getPasswordRequirementStatus } from "@ndrs92/contracts";
import { useTranslations } from "next-intl";

export default function PasswordRequirements({ password }: { password: string }) {
  const t = useTranslations("PasswordSecurity.requirements");
  const status = getPasswordRequirementStatus(password);
  const items = [["minLength", status.minLength], ["uppercase", status.uppercase], ["lowercase", status.lowercase], ["number", status.number], ["special", status.special], ["maxBytes", status.maxBytes]] as const;
  return (
    <ul aria-label={t("title")} aria-live="polite" className="mt-3 grid gap-1 text-xs sm:grid-cols-2">
      {items.map(([key, satisfied]) => <li key={key} className={satisfied ? "text-green-700" : "text-gray-500"}>
        <span aria-hidden="true">{password.length === 0 ? "•" : satisfied ? "✓" : "○"}</span>{" "}{t(key)}
      </li>)}
    </ul>
  );
}
