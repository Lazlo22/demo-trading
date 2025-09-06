import { render, screen } from "./test-utils";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import { RouterRoutes } from "../src/constants/router";
import { ErrorBoundary } from "../src/components/common/ErrorBoundary";

const MainLayout = lazy(() => import("../src/layout/MainLayout"));
const Home = lazy(() => import("../src/pages/Home"));
const Trade = lazy(() => import("../src/pages/Trade"));
const NotFound = lazy(() => import("../src/pages/NotFound"));
const ToastContainer = lazy(() => import("../src/components/common/Toast"));

jest.mock("../src/services/LocalStorageService", () => ({
  themeStorage: {
    get: jest.fn().mockReturnValue("light"),
    set: jest.fn(),
  },
}));

jest.mock("../src/contexts/ThemeContext", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
  useTheme: () => ({
    theme: "light",
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("../src/contexts/WebSocketContext", () => ({
  WebSocketProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="websocket-provider">{children}</div>,
  useWebSocket: () => ({
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    isConnected: jest.fn().mockReturnValue(false),
  }),
}));

jest.mock("../src/hooks/useMarkets", () => ({
  useMarkets: () => ({
    markets: [],
    error: null,
  }),
}));

jest.mock("../src/stores/NavigationStore", () => ({
  useNavigationStore: jest.fn((selector) => {
    const state = {
      activeTab: "Home",
      setActiveTab: jest.fn(),
    };
    return selector(state);
  }),
}));

const TestApp = () => {
  return (
    <ErrorBoundary>
      <MainLayout>
        <Routes>
          <Route path={RouterRoutes.Home} element={<Home />} />
          <Route path={RouterRoutes.Trade} element={<Trade />} />
          <Route path={RouterRoutes.NotFound} element={<NotFound />} />
        </Routes>
      </MainLayout>
      <ToastContainer />
    </ErrorBoundary>
  );
};

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    render(<TestApp />);
    const mainLayout = await screen.findByTestId("main-layout", {}, { timeout: 3000 });
    expect(mainLayout).toBeInTheDocument();
  });

  it("renders home page by default", async () => {
    render(<TestApp />);
    const homePage = await screen.findByTestId("home-page", {}, { timeout: 3000 });
    expect(homePage).toBeInTheDocument();
  });

  it("provides all necessary contexts", () => {
    render(<TestApp />);

    const themeProvider = screen.getByTestId("theme-provider");
    const websocketProvider = screen.getByTestId("websocket-provider");

    expect(themeProvider).toBeInTheDocument();
    expect(websocketProvider).toBeInTheDocument();
  });

  it("renders toast container", async () => {
    render(<TestApp />);
    
    const toastContainer = await screen.findByRole("region", { name: /notifications/i }, { timeout: 3000 });
    
    expect(toastContainer).toBeInTheDocument();
  });
});
