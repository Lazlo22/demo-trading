export type OrderType = 'buy' | 'sell';

export type OrderMode = 'market' | 'limit';

export interface Position {
    id: number;
    entryPrice: string;
    size: string;
    pnl: string;
    type: OrderType;
    mode: OrderMode;
    timestamp: number;
}

export interface Order {
    id: number;
    type: OrderType;
    mode: OrderMode;
    amount: string;
    price?: string;
    totalValue: number;
    fee: number;
    finalTotal: number;
    timestamp: number;
}