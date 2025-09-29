import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Bell } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCart";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center border-b border-gray-200 pb-4">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">E-commerce</p>
      </Link>
      <div className="flex items-center gap-4">
        <SearchBar />
        <Bell className="w-4 h-4 text-gray-600" />
        <ShoppingCartIcon />
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
