import type { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {
  enableTouchEnhancements?: boolean;
  color?: "primary" | "default";
}

export default function ButtonLink({
  className,
  color,
  enableTouchEnhancements,
  children,
  ...props
}: Props) {
  return (
    <a
      className={`inline-flex h-[40px] cursor-pointer items-center rounded-md px-4 font-medium duration-200 ${color === "default" ? "text-neutral-700 hover:bg-black/10 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-200" : ""} ${color === "primary" ? "bg-blue-500 text-white hover:bg-blue-600" : ""} ${color === "default" && enableTouchEnhancements ? "bg-black/10 text-neutral-800 dark:bg-white/10 dark:text-neutral-200" : ""} ${className} `}
      {...props}
    >
      {children}
    </a>
  );
}
