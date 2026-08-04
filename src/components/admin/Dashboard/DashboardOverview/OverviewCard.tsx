interface Props {

    title: string;

    value: number;

    icon: React.ReactNode;

}

export default function OverviewCard({
    title,
    value,
    icon,
}: Props) {

    return (

        <div
            className="
                rounded-xl
                border
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>

                </div>

                <div className="text-blue-600">

                    {icon}

                </div>

            </div>

        </div>

    );

}