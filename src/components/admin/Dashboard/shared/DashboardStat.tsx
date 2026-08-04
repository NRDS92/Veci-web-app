interface Props {
    title: string;
    value: number;
}

export default function DashboardStat({
    title,
    value,
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

            <p className="text-sm text-gray-500">
                {title}
            </p>

            <h3 className="mt-2 text-3xl font-bold">
                {value}
            </h3>

        </div>

    );

}