"use client";

import PhoneMockup from "./PhoneMockup";
import FloatingCard from "./FloatingCard";

import partyImg from "../../../images/Gateoshouse.webp"
import restauranImg from "../../../images/5.webp"
import marketImg from "../../../images/latinMarket.webp"
import comunityImg from "../../../images/Gateoshouse.webp"

export default function HeroVisual() {
    return (
        <div className="relative h-200 w-full">

        {/* PHONE */}

        <div
            className="
            absolute
            left-1/2
            top-1/2
            z-20
            -translate-x-1/2
            -translate-y-1/2
            "
        >
            <PhoneMockup />
        </div>

        {/* TOP LEFT */}

        <FloatingCard
            title="Gateando hasta el aamanecer 2026!!"
            image={partyImg}
            city="Colonia"
            type="official"
            category="event"
            className="
            top-30
            left-5
            z-30
            rotate-[-8deg]
            scale-90
            "
        />

        {/* TOP RIGHT */}

        <FloatingCard
            title="La Casita Peruana 🥟 🍠 🍹"
            image={restauranImg}
            
            city="Hamburg"
            type="community"
            category="event"
            className="
            top-45
            right-0
            z-30
            rotate-[7deg]
            scale-90
            "
        />

        {/* BOTTOM LEFT */}

        <FloatingCard
            title="Latin Market"
            city="Köln"
            type="official"
            image={marketImg}
            category="business"
            className="
            bottom-35
            -left-25
            z-30
            -rotate-6
            scale-90
            "
        />

        {/* BOTTOM RIGHT */}

        <FloatingCard
            title="Community Event"
            city="Frankfurt"
            type="community"
            image={comunityImg}
            category="event"
            className="
            bottom-25
            -right-25
            z-30
            rotate-[8deg]
            scale-90
            "
        />

        {/* GLOW */}

        <div
            className="
            absolute
            left-1/2
            top-1/2
            z-10
            h-125
            w-125
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#2563EB]/10
            blur-3xl
            "
        />
        </div>
    );
}