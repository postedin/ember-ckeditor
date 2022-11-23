/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./tests/dummy/app/**/*.{html,js,ts,hbs}"],
	theme: {
		extend: {},
	},
	// eslint-disable-next-line node/no-unpublished-require
	plugins: [require("@tailwindcss/typography")],
};
