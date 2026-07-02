import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";

import { App } from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Failed to find #root element. Check public/index.html for <div id="root">.');
}

createRoot(rootElement).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
