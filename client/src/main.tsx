import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { gsapInit } from "./lib/gsap";

// Initialize GSAP
gsapInit();

createRoot(document.getElementById("root")!).render(<App />);
