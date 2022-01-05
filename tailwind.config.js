module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logo: {
          100: "#454b5411",
          400: "#a3b1c7",
          900: "#454b54",
          1000: "#30363d",
        },
        bg: "#f7f9f9",
      },
    },
  },
  plugins: [],
};
