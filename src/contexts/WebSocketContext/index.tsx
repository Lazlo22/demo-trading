import { createContext, useContext, useEffect, useMemo, type FC, type PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { webSocketService } from "@/services/WebSocketService";
import type { WebSocketSubscriptionType } from "@/types/websocket";
import { RouterRoutes } from "@/constants/router";

interface WebSocketContextType {
  subscribe: <T = any>(type: WebSocketSubscriptionType, callback: (data: T) => void) => void;
  unsubscribe: (type: WebSocketSubscriptionType) => void;
  isConnected: () => boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === RouterRoutes.Home) {
      webSocketService.connect().catch(console.error);
    }

    return () => {
      if (pathname === RouterRoutes.Home) {
        webSocketService.disconnect();
      }
    };
  }, [pathname]);

  const contextValue: WebSocketContextType = useMemo(() => ({
    subscribe: webSocketService.subscribe.bind(webSocketService),
    unsubscribe: webSocketService.unsubscribe.bind(webSocketService),
    isConnected: webSocketService.isConnected.bind(webSocketService),
  }), []);

  return <WebSocketContext value={contextValue}>{children}</WebSocketContext>;
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return context;
};
