
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "small" | "medium" | "large";
};

export default function Card({
  children,
  padding = "medium",
  className = "",
  ...props
}: CardProps) {
  const paddings = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`rounded-2xl bg-bg2 shadow-sm ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}