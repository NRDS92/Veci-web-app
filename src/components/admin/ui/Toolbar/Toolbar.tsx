interface Props {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export default function Toolbar({
    title,
    subtitle,
    actions,
}: Props) {
    return (
        <div className="mb-8 flex items-center justify-between">

        <div>

            <h1 className="text-3xl font-bold">
            {title}
            </h1>

            {subtitle && (
            <p className="mt-1 text-gray-500">
                {subtitle}
            </p>
            )}

        </div>

        {actions}

        </div>
    );
}