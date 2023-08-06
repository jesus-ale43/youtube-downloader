import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full px-5 pt-5 md:pt-0 md:mb-0 md:absolute md:top-9 md:w-auto md:right-11 md:left-11">
      <Image
        alt="logo"
        src="/images/logo.png"
        style={{ cursor: "pointer" }}
        width={70}
        height={70}
      />
    </header>
  );
}
