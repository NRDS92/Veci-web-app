interface DashboardListItem {
    label: string;
    count: number;
}

interface Props {
    title: string;
    items: DashboardListItem[];
}

export default function DashboardList({
    title,
    items,
}: Props) {

    return (

        <div
            className="
                rounded-xl
                border
                bg-white
                p-5
                shadow-sm
            "
        >

            <h3 className="mb-4 text-lg font-semibold">
                {title}
            </h3>

            <div className="space-y-3">

                {items.length === 0 ? (

                    <p className="text-sm text-gray-500">
                        No data available.
                    </p>

                ) : (

                    items.map((item) => (

                        <div
                            key={item.label}
                            className="flex items-center justify-between"
                        >

                            <span className="text-gray-700">
                                {item.label}
                            </span>

                            <span className="font-semibold">
                                {item.count}
                            </span>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}