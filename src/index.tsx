import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider,QueryClient } from "react-query";
import { ThemeProvider } from "styled-components";
import {theme} from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
</React.StrictMode>
);
