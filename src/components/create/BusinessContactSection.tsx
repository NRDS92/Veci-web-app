"use client";

import { useState } from "react";

type ContactType =
    | "email"
    | "phone"
    | "website"
    | "instagram"
    | "whatsapp";

interface BusinessContactSectionProps {
    email: string;
    phone: string;
    website: string;
    instagram: string;
    whatsapp: string;

    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onWebsiteChange: (value: string) => void;
    onInstagramChange: (value: string) => void;
    onWhatsappChange: (value: string) => void;

    loading: boolean;
}

interface ContactOption {
    type: ContactType;
    label: string;
    icon: string;
    iconType: "solid" | "brands";
    placeholder: string;
    inputType: "text" | "email" | "tel" | "url";
}

const contactOptions: ContactOption[] = [
    {
        type: "email",
        label: "Email",
        icon: "fa-envelope",
        iconType: "solid",
        placeholder: "example@email.com",
        inputType: "email",
    },
    {
        type: "phone",
        label: "Phone",
        icon: "fa-phone",
        iconType: "solid",
        placeholder: "+49 123 456789",
        inputType: "tel",
    },
    {
        type: "website",
        label: "Website",
        icon: "fa-globe",
        iconType: "solid",
        placeholder: "https://example.com",
        inputType: "url",
    },
    {
        type: "instagram",
        label: "Instagram",
        icon: "fa-instagram",
        iconType: "brands",
        placeholder: "https://instagram.com/yourbusiness",
        inputType: "text",
    },
    {
        type: "whatsapp",
        label: "WhatsApp",
        icon: "fa-whatsapp",
        iconType: "brands",
        placeholder: "+49 123 456789",
        inputType: "tel",
    },
];

export default function BusinessContactSection({
    email,
    phone,
    website,
    instagram,
    whatsapp,
    onEmailChange,
    onPhoneChange,
    onWebsiteChange,
    onInstagramChange,
    onWhatsappChange,
    loading,
}: BusinessContactSectionProps) {
    const [selectedType, setSelectedType] =
        useState<ContactType | "">("");

    const [contactValue, setContactValue] =
        useState("");

    const getValue = (type: ContactType) => {
        switch (type) {
            case "email":
                return email;

            case "phone":
                return phone;

            case "website":
                return website;

            case "instagram":
                return instagram;

            case "whatsapp":
                return whatsapp;
        }
    };

    const setValue = (
        type: ContactType,
        value: string
    ) => {
        switch (type) {
            case "email":
                onEmailChange(value);
                break;

            case "phone":
                onPhoneChange(value);
                break;

            case "website":
                onWebsiteChange(value);
                break;

            case "instagram":
                onInstagramChange(value);
                break;

            case "whatsapp":
                onWhatsappChange(value);
                break;
        }
    };

    const selectedOption = contactOptions.find(
        (option) => option.type === selectedType
    );

    const handleSelect = (
        type: ContactType
    ) => {
        setSelectedType(type);
        setContactValue(getValue(type));
    };

    const handleAdd = () => {
        if (!selectedType || !contactValue.trim()) {
            return;
        }

        setValue(
            selectedType,
            contactValue.trim()
        );

        setContactValue("");
        setSelectedType("");
    };

    const handleRemove = (
        type: ContactType
    ) => {
        setValue(type, "");

        if (selectedType === type) {
            setSelectedType("");
            setContactValue("");
        }
    };

    const addedContacts = contactOptions.filter(
        (option) =>
            getValue(option.type).trim().length > 0
    );

    return (
        <section className="space-y-5">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Contact
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Add the ways people can contact or find your business.
                </p>
            </div>

            {/* ==================================================
                ADD CONTACT
            ================================================== */}

            <div className="space-y-3">
                <label
                    htmlFor="contact-type"
                    className="block text-sm font-medium text-gray-700"
                >
                    Add contact
                </label>

                <select
                    id="contact-type"
                    value={selectedType}
                    onChange={(event) =>
                        handleSelect(
                            event.target.value as ContactType
                        )
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10"
                >
                    <option value="">
                        Select a contact method
                    </option>

                    {contactOptions
                        .filter(
                            (option) =>
                                !getValue(option.type)
                        )
                        .map((option) => (
                            <option
                                key={option.type}
                                value={option.type}
                            >
                                {option.label}
                            </option>
                        ))}
                </select>
            </div>

            {/* ==================================================
                CONTACT VALUE
            ================================================== */}

            {selectedOption && (
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <i
                                className={`${
                                    selectedOption.iconType ===
                                    "brands"
                                        ? "fa-brands"
                                        : "fa-solid"
                                } ${selectedOption.icon}`}
                            />
                        </span>

                        <input
                            type={selectedOption.inputType}
                            value={contactValue}
                            onChange={(event) =>
                                setContactValue(
                                    event.target.value
                                )
                            }
                            placeholder={
                                selectedOption.placeholder
                            }
                            disabled={loading}
                            autoFocus
                            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={
                            loading ||
                            !contactValue.trim()
                        }
                        className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>
            )}

            {/* ==================================================
                ADDED CONTACTS
            ================================================== */}

            {addedContacts.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                        Contact methods
                    </p>

                    <div className="space-y-2">
                        {addedContacts.map((option) => (
                            <div
                                key={option.type}
                                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                            >
                                {/* Icon */}

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
                                    <i
                                        className={`${
                                            option.iconType ===
                                            "brands"
                                                ? "fa-brands"
                                                : "fa-solid"
                                        } ${option.icon}`}
                                    />
                                </div>

                                {/* Information */}

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500">
                                        {option.label}
                                    </p>

                                    <p className="truncate text-sm text-gray-900">
                                        {getValue(option.type)}
                                    </p>
                                </div>

                                {/* Remove */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemove(
                                            option.type
                                        )
                                    }
                                    disabled={loading}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                                    aria-label={`Remove ${option.label}`}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
