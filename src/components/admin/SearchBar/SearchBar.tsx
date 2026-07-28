interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({
    value,
    onChange,
}: Props) {

    return (

        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search events..."
            className="
                w-80
                rounded-lg
                border
                px-4
                py-2
                outline-none
                focus:border-blue-500
            "
        />

    );

}