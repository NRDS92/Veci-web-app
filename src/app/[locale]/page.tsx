import Hero from "../../../src/sections/Hero";
import CTA from "../../../src/sections/CTA";
import VeciBackground from "@/components/background/VeciBackground";
import Problem from "@/components/sections/problem/Problem";
import HowItWorks from "@/components/sections/howWorks/HowItWorks";

export default function Home() {
    return (
        <>
            <VeciBackground />

            <main className="relative z-10">
                <Hero />
                <Problem />
                <HowItWorks />
                <CTA />
            </main>
        </>
    );
}