import Hero from "@/components/home/Hero";
import CTA from "../../../src/sections/CTA";
import VeciBackground from "@/components/background/VeciBackground";
import Problem from "@/components/sections/problem/Problem";
import HowItWorks from "@/components/sections/howWorks/HowItWorks";
import Discovery from "../../components/discovery/Discovery";


export default function Home() {
    return (
        <>
            <VeciBackground />

            <main className="relative z-10">
                <Hero
                    city="Köln"
                    country="Alemania"
                    />
                <Discovery />
                <Problem />
                <HowItWorks />
                <CTA />
            </main>
        </>
    );
}