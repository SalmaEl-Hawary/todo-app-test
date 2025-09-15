import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Simple Todo",
	description: "A minimal todo app built with Next.js and Tailwind",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="bg-white text-gray-900 antialiased">
				<main className="mx-auto max-w-2xl p-6">{children}</main>
			</body>
		</html>
	);
}
