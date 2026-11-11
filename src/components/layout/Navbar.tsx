
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Upload", href: "/upload" },
  { label: "Analysis", href: "/analysis" },
  { label: "Code Inspector", href: "/code-inspector" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 flex h-[72px] w-full items-center justify-between bg-bg2 px-5 md:px-[42px]">
      <Link
        href="/"
        className="whitespace-nowrap text-[20px] font-bold text-text1 md:text-[24px]"
      >
        BPMN Impact Analyzer
      </Link>

      <nav className="flex items-center gap-3 md:gap-9">
        <div className="hidden items-center gap-4 md:flex md:gap-9">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-[18px] transition-colors hover:text-primary ${
                  isActive
                    ? "font-bold text-text1"
                    : "font-normal text-text1"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/"
          aria-label="User profile"
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#A64F00] text-white transition hover:opacity-80"
        >
          <UserRound size={22} strokeWidth={2} />
        </Link>
      </nav>
    </header>
  );
}