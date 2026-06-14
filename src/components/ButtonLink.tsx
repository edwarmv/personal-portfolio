import type { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {
  color?: "primary" | "secondary";
}

export default function ButtonLink({
  className,
  color = "primary",
  children,
  ...props
}: Props) {
  return (
    <a
      className={`flex items-center gap-1 px-4 py-2 ${className} ${color === "primary" ? "bg-primary text-on-primary" : ""} ${color === "secondary" ? "bg-secondary text-on-secondary" : ""}`}
      {...props}
    >
      {children}
    </a>
  );
}
