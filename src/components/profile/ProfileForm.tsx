"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Editar,
  SiluetaColombia,
} from "@mteherandev/colombia-icons-react";

import {
  Loader2,
  Mail,
  MapPin,
  Save,
} from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { userService } from "@/features/users/user.service";

const CITIES = [
  "Cologne",
  "Berlin",
  "Hamburg",
  "Munich",
  "Frankfurt",
];

const COUNTRIES = [
  { value: "CO", label: "Colombia" },
  { value: "VE", label: "Venezuela" },
  { value: "AR", label: "Argentina" },
  { value: "BR", label: "Brazil" },
  { value: "CL", label: "Chile" },
  { value: "EC", label: "Ecuador" },
  { value: "PE", label: "Peru" },
  { value: "MX", label: "Mexico" },
  { value: "BO", label: "Bolivia" },
  { value: "PY", label: "Paraguay" },
  { value: "UY", label: "Uruguay" },
];

interface ProfileFormProps {
  onMessage: (message: string) => void;
  onError: (message: string) => void;
}

export default function ProfileForm({
  onMessage,
  onError,
}: ProfileFormProps) {
  const {
    user,
    refreshUser,
  } = useAuth();

  const [name, setName] = useState("");
  const [cityId, setCityId] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name ?? "");
    setCityId(user.cityId ?? "");
    setOriginCountry(user.originCountry ?? "");
    setBio(user.bio ?? "");
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSave = async () => {
    if (!name.trim()) {
      onError("Name is required.");
      return;
    }

    setSaving(true);
    onMessage("");
    onError("");

    try {
      await userService.updateMe({
        name: name.trim(),
        cityId,
        originCountry,
        bio: bio.trim(),
      });

      await refreshUser();

      onMessage("Profile updated successfully.");
    } catch (error: any) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error
      );

      console.error(
        "RESPONSE:",
        error?.response?.data
      );

      onError(
        error?.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const isColombian =
    originCountry.toUpperCase() === "CO";

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="mb-7 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Personal information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep your profile information up to date.
          </p>
        </div>

        <Editar
          width={24}
          height={24}
        />

      </div>

      <div className="space-y-6">

        {/* Name */}

        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full name
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            autoComplete="name"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Mail size={15} />
            Email
          </label>

          <input
            id="profile-email"
            type="email"
            value={user.email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
          />

          <p className="mt-2 text-xs text-gray-400">
            Your email address cannot be changed here.
          </p>
        </div>

        {/* City */}

        <div>
          <label
            htmlFor="profile-city"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Current city
          </label>

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="profile-city"
              value={cityId}
              onChange={(event) =>
                setCityId(event.target.value)
              }
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Select your city
              </option>

              {CITIES.map((city) => (
                <option
                  key={city}
                  value={city}
                >
                  {city}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Country */}

        <div>
          <label
            htmlFor="profile-country"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Country of origin
          </label>

          <div className="flex items-center gap-3">

            {isColombian && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-50">
                <SiluetaColombia
                  width={27}
                  height={27}
                />
              </div>
            )}

            <select
              id="profile-country"
              value={originCountry}
              onChange={(event) =>
                setOriginCountry(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Select your country
              </option>

              {COUNTRIES.map((country) => (
                <option
                  key={country.value}
                  value={country.value}
                >
                  {country.label}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Bio */}

        <div>
          <div className="mb-2 flex items-center justify-between">

            <label
              htmlFor="profile-bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>

            <span className="text-xs text-gray-400">
              {bio.length}/500
            </span>

          </div>

          <textarea
            id="profile-bio"
            value={bio}
            onChange={(event) =>
              setBio(event.target.value)
            }
            maxLength={500}
            rows={5}
            placeholder="Tell the VECI community a little about yourself..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Saving...
              </>
            ) : (
              <>
                <Save size={17} />

                Save changes
              </>
            )}
          </button>

        </div>

      </div>
    </section>
  );
}