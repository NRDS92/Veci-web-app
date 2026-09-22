"use client";

import {
  CalendarDays,
  CheckCircle2,
  UserRound,
} from "lucide-react";

import { SiluetaColombia } from "@mteherandev/colombia-icons-react";

import { useAuth } from "@/components/auth/AuthProvider";

export default function ProfileAccount() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const memberSince = new Date(
    user.createdAt
  ).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const isColombian =
    user.originCountry?.toUpperCase() === "CO";

  return (
    <aside className="space-y-6">

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-gray-900">
          Account
        </h2>

        <div className="mt-5 space-y-5">

          <div className="flex items-start gap-3">

            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <UserRound size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Account type
              </p>

              <p className="mt-1 font-medium capitalize text-gray-900">
                {user.role}
              </p>
            </div>

          </div>

          <div className="flex items-start gap-3">

            <div className="rounded-xl bg-yellow-50 p-2 text-yellow-600">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Subscription
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {user.subscription.plan}
              </p>
            </div>

          </div>

          <div className="flex items-start gap-3">

            <div className="rounded-xl bg-gray-100 p-2 text-gray-600">
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Member since
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {memberSince}
              </p>
            </div>

          </div>

        </div>
      </section>

      {isColombian && (
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="bg-gray-900 p-6 text-white">

            <SiluetaColombia
              width={42}
              height={42}
            />

            <h2 className="mt-4 text-lg font-bold">
              Colombian roots
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              Your Colombian identity is part of
              what makes the VECI community diverse.
            </p>

          </div>

        </section>
      )}

    </aside>
  );
}