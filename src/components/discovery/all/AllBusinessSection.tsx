"use client";

import { useDiscover } from "../../../features/discover/useDiscover";
import type { DiscoverBusiness } from "../../../features/discover/discover.types";
import BusinessBento from "../../../components/business/BusinessBento";

export default function AllBusinessSection() {
    const {
        data,
        isLoading,
        error,
    } = useDiscover({
        type: "business",
        page: 1,
        limit: 6,
    });

    if (isLoading) {
        return (
            <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#111827]">
                        Negocios de tu comunidad
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Descubre negocios y servicios de la comunidad latina.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-64 animate-pulse rounded-2xl bg-gray-200"
                        />
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <h2 className="mb-6 text-2xl font-bold text-[#111827]">
                    Negocios de tu comunidad
                </h2>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
                    No pudimos cargar los negocios.
                </div>
            </section>
        );
    }

    const businesses = (data?.recommended ?? []).filter(
        (item): item is DiscoverBusiness =>
            item.type === "business"
    );

    if (!businesses.length) {
        return (
            <section>
                <h2 className="mb-6 text-2xl font-bold text-[#111827]">
                    Negocios de tu comunidad
                </h2>

                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                    <p className="text-gray-500">
                        No hay negocios disponibles en este momento.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#111827]">
                    Negocios de tu comunidad
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Descubre negocios y servicios de la comunidad latina.
                </p>
            </div>

            <BusinessBento businesses={businesses} />
        </section>
    );
}