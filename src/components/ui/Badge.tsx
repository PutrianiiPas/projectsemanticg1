
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "primary" | "success" | "warning";
};

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {

  const variants = {
    default: "bg-secondary text-text2",
    primary: "bg-primary text-white",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        rounded-md
        text-xs
        font-medium
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}