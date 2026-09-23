"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "@/i18n/navigation";

import ImageUpload from "@/components/upload/ImageUpload";
import { eventsService } from "@/features/events/events.service";
import {
    EventCategory,
    EventType,
    CreateEventRequest,
} from "@/features/events/events.types";

const categories: {
    value: EventCategory;
    label: string;
}[] = [
    { value: "party", label: "Party" },
    { value: "food", label: "Food" },
    { value: "culture", label: "Culture" },
    { value: "sports", label: "Sports" },
    { value: "meetup", label: "Meetup" },
    { value: "concert", label: "Concert" },
];

export default function EventForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [eventType, setEventType] =
        useState<EventType>("community");

    const [category, setCategory] =
        useState<EventCategory>("culture");

    const [image, setImage] = useState("");

    const [cityId, setCityId] =
        useState("Cologne");

    const [address, setAddress] = useState("");

    const [dateStart, setDateStart] = useState("");

    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const [goodToKnowInput, setGoodToKnowInput] =
        useState("");

    const [goodToKnow, setGoodToKnow] =
        useState<string[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addGoodToKnow = () => {
        const value = goodToKnowInput.trim();

        if (!value) {
            return;
        }

        setGoodToKnow((current) => [
            ...current,
            value,
        ]);

        setGoodToKnowInput("");
    };

    const removeGoodToKnow = (index: number) => {
        setGoodToKnow((current) =>
            current.filter((_, itemIndex) => itemIndex !== index)
        );
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError(null);

        if (!title.trim()) {
            setError("Please enter an event title.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter a description.");
            return;
        }

        if (!image) {
            setError("Please upload an event image.");
            return;
        }

        if (!address.trim()) {
            setError("Please enter the event address.");
            return;
        }

        if (!dateStart) {
            setError("Please select a date.");
            return;
        }

        const selectedDate = new Date(dateStart);

        if (selectedDate <= new Date()) {
            setError("The event date must be in the future.");
            return;
        }

        try {
            setLoading(true);

            const payload: CreateEventRequest = {
                title: title.trim(),
                description: description.trim(),
                eventType,
                category,
                cityId,
                images: [image],
                address: address.trim(),

                // Temporary Cologne coordinates.
                // We should replace these with the actual
                // selected-city coordinates before production.
                latitude: 50.9375,
                longitude: 6.9603,

                dateStart: selectedDate.toISOString(),

                contact: {
                    website: website.trim() || undefined,
                    instagram: instagram.trim() || undefined,
                    whatsapp: whatsapp.trim() || undefined,
                },

                goodToKnow,
            };

            await eventsService.createEvent(payload);

            router.push("/");

        } catch (err) {
            console.error(err);

            setError(
                "The event could not be submitted. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Event image
                    </h2>

                    <p className="text-sm text-gray-500">
                        Add a cover image for your event.
                    </p>
                </div>

                <ImageUpload
                    value={image}
                    onChange={setImage}
                    onRemove={() => setImage("")}
                    disabled={loading}
                />
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Basic information
                    </h2>
                </div>

                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Event title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="e.g. Latin Night in Cologne"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00]"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Tell people about your event..."
                        rows={5}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00]"
                        disabled={loading}
                    />
                </div>
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Category
                    </h2>
                </div>

                <select
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target.value as EventCategory
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                >
                    {categories.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Event type
                    </h2>

                    <p className="text-sm text-gray-500">
                        Choose whether this is a community event
                        or an official business event.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() =>
                            setEventType("community")
                        }
                        className={`rounded-xl border p-4 text-left ${
                            eventType === "community"
                                ? "border-[#FF7A00] bg-orange-50"
                                : "border-gray-200"
                        }`}
                        disabled={loading}
                    >
                        <p className="font-semibold">
                            Community event
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            An event created by the community.
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setEventType("official")
                        }
                        className={`rounded-xl border p-4 text-left ${
                            eventType === "official"
                                ? "border-[#FF7A00] bg-orange-50"
                                : "border-gray-200"
                        }`}
                        disabled={loading}
                    >
                        <p className="font-semibold">
                            Official event
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            An event associated with a business.
                        </p>
                    </button>
                </div>
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Location
                    </h2>
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        City
                    </label>

                    <select
                        id="city"
                        value={cityId}
                        onChange={(event) =>
                            setCityId(event.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    >
                        <option value="Cologne">
                            Cologne
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Address
                    </label>

                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(event) =>
                            setAddress(event.target.value)
                        }
                        placeholder="Street, number..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00]"
                        disabled={loading}
                    />
                </div>
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Date
                    </h2>
                </div>

                <input
                    type="datetime-local"
                    value={dateStart}
                    onChange={(event) =>
                        setDateStart(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Contact
                    </h2>

                    <p className="text-sm text-gray-500">
                        Optional contact information.
                    </p>
                </div>

                <input
                    type="url"
                    value={website}
                    onChange={(event) =>
                        setWebsite(event.target.value)
                    }
                    placeholder="Website"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={instagram}
                    onChange={(event) =>
                        setInstagram(event.target.value)
                    }
                    placeholder="Instagram"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={whatsapp}
                    onChange={(event) =>
                        setWhatsapp(event.target.value)
                    }
                    placeholder="WhatsApp"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />
            </section>

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Good to know
                    </h2>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={goodToKnowInput}
                        onChange={(event) =>
                            setGoodToKnowInput(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                addGoodToKnow();
                            }
                        }}
                        placeholder="e.g. Free entry"
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3"
                        disabled={loading}
                    />

                    <button
                        type="button"
                        onClick={addGoodToKnow}
                        className="rounded-xl border border-gray-300 px-4 py-3 font-medium"
                        disabled={loading}
                    >
                        Add
                    </button>
                </div>

                {goodToKnow.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {goodToKnow.map((item, index) => (
                            <button
                                key={`${item}-${index}`}
                                type="button"
                                onClick={() =>
                                    removeGoodToKnow(index)
                                }
                                className="rounded-full bg-gray-100 px-3 py-2 text-sm"
                            >
                                {item} ×
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#FF7A00] px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading
                    ? "Submitting..."
                    : "Create Event"}
            </button>
        </form>
    );
}