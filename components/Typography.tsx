import { ReactNode } from "react";

type TypographySize = "xs" | "sm" | "base" | "md" | "lg"|'xl';
type TypographyColor =
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "danger"
  | "warning"
  | 'light';

export default function Typography({
  children,
  size = "base",
  color = "primary",
  className = "",
}: {
  children: ReactNode;
  size?: TypographySize;
  color?: TypographyColor;
  className?: string;
}) {
  const sizeObj: Record<TypographySize, string> = {
    xs: "md:text-xs text-[10px]",
    sm: "md:text-sm text-xs",
    base: "md:text-base text-sm",
    md: "md:text-lg text-base",
    lg: "md:text-3xl text-2xl",
    xl:'text-xl md:text-4xl lg:text-6xl'
  };

  const colorObj: Record<TypographyColor, string> = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    muted: "text-gray-500",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
    light:"text-gray-500 "
  };

  return (
    <span className={`${sizeObj[size]} ${colorObj[color]} ${className}`}>
      {children}
    </span>
  );
}