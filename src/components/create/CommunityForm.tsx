"use client";

import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { CreateCommunityRequestSchema, type OwnerCommunity } from "@ndrs92/contracts";

import { getApiError } from "@/lib/api/apiError";
import { Link } from "@/i18n/navigation";
import CitySelector from "@/components/ui/citySelector/CitySelector";
import ImageUpload from "@/components/upload/ImageUpload";
import MultipleImageUpload from "@/components/upload/MultipleImageUpload";
import { communityService } from "@/features/communities/community.service";

const cleanOptional = (value: string) => value.trim() || undefined;

export default function CommunityForm() {
    const t = useTranslations("CommunityCreation");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cityId, setCityId] = useState("");
    const [country, setCountry] = useState("");
    const [interestsInput, setInterestsInput] = useState("");
    const [membershipPolicy, setMembershipPolicy] = useState<"open" | "approval">("approval");
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [gallery, setGallery] = useState<string[]>([]);
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requiresLogin, setRequiresLogin] = useState(false);
    const [createdCommunity, setCreatedCommunity] = useState<OwnerCommunity | null>(null);
    const submittingRef = useRef(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submittingRef.current) return;

        const imageFields = {
            ...(profileImage ? { profile: profileImage } : {}),
            ...(coverImage ? { cover: coverImage } : {}),
            ...(gallery.length ? { gallery } : {}),
        };
        const contactFields = {
            ...(cleanOptional(website) ? { website: cleanOptional(website) } : {}),
            ...(cleanOptional(instagram) ? { instagram: cleanOptional(instagram) } : {}),
            ...(cleanOptional(whatsapp) ? { whatsapp: cleanOptional(whatsapp) } : {}),
            ...(cleanOptional(email) ? { email: cleanOptional(email) } : {}),
        };
        const request = {
            name,
            ...(cleanOptional(description) ? { description: cleanOptional(description) } : {}),
            cityId,
            country,
            interests: interestsInput.split(/[\n,]/).map((interest) => interest.trim()).filter(Boolean),
            membershipPolicy,
            ...(Object.keys(imageFields).length ? { images: imageFields } : {}),
            ...(Object.keys(contactFields).length ? { contact: contactFields } : {}),
        };
        const validation = CreateCommunityRequestSchema.safeParse(request);

        if (!validation.success) {
            setError(t("errors.invalidForm"));
            return;
        }

        submittingRef.current = true;
        setSubmitting(true);
        setError(null);
        setRequiresLogin(false);
        try {
            const community = await communityService.createCommunity(validation.data);
            setCreatedCommunity(community);
        } catch (submitError) {
            if (axios.isAxiosError<{ message?: string }>(submitError)) {
                const message = submitError.response?.data?.message;
                const unauthorized = submitError.response?.status === 401;
                setError(unauthorized ? t("errors.unauthorized") : message || getApiError(submitError).message);
                setRequiresLogin(unauthorized);
            } else {
                setError(getApiError(submitError).message);
            }
        } finally {
            submittingRef.current = false;
            setSubmitting(false);
        }
    };

    if (createdCommunity) {
        return (
            <section className="space-y-4" role="status" aria-live="polite">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h2 className="text-lg font-semibold text-gray-900">{t("success.title")}</h2>
                    <p className="mt-2 text-sm text-gray-700">
                        {createdCommunity.moderationStatus === "pending"
                            ? t("success.pending")
                            : t("success.received")}
                    </p>
                    <p className="mt-3 break-all text-sm text-gray-600">
                        {t("success.reference", { id: createdCommunity.id })}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                    <Link href="/" className="text-[#FF7A00] hover:underline">{t("success.home")}</Link>
                    <Link href="/create" className="text-gray-700 hover:underline">{t("success.back")}</Link>
                </div>
            </section>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate aria-busy={submitting}>
            <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">{t("sections.details")}</h2>
                <div>
                    <label htmlFor="community-name" className="mb-2 block text-sm font-medium text-gray-700">{t("fields.name")}</label>
                    <input id="community-name" name="name" required minLength={2} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} disabled={submitting} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:bg-gray-50" />
                </div>
                <div>
                    <label htmlFor="community-description" className="mb-2 block text-sm font-medium text-gray-700">{t("fields.description")}</label>
                    <textarea id="community-description" name="description" maxLength={5000} rows={4} value={description} onChange={(event) => setDescription(event.target.value)} disabled={submitting} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:bg-gray-50" />
                </div>
                <div>
                    <CitySelector value={cityId} onChange={setCityId} disabled={submitting} />
                </div>
                <div>
                    <label htmlFor="community-country" className="mb-2 block text-sm font-medium text-gray-700">{t("fields.country")}</label>
                    <input id="community-country" name="country" required minLength={2} maxLength={120} value={country} onChange={(event) => setCountry(event.target.value)} disabled={submitting} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:bg-gray-50" />
                </div>
                <div>
                    <label htmlFor="community-interests" className="mb-2 block text-sm font-medium text-gray-700">{t("fields.interests")}</label>
                    <textarea id="community-interests" name="interests" value={interestsInput} onChange={(event) => setInterestsInput(event.target.value)} disabled={submitting} placeholder={t("fields.interestsPlaceholder")} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:bg-gray-50" />
                    <p className="mt-1 text-xs text-gray-500">{t("fields.interestsHelp")}</p>
                </div>
                <fieldset className="space-y-3">
                    <legend className="mb-2 text-sm font-medium text-gray-700">{t("fields.membershipPolicy")}</legend>
                    <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                        <input type="radio" name="membershipPolicy" value="open" checked={membershipPolicy === "open"} onChange={() => setMembershipPolicy("open")} disabled={submitting} />
                        <span className="text-sm text-gray-700">{t("fields.open")}</span>
                    </label>
                    <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                        <input type="radio" name="membershipPolicy" value="approval" checked={membershipPolicy === "approval"} onChange={() => setMembershipPolicy("approval")} disabled={submitting} />
                        <span className="text-sm text-gray-700">{t("fields.approval")}</span>
                    </label>
                </fieldset>
            </div>

            <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">{t("sections.images")}</h2>
                <fieldset>
                    <legend className="mb-2 text-sm font-medium text-gray-700">{t("fields.profileImage")}</legend>
                    <ImageUpload value={profileImage || undefined} onChange={setProfileImage} onRemove={() => setProfileImage("")} disabled={submitting} />
                </fieldset>
                <fieldset>
                    <legend className="mb-2 text-sm font-medium text-gray-700">{t("fields.coverImage")}</legend>
                    <ImageUpload value={coverImage || undefined} onChange={setCoverImage} onRemove={() => setCoverImage("")} disabled={submitting} />
                </fieldset>
                <fieldset>
                    <legend className="mb-2 text-sm font-medium text-gray-700">{t("fields.gallery")}</legend>
                    <MultipleImageUpload value={gallery} onChange={setGallery} disabled={submitting} maxImages={12} />
                </fieldset>
            </div>

            <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">{t("sections.contact")}</h2>
                {([
                    ["website", website, setWebsite, "url"],
                    ["instagram", instagram, setInstagram, "text"],
                    ["whatsapp", whatsapp, setWhatsapp, "tel"],
                    ["email", email, setEmail, "email"],
                ] as const).map(([field, value, setter, type]) => (
                    <div key={field}>
                        <label htmlFor={`community-${field}`} className="mb-2 block text-sm font-medium text-gray-700">{t(`fields.${field}`)}</label>
                        <input id={`community-${field}`} name={field} type={type} maxLength={field === "instagram" ? 100 : field === "whatsapp" ? 40 : undefined} value={value} onChange={(event) => setter(event.target.value)} disabled={submitting} className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:bg-gray-50" />
                    </div>
                ))}
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                    <p>{error}</p>
                    {requiresLogin && <Link href="/login" className="mt-2 inline-block font-semibold underline">{t("errors.login")}</Link>}
                </div>
            )}

            <button type="submit" disabled={submitting} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#FF7A00] px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? t("actions.submitting") : t("actions.submit")}
            </button>
        </form>
    );
}
