import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>;

const MockWebSocketProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="websocket-provider">{children}</div>
);

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MockThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <MockWebSocketProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </MockWebSocketProvider>
        </MemoryRouter>
      </MockThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";
export { customRender as render, AllTheProviders };