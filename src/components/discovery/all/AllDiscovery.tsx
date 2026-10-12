"use client";

import AllEventsSection from "./AllEventsSection";
import AllBusinessSection from "./AllBusinessSection";
import type { DiscoverFilters } from "../../../features/discover/discover.types";

interface AllDiscoveryProps {
filters: DiscoverFilters;
}

export default function AllDiscovery({ filters }: AllDiscoveryProps) {
return ( <section className="space-y-16 pb-20"> <AllEventsSection filters={filters} /> <AllBusinessSection filters={filters} /> </section>
);
}
