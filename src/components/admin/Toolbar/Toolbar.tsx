interface Props {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function Toolbar({
    title,
    subtitle,
    children,
}: Props) {

    return (

        <div className="flex items-center justify-between">

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

            {children}

        </div>

    );

}