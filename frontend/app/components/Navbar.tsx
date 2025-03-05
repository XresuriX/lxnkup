"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-opacity-90 backdrop-blur-sm bg-background shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors"
          >
            <Crown className="w-8 h-8" />
            <span className="font-bold text-xl">XTGR</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/games">Games</NavLink>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/profile">Profile</NavLink>
          </div>

          <button className="md:hidden text-primary hover:text-primary/90">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-foreground/90 hover:text-primary transition-colors font-medium"
  >
    {children}
  </Link>
);

export default Navbar;
