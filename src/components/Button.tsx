import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {}

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={`bg-primary text-on-primary flex items-center gap-1 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
