interface Props {
    title: string;
    description: string;
}

export default function EmptyState({
        title,
        description,
    }: Props) {
    return (
        <div className="py-20 text-center">

        <div className="text-5xl">
            📭
        </div>

        <h2 className="mt-4 text-xl font-semibold">
            {title}
        </h2>

        <p className="mt-2 text-gray-500">
            {description}
        </p>

        </div>
    );
}