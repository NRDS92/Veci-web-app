import { Eye, Check, X } from "lucide-react";

import { AdminBusiness } from "@/features/admin/business/types/business";

import StatusBadge from "../StatusBadge/StatusBadge";

interface Props {
    business: AdminBusiness;
    onView: (business: AdminBusiness) => void;
}

export default function BusinessRow({
    business,
    onView,
}: Props) {

    const image = business.images?.profile;

    const isRemote =
        image?.startsWith("http");

    return (

        <tr className="border-t hover:bg-gray-50 transition-colors">

            <td className="px-4 py-3">

                {isRemote ? (

                    <img
                        src={image}
                        alt={business.name}
                        className="h-14 w-20 rounded-md object-cover"
                    />

                ) : (

                    <div className="flex h-14 w-20 flex-col items-center justify-center rounded-md bg-gray-100 text-gray-400">

                        <span className="text-xl">
                            🏪
                        </span>

                        <span className="text-[10px]">
                            No image
                        </span>

                    </div>

                )}

            </td>

            <td className="px-4 py-3 font-medium">
                {business.name}
            </td>

            <td className="px-4 py-3 capitalize">
                {business.category}
            </td>

            <td className="px-4 py-3">
                {business.location.cityId}
            </td>

            <td className="px-4 py-3">
                <StatusBadge
                    status={business.moderation.status}
                />
            </td>

            <td className="px-4 py-3">

                {new Date(
                    business.createdAt
                ).toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }
                )}

            </td>

            <td className="px-4 py-3">

                <div className="flex gap-2">

                    <button
                        onClick={() => onView(business)}
                        className="rounded-md p-2 transition hover:bg-gray-100"
                    >
                        <Eye size={18} />
                    </button>

                    <button className="rounded-md p-2 transition hover:bg-green-100">
                        <Check size={18} />
                    </button>

                    <button className="rounded-md p-2 transition hover:bg-red-100">
                        <X size={18} />
                    </button>

                </div>

            </td>

        </tr>

    );

} 