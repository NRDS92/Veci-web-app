interface Props {

    message?: string;

}

export default function DashboardEmpty({
    message = "No data available.",
}: Props) {

    return (

        <div
            className="
                rounded-xl
                border
                border-dashed
                p-8
                text-center
                text-gray-500
            "
        >

            {message}

        </div>

    );

}