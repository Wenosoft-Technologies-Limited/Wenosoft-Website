import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "@/components/layout/RootLayout";
import { RouteErrorBoundary } from "@/components/layout/RouteErrorBoundary";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HomePage } from "@/pages/HomePage";

// The home route stays in the entry bundle (fastest first paint on the
// landing route); all other routes are code-split into their own chunks.
// HydrateFallback renders nothing: deep links briefly show a blank page
// while their chunk loads, matching the pre-JS state.
const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <RootLayout />
      </>
    ),
    HydrateFallback: () => null,
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { path: "/", element: <HomePage /> },
          {
            path: "/about",
            lazy: async () => ({ Component: (await import("@/pages/AboutPage")).AboutPage }),
          },
          {
            path: "/services",
            lazy: async () => ({ Component: (await import("@/pages/ServicesPage")).ServicesPage }),
          },
          {
            path: "/contact",
            lazy: async () => ({ Component: (await import("@/pages/ContactPage")).ContactPage }),
          },
          {
            path: "*",
            lazy: async () => ({ Component: (await import("@/pages/NotFoundPage")).NotFoundPage }),
          },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
