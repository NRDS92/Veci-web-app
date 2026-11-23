import type { Metadata } from "next";
import Link from "next/link";
import { getPublicCommunityContentBySlug, getPublicCommunityEvents } from "@/lib/api/public-content";

type CommunityPageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: CommunityPageProps): Promise<Metadata> {
    const { slug } = await params;
    const content = await getPublicCommunityContentBySlug(slug);
    if (!content) return { title: "Community not found | VECI", robots: { index: false, follow: false } };
    const { publication, entity } = content;
    const title = publication.seoTitle || `${entity.name} | VECI`;
    const description = publication.seoDescription || entity.description || `Meet ${entity.name} on VECI.`;
    const canonical = publication.canonicalUrl || `https://veci-latin.com/communities/${entity.slug}`;
    const image = entity.images.cover || entity.images.profile;
    return {
        title, description, alternates: { canonical }, robots: { index: true, follow: true },
        openGraph: { title, description, url: canonical, type: "website", siteName: "VECI", ...(image ? { images: [{ url: image, alt: entity.name }] } : {}) },
        twitter: { card: image ? "summary_large_image" : "summary", title, description, ...(image ? { images: [image] } : {}) },
    };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
    const { locale, slug } = await params;
    const content = await getPublicCommunityContentBySlug(slug);
    if (!content) {
        return <main className="mx-auto min-h-screen max-w-4xl px-6 pb-16 pt-32"><h1 className="text-3xl font-bold">Community not found</h1><p className="mt-3 text-gray-600">This community is not currently public.</p></main>;
    }
    const { entity } = content;
    let events = [] as Awaited<ReturnType<typeof getPublicCommunityEvents>>;
    let eventsUnavailable = false;
    try {
        events = await getPublicCommunityEvents(entity.id);
    } catch (error) {
        console.error("Community event retrieval failed", error);
        eventsUnavailable = true;
    }
    const image = entity.images.cover || entity.images.profile;
    return (
        <main className="min-h-screen bg-white text-gray-900">
            {image ? <img src={image} alt={`${entity.name} cover`} className="h-72 w-full object-cover md:h-96" /> : <div aria-hidden="true" className="h-72 bg-gradient-to-br from-orange-100 to-rose-100 md:h-96" />}
            <article className="mx-auto max-w-5xl px-5 py-10 md:py-14">
                <Link href={`/${locale}/communities`} className="text-sm font-medium text-orange-800 hover:underline">← All communities</Link>
                <header className="mt-5 flex flex-wrap items-start justify-between gap-5">
                    <div><h1 className="text-4xl font-bold">{entity.name}</h1><p className="mt-2 text-gray-600">{entity.cityId}, {entity.country}</p></div>
                    <p className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-950">{entity.memberCount} members</p>
                </header>
                {entity.description ? <section className="mt-8"><h2 className="text-xl font-semibold">About</h2><p className="mt-3 whitespace-pre-line leading-7 text-gray-700">{entity.description}</p></section> : null}
                {entity.interests.length ? <section className="mt-8"><h2 className="text-xl font-semibold">Interests</h2><ul className="mt-3 flex flex-wrap gap-2">{entity.interests.map((interest) => <li key={interest} className="rounded-full bg-gray-100 px-3 py-1 text-sm">{interest}</li>)}</ul></section> : null}
                {entity.images.gallery.length ? <section className="mt-8"><h2 className="text-xl font-semibold">Gallery</h2><ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">{entity.images.gallery.map((url) => <li key={url}><img src={url} alt="" className="h-48 w-full rounded-xl object-cover" loading="lazy" /></li>)}</ul></section> : null}
                <section className="mt-8"><h2 className="text-xl font-semibold">Community events</h2>{eventsUnavailable ? <p className="mt-3 text-gray-600">Community events are temporarily unavailable.</p> : events.length ? <ul className="mt-4 grid gap-4 sm:grid-cols-2">{events.map((event) => <li key={event.id}><Link href={`/${locale}/events/${event.slug}`} className="block rounded-xl border border-gray-200 p-4 hover:border-orange-400"><h3 className="font-semibold">{event.title}</h3><p className="mt-1 text-sm text-gray-600">{new Date(event.dateStart).toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" })}</p><p className="mt-1 text-sm text-gray-600">{event.cityId} · {event.address}</p></Link></li>)}</ul> : <p className="mt-3 text-gray-600">No upcoming Community events.</p>}</section>
                {Object.values(entity.contact).some(Boolean) ? <section className="mt-8"><h2 className="text-xl font-semibold">Contact</h2><ul className="mt-3 space-y-2 text-gray-700">
                    {entity.contact.website ? <li><a className="text-orange-800 hover:underline" href={entity.contact.website} target="_blank" rel="noreferrer">Website</a></li> : null}
                    {entity.contact.instagram ? <li><a className="text-orange-800 hover:underline" href={`https://instagram.com/${entity.contact.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer">Instagram</a></li> : null}
                    {entity.contact.whatsapp ? <li><a className="text-orange-800 hover:underline" href={`https://wa.me/${entity.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a></li> : null}
                    {entity.contact.email ? <li><a className="text-orange-800 hover:underline" href={`mailto:${entity.contact.email}`}>Email</a></li> : null}
                </ul></section> : null}
            </article>
        </main>
    );
}
