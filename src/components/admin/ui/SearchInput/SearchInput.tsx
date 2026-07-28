interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchInput({
        value,
        onChange,
    }: Props) {
    return (
        <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="
            w-80
            rounded-xl
            border
            px-4
            py-2
            outline-none
            focus:border-blue-500
        "
        />
    );
}