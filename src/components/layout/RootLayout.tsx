import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import { PageTransition } from "../motion/PageTransition";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function RootLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-electric-violet focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
