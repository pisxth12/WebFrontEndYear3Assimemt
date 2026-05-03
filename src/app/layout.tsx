import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DarkModeToggle from "../components/DarkModeToggle";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
    title: "Mongkol Phone Shop",
    description: "Best phone shop in Cambodia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="  text-black dark:text-white">
                <Header />
                <main className="min-h-[80vh] p-5  mx-auto">
                    {children}
                </main>
                <Footer />
                <Toaster/>
                <DarkModeToggle />
            </body>
        </html>
    );
}