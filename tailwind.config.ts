import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./form/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: "var(--color-royal)",
        sweetRed: "var(--color-sweetRed)",
        skyBlue: "var(--color-skyBlue)",
        white: "var(--color-white)",
        pastelYellow: "var(--color-pastelYellow)",
        gradientRed: "var(--color-gradientRed)",
        gradientXXI1: "var(--color-gradientXXI1)",
        gradientXXI2: "var(--color-gradientXXI2)",
        gradientBlue: "var(--color-gradientBlue)",
        defaultBtnColor: "var(--color-defaultBtnColor)",
        pressedBtnColor: "var(--color-pressedBtnColor)",
        hoverBtnColor: "var(--color-hoverBtnColor)",
        choosenBtnColor: "var(--color-choosenBtnColor)",


        font_shade_100: "var(--font-shade-100)",
        font_shade_200: "var(--font-shade-200)",
        font_shade_300: "var(--font-shade-300)",
        font_shade_400: "var(--font-shade-400)",
        font_shade_500: "var(--font-shade-500)",
        font_shade_600: "var(--font-shade-600)",
        font_shade_700: "var(--font-shade-700)",
        font_shade_800: "var(--font-shade-800)",
        font_shade_900: "var(--font-shade-900)",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      fontSize: {
        body_large: "var(--font-size-body-large)",
        body_medium: "var(--font-size-body-medium)",
        body_small: "var(--font-size-body-small)",
        body_xsmall: "var(--font-size-body-xsmall)",

        header_small: "var(--font-size-header-small)",
        header_medium: "var(--font-size-header-medium)",
        header_large: "var(--font-size-header-large)",
        header_xsmall: "var(--font-size-header-xsmall)",
        header_xxsmall: "var(--font-size-header-xxsmall)",
        header_xxsmall_bold: "var(--font-size-header-xxsmall-bold)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
} satisfies Config;
