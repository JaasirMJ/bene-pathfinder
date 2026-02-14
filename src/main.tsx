import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

import { getEligibleSchemes } from "./schemes";

async function showSchemes() {
  const userId = "USER_ID_HERE";

  const schemes = await getEligibleSchemes(userId);

  const container = document.getElementById("schemes");

  if (!container) return;

  container.innerHTML = schemes
    .map(s => `<div class="scheme-card">
      <h3>${s.scheme_name}</h3>
      <p>${s.description}</p>
    </div>`)
    .join("");
}

showSchemes();
