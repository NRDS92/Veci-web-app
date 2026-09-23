"use client";

import {
    FormEvent,
    useEffect,
    useState,
} from "react";

import { useRouter } from "@/i18n/navigation";

import ImageUpload from "@/components/upload/ImageUpload";
import LocationSelector from "@/components/location/LocationSelector";

import { eventsService } from "@/features/events/events.service";
import {
    EventCategory,
    EventType,
    CreateEventRequest,
} from "@/features/events/events.types";

import { LocationData } from "@/features/location/location.types";

import { businessService } from "@/features/business/business.service";
import { MyBusiness } from "@/features/business/business.types";

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

    const [location, setLocation] =
        useState<LocationData | null>(null);

    const [dateStart, setDateStart] = useState("");

    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const [goodToKnowInput, setGoodToKnowInput] =
        useState("");

    const [goodToKnow, setGoodToKnow] =
        useState<string[]>([]);

    /*
     * BUSINESS
     */
    const [businesses, setBusinesses] =
        useState<MyBusiness[]>([]);

    const [selectedBusinessId, setSelectedBusinessId] =
        useState("");

    const [loadingBusinesses, setLoadingBusinesses] =
        useState(false);

    /*
     * FORM
     */
    const [loading, setLoading] = useState(false);

    const [error, setError] =
        useState<string | null>(null);

    /*
     * FETCH USER BUSINESSES
     */
    const fetchMyBusinesses = async () => {
        try {
            setLoadingBusinesses(true);
            setError(null);

            const response =
                await businessService.getMyBusinesses();

            setBusinesses(response.data.data);
        } catch (error) {
            console.error(
                "Failed to load businesses:",
                error
            );

            setBusinesses([]);

            setError(
                "Unable to load your businesses."
            );
        } finally {
            setLoadingBusinesses(false);
        }
    };

    /*
     * LOAD BUSINESSES ONLY FOR OFFICIAL EVENTS
     */
    useEffect(() => {
        if (eventType === "official") {
            fetchMyBusinesses();
            return;
        }

        setBusinesses([]);
        setSelectedBusinessId("");
    }, [eventType]);

    /*
     * GOOD TO KNOW
     */
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

    const removeGoodToKnow = (
        index: number
    ) => {
        setGoodToKnow((current) =>
            current.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            )
        );
    };

    /*
     * SUBMIT
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError(null);

        /*
         * BASIC VALIDATION
         */
        if (!title.trim()) {
            setError(
                "Please enter an event title."
            );
            return;
        }

        if (!description.trim()) {
            setError(
                "Please enter a description."
            );
            return;
        }

        if (!image) {
            setError(
                "Please upload an event image."
            );
            return;
        }

        /*
         * OFFICIAL EVENT VALIDATION
         */
        if (
            eventType === "official" &&
            !selectedBusinessId
        ) {
            setError(
                "Please select a business for this official event."
            );
            return;
        }

        if (!location) {
            setError(
                "Please select the event location."
            );
            return;
        }

        if (!dateStart) {
            setError(
                "Please select a date."
            );
            return;
        }

        const selectedDate =
            new Date(dateStart);

        if (selectedDate <= new Date()) {
            setError(
                "The event date must be in the future."
            );
            return;
        }

        try {
            setLoading(true);

            /*
             * EVENT PAYLOAD
             *
             * Community event:
             * businessId = undefined
             *
             * Official event:
             * businessId = selected business
             */
            const payload: CreateEventRequest & {
                businessId?: string;
            } = {
                title: title.trim(),

                description:
                    description.trim(),

                eventType,

                category,

                businessId:
                    eventType === "official"
                        ? selectedBusinessId
                        : undefined,

                cityId: location.city,

                images: [image],

                address:
                    location.formattedAddress,

                latitude:
                    location.latitude,

                longitude:
                    location.longitude,

                dateStart:
                    selectedDate.toISOString(),

                contact: {
                    website:
                        website.trim() ||
                        undefined,

                    instagram:
                        instagram.trim() ||
                        undefined,

                    whatsapp:
                        whatsapp.trim() ||
                        undefined,
                },

                goodToKnow,
            };

            await eventsService.createEvent(
                payload
            );

            router.push("/");

        } catch (err) {
            console.error(
                "Event creation failed:",
                err
            );

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
            {/* EVENT IMAGE */}

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
                    onRemove={() =>
                        setImage("")
                    }
                    disabled={loading}
                />
            </section>

            {/* BASIC INFORMATION */}

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
                            setTitle(
                                event.target.value
                            )
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
                            setDescription(
                                event.target.value
                            )
                        }
                        placeholder="Tell people about your event..."
                        rows={5}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00]"
                        disabled={loading}
                    />
                </div>
            </section>

            {/* CATEGORY */}

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
                            event.target
                                .value as EventCategory
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                >
                    {categories.map(
                        (item) => (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        )
                    )}
                </select>
            </section>

            {/* EVENT TYPE */}

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
                            setEventType(
                                "community"
                            )
                        }
                        className={`rounded-xl border p-4 text-left ${
                            eventType ===
                            "community"
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
                            setEventType(
                                "official"
                            )
                        }
                        className={`rounded-xl border p-4 text-left ${
                            eventType ===
                            "official"
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

            {/* BUSINESS */}

            {eventType === "official" && (
                <section className="space-y-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Business
                        </h2>

                        <p className="text-sm text-gray-500">
                            Select the business associated with this official event.
                        </p>
                    </div>

                    {loadingBusinesses ? (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-500">
                            Loading your businesses...
                        </div>
                    ) : businesses.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                            <p className="font-medium text-gray-900">
                                You don't have any business yet.
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Create a business before creating an official event.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        "/create/business"
                                    )
                                }
                                disabled={loading}
                                className="mt-4 rounded-xl bg-[#FF7A00] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                            >
                                Create a business
                            </button>
                        </div>
                    ) : (
                        <div>
                            <label
                                htmlFor="business"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Associated business
                            </label>

                            <select
                                id="business"
                                value={
                                    selectedBusinessId
                                }
                                onChange={(event) =>
                                    setSelectedBusinessId(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    loading ||
                                    loadingBusinesses
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20"
                            >
                                <option value="">
                                    Select a business
                                </option>

                                {businesses.map(
                                    (business) => (
                                        <option
                                            key={
                                                business._id
                                            }
                                            value={
                                                business._id
                                            }
                                        >
                                            {
                                                business.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    )}
                </section>
            )}

            {/* LOCATION */}

            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Location
                    </h2>

                    <p className="text-sm text-gray-500">
                        Search and select the location of the event.
                    </p>
                </div>

                <LocationSelector
                    value={location}
                    onChange={setLocation}
                    disabled={loading}
                />

                {location && (
                    <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                        <p>
                            <span className="font-medium">
                                City:
                            </span>{" "}
                            {location.city}
                        </p>

                        <p>
                            <span className="font-medium">
                                Country:
                            </span>{" "}
                            {location.country}
                        </p>

                        {location.state && (
                            <p>
                                <span className="font-medium">
                                    State:
                                </span>{" "}
                                {location.state}
                            </p>
                        )}

                        <p>
                            <span className="font-medium">
                                Address:
                            </span>{" "}
                            {location.formattedAddress}
                        </p>
                    </div>
                )}
            </section>

            {/* DATE */}

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
                        setDateStart(
                            event.target.value
                        )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />
            </section>

            {/* CONTACT */}

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
                        setWebsite(
                            event.target.value
                        )
                    }
                    placeholder="Website"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={instagram}
                    onChange={(event) =>
                        setInstagram(
                            event.target.value
                        )
                    }
                    placeholder="Instagram"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={whatsapp}
                    onChange={(event) =>
                        setWhatsapp(
                            event.target.value
                        )
                    }
                    placeholder="WhatsApp"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    disabled={loading}
                />
            </section>

            {/* GOOD TO KNOW */}

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
                            setGoodToKnowInput(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key ===
                                "Enter"
                            ) {
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
                        {goodToKnow.map(
                            (item, index) => (
                                <button
                                    key={`${item}-${index}`}
                                    type="button"
                                    onClick={() =>
                                        removeGoodToKnow(
                                            index
                                        )
                                    }
                                    className="rounded-full bg-gray-100 px-3 py-2 text-sm"
                                >
                                    {item} ×
                                </button>
                            )
                        )}
                    </div>
                )}
            </section>

            {/* ERROR */}

            {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* SUBMIT */}

            <button
                type="submit"
                disabled={
                    loading ||
                    loadingBusinesses
                }
                className="w-full rounded-xl bg-[#FF7A00] px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading
                    ? "Submitting..."
                    : "Create Event"}
            </button>
        </form>
    );
}