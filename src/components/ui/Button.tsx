
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:brightness-95",
    secondary: "bg-button text-text2 hover:brightness-95",
    outline:"border border-text2 text-text2 hover:bg-button",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}