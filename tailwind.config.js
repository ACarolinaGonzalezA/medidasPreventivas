module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          quicksand: ['Quicksand', 'sans-serif'],
        },
      },
    },
    plugins: [require('@tailwindcss/line-clamp')],
  };