// import { ReactNode } from "react";

// type TypographySize = "header-xxsmall-bold" | "header-xxsmall" | "header-xsmall" | "header-small" | "header-medium" | "header-large" | "body-xsmall" | "body-small" | "body-medium" | "body-large";


// type TypographyColor =
//   | "font_shade_100"
//   | "font_shade_200"
//   | "font_shade_300"
//   | "font_shade_400"
//   | "font_shade_500"
//   | "font_shade_600"
//   | "font_shade_700"
//   | "font_shade_800"
//   | "font_shade_900";

// export default function Typography({
//   children,
//   size = "body-xsmall",
//   color = "font_shade_900",
//   className = "",
// }: {
//   children: ReactNode;
//   size?: TypographySize;
//   color?: TypographyColor;
//   className?: string;
// }) {
//   const sizeObj: Record<TypographySize, string> = {
//     "body-large": " font-normal text-body_small sm:text-body_medium lg:text-body_large",
//     "body-medium": " font-normal text-body_xsmall sm:text-body_small lg:text-body_medium",
//     "body-small": " font-normal text-body_xsmall  lg:text-body_small",
//     "body-xsmall": " font-normal text-body_xsmall ",
//     "header-large": "font-bold text-header_small sm:text-header_medium lg:text-header_large",
//     "header-medium": "font-bold text-header_xsmall sm:text-header_small lg:text-header_medium",
//     "header-small": "font-bold text-header_xxsmall sm:text-header_xsmall lg:text-header_small",
//     "header-xsmall": "font-bold text-header_xxsmall_bold sm:text-header_xxsmall lg:text-header_xsmall",
//     "header-xxsmall": "font-bold text-header_xxsmall sm:text-header_xxsmall lg:text-header_xxsmall",
//     "header-xxsmall-bold": "text-header_xxsmall_bold sm:text-header_xxsmall_bold lg:text-header_xxsmall_bold ",
//   };

//   const colorObj: Record<TypographyColor, string> = {
//     "font_shade_100": "text-font_shade_100",
//     "font_shade_200": "text-font_shade_200",
//     "font_shade_300": "text-font_shade_300",
//     "font_shade_400": "text-font_shade_400",
//     "font_shade_500": "text-font_shade_500",
//     "font_shade_600": "text-font_shade_600",
//     "font_shade_700": "text-font_shade_700",
//     "font_shade_800": "text-font_shade_800",
//     "font_shade_900": "text-font_shade_900",
//   };

//   return (
//     <p className={`${sizeObj[size]} ${colorObj[color]} ${className}`}>
//       {children}
//     </p>
//   );
// }



import { ReactNode } from "react";

type TypographySize =
  | "header-large"
  | "header-medium"
  | "header-small"
  | "header-xsmall"
  | "header-xxsmall"
  | "header-xxsmall-bold"
  | "body-large"
  | "body-medium"
  | "body-small"
  | "body-xsmall";

type TypographyColor =
  | "font_shade_100"
  | "font_shade_200"
  | "font_shade_300"
  | "font_shade_400"
  | "font_shade_500"
  | "font_shade_600"
  | "font_shade_700"
  | "font_shade_800"
  | "font_shade_900";

export default function Typography({
  children,
  size = "body-xsmall",
  color = "font_shade_900",
  className = "",
}: {
  children: ReactNode;
  size?: TypographySize;
  color?: TypographyColor;
  className?: string;
}) {
  const sizeObj: Record<TypographySize, string> = {
    "header-large":
      "font-roboto font-bold text-header_small sm:text-header_medium lg:text-header_large leading-[1]",

    "header-medium":
      "font-roboto font-bold text-header_xsmall sm:text-header_small lg:text-header_medium leading-[1]",

    "header-small":
      "font-roboto font-medium text-body_large sm:text-header_xsmall lg:text-header_small leading-[32px]",

    "header-xsmall":
      "font-roboto font-medium text-body_medium sm:text-header_xsmall lg:text-header_xsmall leading-[1]",

    "header-xxsmall":
      "font-roboto font-medium text-body_small sm:text-header_xxsmall lg:text-header_xxsmall leading-[1]",

    "header-xxsmall-bold":
      "font-roboto font-bold text-body_xsmall sm:text-header_xxsmall_bold leading-[1]",

    "body-large":
      "font-roboto font-normal text-body_small sm:text-body_medium lg:text-body_large leading-[1]",

    "body-medium":
      "font-roboto font-normal text-body_small sm:text-body_medium lg:text-body_medium leading-[28px]",

    "body-small":
      "font-roboto font-normal text-body_xsmall sm:text-body_small lg:text-body_small leading-[24px]",

    "body-xsmall":
      "font-roboto font-normal text-body_xsmall leading-[1]",
  };

  const colorObj: Record<TypographyColor, string> = {
    font_shade_100: "text-font_shade_100",
    font_shade_200: "text-font_shade_200",
    font_shade_300: "text-font_shade_300",
    font_shade_400: "text-font_shade_400",
    font_shade_500: "text-font_shade_500",
    font_shade_600: "text-font_shade_600",
    font_shade_700: "text-font_shade_700",
    font_shade_800: "text-font_shade_800",
    font_shade_900: "text-font_shade_900",
  };

  return (
    <p className={`${sizeObj[size]} ${colorObj[color]} ${className}`}>
      {children}
    </p>
  );
}