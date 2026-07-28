import Card from "@/components/admin/ui/Card/Card";

interface Props {
    title: string;
    value: number;
}

export default function StatCard({
    title,
    value,
}: Props) {

    return (

        <Card className="p-6">

            <p className="text-gray-500">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
                {value}
            </h2>

        </Card>

    );

}