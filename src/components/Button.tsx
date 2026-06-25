import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {}

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={`bg-primary text-on-primary flex items-center gap-1 px-5 py-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
