/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/App.jsx",
		"./src/main.jsx",
		"./src/components/**/*.jsx",
		"./src/pages/*.jsx",
		"./index.html",
		"./src/components/ui/*.jsx",
	],
	theme: {
		extend: {
			colors: {
				text: "#000000",
				background: "#ffffff",
				primary: "#200d0d",
				secondary: "#eabfbf",
				accent: "#eb5959",
				text_dark: "#ddd8d8",
				background_dark: "#151414",
				primary_dark: "#f6e3e3",
				secondary_dark: "#eabfbf",
				accent_dark: "#eb5959",
			},
		},
	},
	plugins: [require("daisyui")],
	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: [
			{
				MyLight: {
					text: "#000000",
					"base-100": "#ffffff",
					primary: "#200d0d",
					secondary: "#eabfbf",
					neutral: "#a2494a",
					accent: "#eb5959",
					info: "#5699eb",
					success: "#37e1cd",
					warning: "#eabe10",
					error: "#e84f30",
					// "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
					// "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
					// "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
					// "--animation-btn": "0.25s", // duration of animation when you click on button
					// "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
					// "--btn-text-case": "uppercase", // set default text transform for buttons
					// "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
					// "--border-btn": "1px", // border width of buttons
					// "--tab-border": "1px", // border width of tabs
					// "--tab-radius": "0.5rem", // border radius of tabs
				},
				MyDark: {
					primary: "#f6e3e3",
					secondary: "#eabfbf",
					accent: "#eb5959",
					neutral: "#f26c6c",
					"base-100": "#151414",
					info: "#5699eb",
					success: "#37e1cd",
					warning: "#eabe10",
					error: "#e84f30",
					"--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
					"--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
					"--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
					"--animation-btn": "0.25s", // duration of animation when you click on button
					"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
					"--btn-text-case": "uppercase", // set default text transform for buttons
					"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
					"--border-btn": "1px", // border width of buttons
					"--tab-border": "1px", // border width of tabs
					"--tab-radius": "0.5rem", // border radius of tabs
				},
			},
		],

		darkTheme: "dark", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	},
});
