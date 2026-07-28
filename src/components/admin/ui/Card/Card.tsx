interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}