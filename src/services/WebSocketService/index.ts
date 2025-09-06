import { WEBSOCKET_CONFIG } from '@/constants/websocket';
import type { Subscription, WebSocketSubscriptionType } from '@/types/websocket';

class WebSocketService {
  private socket: WebSocket | null = null;
  private subscriptions = new Map<WebSocketSubscriptionType, (data: any) => void>();
  private reconnectAttempts = 0;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(WEBSOCKET_CONFIG.URL);

        this.socket.onopen = () => {
          console.log("WebSocket connected");
          this.reconnectAttempts = 0;
          this.resubscribeAll();
          resolve();
        };

        this.socket.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason);

          // Handle manual disconnection
          if (event.code === 1006 || event.code === 1000) return;

          this.handleReconnect();
        };

        this.socket.onerror = (error) => {
          console.error("WebSocket connection error:", error);
          reject(error);
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const callback = this.subscriptions.get(data.channel);
            if (callback) {
              callback(data);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS})`);

      setTimeout(() => {
        this.connect().catch(console.error);
      }, WEBSOCKET_CONFIG.RECONNECT_DELAY * this.reconnectAttempts);
    }
  }

  private resubscribeAll(): void {
    for (const [type] of this.subscriptions) {
      this.sendSubscription(type, "subscribe");
    }
  }

  private sendSubscription(type: WebSocketSubscriptionType, method: "subscribe" | "unsubscribe"): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const subscription: Subscription = {
      method,
      subscription: { type },
    };

    this.socket.send(JSON.stringify(subscription));
  }

  subscribe<T = any>(type: WebSocketSubscriptionType, callback: (data: T) => void): void {
    this.subscriptions.set(type, callback);

    if (this.isConnected()) {
      this.sendSubscription(type, "subscribe");
    }
  }

  unsubscribe(type: WebSocketSubscriptionType): void {
    if (this.subscriptions.has(type)) {
      this.subscriptions.delete(type);

      if (this.isConnected()) {
        this.sendSubscription(type, "unsubscribe");
      }
    }
  }

  disconnect(): void {
    if (this.socket && this.isConnected()) {
      this.socket.close();
      this.socket = null;
    }
    this.subscriptions.clear();
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export const webSocketService = new WebSocketService();
