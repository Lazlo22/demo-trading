import type { WEBSOCKET_SUBSCRIPTIONS } from "@/constants/websocket";

export type WebSocketSubscriptionType = typeof WEBSOCKET_SUBSCRIPTIONS[keyof typeof WEBSOCKET_SUBSCRIPTIONS];

type WSSocketMethodType = "subscribe" | "unsubscribe";;

export interface Subscription {
    method: WSSocketMethodType
    subscription: {
      type: WebSocketSubscriptionType;
    };
}

export interface AllMidsResponse {
    channel: "allMids";
    data: {
      mids: Record<string, string>;
    };
}