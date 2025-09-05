import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { RouterRoutes } from "@constants/router";
import { GlobalLoader } from "@components/common/GlobalLoader";
import { ErrorBoundary } from "@components/common/ErrorBoundary";
import { ThemeProvider } from "@contexts/ThemeContext";

import './App.css'

const MainLayout = lazy(() => import("@layout/MainLayout"));
const Home = lazy(() => import("@pages/Home"));
const Trade = lazy(() => import("@pages/Trade"));
const NotFound = lazy(() => import("@pages/NotFound"));

function App() {

  return (
    <ThemeProvider> 
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<GlobalLoader title="TradeFi loading..." />}>
            <MainLayout>
              <Routes>
                <Route path={RouterRoutes.Home} element={<Home />} />
                <Route path={RouterRoutes.Trade} element={<Trade />} />
                <Route path={RouterRoutes.NotFound} element={<NotFound />} />
              </Routes>
            </MainLayout>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
