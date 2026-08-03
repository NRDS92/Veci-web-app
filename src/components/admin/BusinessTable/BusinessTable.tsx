import { AdminBusiness } from "@/features/admin/business/types/business";
import BusinessRow from "../BusinessRow/BusinessRow";

interface Props {
    businesses: AdminBusiness[];
    onView: (business: AdminBusiness) => void;
}

export default function BusinessTable({
    businesses,
    onView,
}: Props) {

    if (businesses.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                No businesses found.
            </div>
        );
    }

    return (
        <table className="w-full border-collapse">

            <thead className="bg-gray-100">

                <tr>

                    <th className="px-4 py-3 text-left">
                        Logo
                    </th>

                    <th className="px-4 py-3 text-left">
                        Business
                    </th>

                    <th className="px-4 py-3 text-left">
                        Category
                    </th>

                    <th className="px-4 py-3 text-left">
                        City
                    </th>

                    <th className="px-4 py-3 text-left">
                        Status
                    </th>

                    <th className="px-4 py-3 text-left">
                        Created
                    </th>

                    <th className="px-4 py-3 text-left">
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {businesses.map((business) => (

                    <BusinessRow
                        key={business._id}
                        business={business}
                        onView={onView}
                    />

                ))}

            </tbody>

        </table>
    );

}