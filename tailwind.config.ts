import type { Config } from 'tailwindcss'

const config: Config = {
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
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        typewriter: "typewriter 4s steps(40) forwards", // Adjust the duration and steps as needed
      },
      keyframes: {
        typewriter: {
          to: { width: "100%" },
        },
      },
      fontFamily:{
        'Helvectica':"Helvectica Neue",
        'DM_Mono':"DM Mono",
        sans: ['var(--font-helvetica-neue)'],
      },
      fontSize:{
        "Text-14":"14px"
      },
      colors:{
        'brand':'#00918E',
        'black':'#221E1F',
        'grey-2':'#595657',
        'B-Yellow':'#FBBA00',
        'white':'#FAFBFF',
        'B-grey':'#E7E9EA',
        'Light-Grey':'#F4F4F4',
      }
    },
    screens:{
      'md':'700px',
      'lg':'1180px',
      'xl':'1900px',
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}
export default config
