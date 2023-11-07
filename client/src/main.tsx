import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CustomThemeProvider } from "./contexts/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <CustomThemeProvider>
            <CssBaseline>
              <App />
            </CssBaseline>
          </CustomThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
