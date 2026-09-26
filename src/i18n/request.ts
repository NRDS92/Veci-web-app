import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  console.log("🌍 NEXT-INTL REQUEST LOCALE:", locale);

  if (
    !locale ||
    !routing.locales.includes(
      locale as (typeof routing.locales)[number]
    )
  ) {
    locale = routing.defaultLocale;
  }

  console.log("🌍 NEXT-INTL FINAL LOCALE:", locale);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});