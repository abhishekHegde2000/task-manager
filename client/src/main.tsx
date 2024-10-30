import "./index.css";
import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import { inject } from "@vercel/analytics";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import Home from "@/pages/home.tsx";
import Tasks from "@/pages/tasks.tsx";
import SignIn from "@/pages/sign-in.tsx";
import SignUp from "@/pages/sign-up.tsx";
import Footer from "@/components/footer.tsx";
import Navbar from "@/components/navbar.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ThemeProvider } from "@/components/theme-provider";

inject();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
);
