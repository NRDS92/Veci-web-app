import PublicEvents from "@/components/public-content/events/PublicEvents";

export default function EventsPage() {
    console.log("🔥 EVENTS PAGE RENDER");

    return (
        <main className="min-h-screen">
            <PublicEvents limit={12} />
        </main>
    );
}