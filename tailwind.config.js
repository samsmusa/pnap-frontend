import { content, plugin } from "flowbite-react/tailwind";
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(),
  ],
};

