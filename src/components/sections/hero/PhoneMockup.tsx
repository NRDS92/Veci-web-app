import Image, { StaticImageData } from "next/image";
import veciImg from "../../../images/VeciMainImg.webp";

type Props = {
  image?: StaticImageData;
};

export default function PhoneMockup({
  image = veciImg,
}: Props) {
  return (
    <div
      className="
        h-155
        w-77.5
        rounded-[40px]
        bg-black
        p-3
        shadow-2xl
      "
    >
      <div
        className="
          relative
          h-full
          overflow-hidden
          rounded-4xl
          bg-white
        "
      >
        <Image
          src={image}
          alt="Veci App"
          fill
          sizes="(max-width: 768px) 90vw, 310px"
          className="object-cover"
        />
      </div>
    </div>
  );
}