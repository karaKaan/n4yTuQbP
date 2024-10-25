import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "2em",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        neutral: {
          black: "#111",
          white: "#eee",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
