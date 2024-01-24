/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/**/*.{js,ts,jsx,tsx,mdx}',
    '@/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      screens:{
        'sm':'400px',
        'md':'800px',
        'lg':'1180px',
        '1400px':'1400px',
        'xl':'1890px',
      },
      animation: {
        typewriter: "typewriter 4s steps(40) forwards", // Adjust the duration and steps as needed
      },
      keyframes: {
        typewriter: {
          to: { width: "100%" },
        },
      },
    
    extend: {
      fontSize:{
        "Text-14":"14px"
      },
      fontFamily:{
        'Helvectica':"Helvectica Neue",
        'DM_Mono':"DM Mono",
        sans: ['var(--font-helvetica-neue)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'brand':'#00918E',
        'black':'#221E1F',
        'grey-2':'#595657',
        'B-Yellow':'#FBBA00',
        'white':'#FAFBFF',
        'B-grey':'#E7E9EA',
        'Light-Grey':'#F4F4F4',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/typography')],
}