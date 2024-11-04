import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import { ThemeProvider } from "../components/theme-provider";
import dynamic from "next/dynamic";

// Dynamically import and memoize the Header component
const Header = dynamic(() => import("@/components/header"));
const Background = dynamic(() => import("@/components/sections/background"));

export const metadata: Metadata = {
	title: "Byron Wade",
	description: "Fast Web Apps",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={`${GeistSans.className} dark`}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<Header className="dark" />
					<main className="dark">{children}</main>
					<Background />
				</ThemeProvider>
				<GoogleAnalytics gaId="G-WE1RMQ935W" />
			</body>
		</html>
	);
}
