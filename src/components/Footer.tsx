import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center md:flex-row md:items-start bg-gray-800 p-8 rounded-lg md:justify-between gap-8 md:gap-0">
      <div className="flex flex-col items-center gap-4 md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            E-commerce
          </p>
        </Link>
        <Link href="/" className="text-gray-400">Products</Link>
        <Link href="/" className="text-gray-400">All rights reserved</Link>
      </div>
      <div className="flex flex-col gap-4 items-center text-gray-400 md:items-start text-sm">
        <p className="text-amber-50">Products</p>
        <Link href="/">All rights reserved</Link>
        <Link href="/">All rights reserved</Link>
        <Link href="/">All rights reserved</Link>
      </div>
      <div className="flex flex-col gap-4 items-center text-gray-400 md:items-start text-sm">
        <p className="text-amber-50">Products</p>
        <Link href="/">All rights reserved</Link>
        <Link href="/">All rights reserved</Link>
        <Link href="/">All rights reserved</Link>
      </div>
      <div className="flex flex-col gap-4 items-center text-gray-400 md:items-start text-sm">
        <p className="text-amber-50">Products</p>
        <Link href="/">All rights reserved</Link>
        <Link href="/">All rights reserved</Link>
        <Link href="/">All rights reserved</Link>
      </div>
    </div>
  );
};

export default Footer;
