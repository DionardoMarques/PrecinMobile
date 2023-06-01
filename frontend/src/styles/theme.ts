import { extendTheme } from "native-base";

export const THEME = extendTheme({
	colors: {
		primary: {
			700: "#996DFF",
		},
		secondary: {
			700: "#FBA94C",
		},
		blue: {
			700: "#00875F",
			500: "rgba(111, 162, 242, 1)",
			400: "rgba(8, 37, 84, 1)",
			300: "#04D361",
		},
		buttons: {
			default: "rgba(37, 108, 225, 1)",
			hover: "rgba(111, 162, 242, 1)",
		},
		hover: {
			default: "rgba(111, 162, 242, 1)",
		},
		gray: {
			700: "#121214",
			600: "#202024",
			500: "#29292E",
			400: "#323238",
			300: "#7C7C8A",
			200: "#C4C4CC",
			100: "#E1E1E6",
		},
		red: {
			500: "rgba(225, 37, 37)",
		},
		white: "#FFFFFF",
		yellow: {
			600: "rgb(245, 180, 0)",
		},
	},
	fonts: {
		heading: "Roboto_700Bold",
		body: "Roboto_400Regular",
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xxl: 30,
	},
	sizes: {
		14: 56,
	},
});
