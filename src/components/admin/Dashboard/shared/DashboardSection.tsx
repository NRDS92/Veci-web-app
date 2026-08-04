import { ReactNode } from "react";

interface Props {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function DashboardSection({
    title,
    subtitle,
    children,
}: Props) {
    return (
        <section className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-2xl font-bold">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-1 text-sm text-gray-500">
                        {subtitle}
                    </p>
                )}

            </div>

            {children}

        </section>
    );
}