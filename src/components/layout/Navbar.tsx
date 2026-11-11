
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Upload",
    href: "/upload",
  },
  {
    label: "Analysis",
    href: "/analysis",
  },
  {
    label: "Code Inspector",
    href: "/code-inspector",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full h-[72px] bg-bg2 flex items-center justify-between px-6 md:px-[42px]">

      {/* Application Name */}
      <Link
        href="/"
        className="font-sans font-bold text-[24px] text-text1 whitespace-nowrap"
      >
        BPMN Impact Analyzer
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-4 md:gap-9">

        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                text-[18px]
                whitespace-nowrap
                transition-all
                duration-200
                hover:text-primary
                ${
                  isActive
                    ? "font-bold text-text1"
                    : "font-normal text-text1"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Profile Icon */}
        <button
          type="button"
          aria-label="User profile"
          className="
            ml-2
            flex
            w-[42px]
            h-[42px]
            items-center
            justify-center
            rounded-full
            bg-text2
            text-white
            transition
            hover:opacity-80
          "
        >
          <UserRound size={22} strokeWidth={2} />
        </button>

      </nav>
    </header>
  );
}