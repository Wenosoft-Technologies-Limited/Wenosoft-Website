import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "@/components/layout/RootLayout";
import { RouteErrorBoundary } from "@/components/layout/RouteErrorBoundary";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ServicesPage } from "@/pages/ServicesPage";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <RootLayout />
      </>
    ),
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/services", element: <ServicesPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
