import ShadowProvider from "@/context/shadowContainerContext";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/context/AuthContext";
import { DialogContextProvider } from "@/context/DialogContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Box Shadow Generator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <DialogContextProvider>
            <ShadowProvider>{children}</ShadowProvider>
          </DialogContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
