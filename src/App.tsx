import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterRoutes } from "@constants/router";
import { GlobalLoader } from "@components/common/GlobalLoader";
import { ErrorBoundary } from "@components/common/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { TOAST_DELAY } from "@constants/toast";
import { QUERY_GC_TIME, QUERY_STALE_TIME } from "@constants/query";

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = lazy(() => import("@layout/MainLayout"));
const Home = lazy(() => import("@pages/Home"));
const Trade = lazy(() => import("@pages/Trade"));
const NotFound = lazy(() => import("@pages/NotFound"));
const ToastContainer = lazy(() => import("react-toastify").then(i => ({ default: i.ToastContainer })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider> 
          <BrowserRouter>
            <WebSocketProvider>
              <Suspense fallback={<GlobalLoader title="TradeFi loading..." />}>
                <MainLayout>
                  <Routes>
                    <Route path={RouterRoutes.Home} element={<Home />} />
                    <Route path={RouterRoutes.Trade} element={<Trade />} />
                    <Route path={RouterRoutes.NotFound} element={<NotFound />} />
                  </Routes>
                </MainLayout>
              </Suspense>
            </WebSocketProvider>
          </BrowserRouter>
          <Suspense>
            <ToastContainer
              position="top-center"
              autoClose={TOAST_DELAY}
              closeOnClick
              draggable
            />
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
