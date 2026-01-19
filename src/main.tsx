import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroProvider } from "./providers/heroProvider";
import { FavoriteProvider } from "./providers/favoriteProvider.tsx";
import { SearchProvider } from "./providers/searchProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HeroProvider>
          <FavoriteProvider>
            <SearchProvider>
              <App />
              <Toaster />
            </SearchProvider>
          </FavoriteProvider>
        </HeroProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
