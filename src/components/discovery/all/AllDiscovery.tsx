import AllEventsSection from "./AllEventsSection";
import AllBusinessSection from "./AllBusinessSection";

export default function AllDiscovery() {
    return (
        <section className="space-y-16 pb-20">

            <AllEventsSection />
            <AllBusinessSection />
            {/* Community */}
            <div>
                <h2 className="mb-6 text-2xl font-bold text-[#111827]">
                    Comunidad
                </h2>
                <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-400">
                    Community Section
                </div>
            </div>
            {/* Map */}
            <div>
                <h2 className="mb-6 text-2xl font-bold text-[#111827]">
                    Explora en el mapa
                </h2>
                <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-400">
                    Discovery Map
                </div>
            </div>
        </section>
    );
}