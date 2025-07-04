import Logo from "@/app/_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/RerevationContext";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
console.log(josefin);
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel,  located in the heart of the Italian Dolomites, surrounded by beautiful countains and dark forests",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative bg-[var(--color-primary-950)] text-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <div className=" flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>{" "}
          </main>
        </div>
      </body>
    </html>
  );
}
