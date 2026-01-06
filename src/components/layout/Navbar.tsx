"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { logout } from "@/helpers/SessionHelper";

const Navbar = () => {
  const userInfo = useUserInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();


  return (
    <nav className="sticky top-0 h-22 z-50 w-full bg-white text-primary shadow-md">
      <div className="mx-auto h-full flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="italic text-xl font-bold">Osman Goni</h1>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden space-x-6 md:flex">
          <Link
            href="/"
            className={`hover:text-blue-600 ${
              pathname === "/" ? "text-blue-500" : "text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`hover:text-blue-600 ${
              pathname === "/dashboard" ? "text-blue-500" : "text-primary"
            }`}
          >
            Dashboard
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center space-x-4 md:flex">
          {userInfo?.userId && (
            <>
              <button
                onClick={() => logout()}
                className="rounded-md border cursor-pointer bg-gray-200 border-white px-4 py-1.5 text-sm hover:bg-gray-300"
              >
                Logout
              </button>
              <button
                className="rounded-md bg-purple-400 border cursor-pointer border-white px-4 py-1.5 text-sm text-white"
              >
                {userInfo?.fullName}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 hover:bg-white/10 cursor-pointer"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </nav>
  );
}

export default Navbar;