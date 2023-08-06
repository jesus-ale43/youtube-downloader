import "./globals.css";

import Header from "@/components/Header";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "YTDownloader",
  author: "Jesús Alejandro (Jesus_ale43)",
  description: "A simple online youtube video downloader using ytdl-core",
  openGraph: {
    //url: "",
    type: "website",
    title: "YTDownloader",
    description: "A simple online youtube video downloader using ytdl-core",
    //images: [''],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
