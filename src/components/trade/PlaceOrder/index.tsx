import { type FC, lazy, Suspense, useState, useTransition } from "react";
import { toast } from "react-toastify";

import type { OrderMode, OrderType, Order } from "@/types/trade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePositionsStore } from "@/stores/PositionsStore";
import { CURRENT_BTC_PRICE, TRADING_FEE } from "@/constants/trading";

const OrderConfirmationDialog = lazy(() => import("../OrderConfirmationDialog"));

const PlaceOrder: FC = () => {
  const [orderType, setOrderType] = useState<OrderType>("buy");
  const [orderMode, setOrderMode] = useState<OrderMode>("market");
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [_, startTransition] = useTransition();

  const addPosition = usePositionsStore((state) => state.addPosition);

  const isLimitOrder = orderMode === 'limit';
  const canPlaceOrder = amount && parseFloat(amount) > 0 && (!isLimitOrder || (price && parseFloat(price) > 0));

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) {
      toast.error("Please enter a valid amount");
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmOrder = () => {
    try {
      const isBuy = orderType === "buy";
      const isMarket = orderMode === "market";
      const orderPrice = isMarket ? CURRENT_BTC_PRICE : parseFloat(price || "0");
      const totalValue = parseFloat(amount || "0") * orderPrice;
      const fee = totalValue * TRADING_FEE;
      const finalTotal = isBuy ? totalValue + fee : totalValue - fee;

      const order: Order = {
        id: Date.now(),
        type: orderType,
        mode: orderMode,
        amount,
        price: isMarket ? undefined : price,
        totalValue,
        fee,
        finalTotal,
        timestamp: Date.now()
      };

      addPosition(order);

      const orderTypeText = orderType === 'buy' ? 'Buy' : 'Sell';
      toast.success(`${orderTypeText} order placed successfully!`);

      // Reset form
      setAmount("");
      setPrice("");
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Place Order</h3>
        <div className="flex mb-4">
          <Button
            onClick={() => setOrderType("buy")}
            variant={orderType === "buy" ? "default" : "outline"}
            className={`flex-1 rounded-r-none ${orderType === "buy" ? "bg-green-600 hover:bg-green-700 border-green-600" : ""}`}
          >
            Buy
          </Button>
          <Button
            onClick={() => setOrderType("sell")}
            variant={orderType === "sell" ? "default" : "outline"}
            className={`flex-1 rounded-l-none border-l-0 ${
              orderType === "sell" ? "bg-red-600 hover:bg-red-700 border-red-600" : ""
            }`}
          >
            Sell
          </Button>
        </div>
        <div className="flex mb-4">
          <Button
            onClick={() => setOrderMode("market")}
            variant={orderMode === "market" ? "default" : "outline"}
            className="flex-1 rounded-r-none"
          >
            Market
          </Button>
          <Button
            onClick={() => setOrderMode("limit")}
            variant={orderMode === "limit" ? "default" : "outline"}
            className="flex-1 rounded-l-none border-l-0"
            disabled
          >
            Limit
          </Button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount (BTC)
          </label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => startTransition(() => setAmount(e.target.value))} 
            placeholder="0.00"
          />
        </div>
        <Button
          onClick={handlePlaceOrder}
          disabled={!canPlaceOrder}
          className={`w-full ${orderType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
          size="lg"
        >
          {orderType === "buy" ? "Buy" : "Sell"} BTC
        </Button>
      </div>
      <Suspense>
        <OrderConfirmationDialog
            open={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleConfirmOrder}
            orderType={orderType}
            orderMode={orderMode}
            amount={amount}
            price={price}
        />
      </Suspense>
    </>
  );
};

PlaceOrder.displayName = "PlaceOrder";

export default PlaceOrder;
