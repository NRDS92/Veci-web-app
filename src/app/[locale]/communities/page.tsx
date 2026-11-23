import Link from "next/link";
import { getPublicCommunities } from "@/lib/api/public-content";

type CommunitiesPageProps = { params: Promise<{ locale: string }> };

export default async function CommunitiesPage({ params }: CommunitiesPageProps) {
    const { locale } = await params;
    const communities = await getPublicCommunities();

    return (
        <main className="min-h-screen bg-white px-5 pb-16 pt-28 text-gray-900">
            <section className="mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold">Latino Communities</h1>
                <p className="mt-3 max-w-2xl text-gray-600">Find local communities, shared interests and events.</p>
                {communities.length === 0 ? (
                    <p className="mt-10 rounded-2xl bg-gray-50 p-8 text-gray-600">No public communities are available yet.</p>
                ) : (
                    <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {communities.map((community) => (
                            <li key={community.id}>
                                <Link href={`/${locale}/communities/${community.slug}`} className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    {community.images.cover || community.images.profile ? (
                                        <img src={community.images.cover || community.images.profile} alt="" className="h-48 w-full object-cover" />
                                    ) : (
                                        <div aria-hidden="true" className="h-48 bg-gradient-to-br from-orange-100 to-rose-100" />
                                    )}
                                    <div className="p-5">
                                        <h2 className="text-xl font-semibold group-hover:text-orange-700">{community.name}</h2>
                                        <p className="mt-1 text-sm text-gray-600">{community.cityId}, {community.country}</p>
                                        {community.description ? <p className="mt-3 line-clamp-3 text-sm text-gray-700">{community.description}</p> : null}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {community.interests.slice(0, 4).map((interest) => <span key={interest} className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-900">{interest}</span>)}
                                        </div>
                                        <p className="mt-4 text-sm text-gray-600">{community.memberCount} members</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
