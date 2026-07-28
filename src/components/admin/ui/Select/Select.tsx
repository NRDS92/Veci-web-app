interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Select({
    value,
    onChange,
}: Props) {

    return (

        <select
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            className="rounded-lg border px-3 py-2"
        >

            <option value="ALL">
                All
            </option>

            <option value="PENDING">
                Pending
            </option>

            <option value="APPROVED">
                Approved
            </option>

            <option value="REJECTED">
                Rejected
            </option>

        </select>

    );

}