import { type FC, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@ui/dialog";
import { Button } from "@ui/button";
import Warning from "@/components/common/Warning";
import type { OrderType, OrderMode } from "@/types/trade";
import { CURRENT_BTC_PRICE, TRADING_FEE } from "@/constants/trading";

interface OrderConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderType: OrderType;
  orderMode: OrderMode;
  amount: string;
  price?: string;
}

const OrderConfirmationDialog: FC<OrderConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  orderType,
  orderMode,
  amount,
  price,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isBuy = orderType === "buy";
  const isMarket = orderMode === "market";

  const orderPrice = isMarket ? CURRENT_BTC_PRICE : parseFloat(price || "0");
  const totalValue = parseFloat(amount || "0") * orderPrice;

  const fee = totalValue * TRADING_FEE;
  const finalTotal = isBuy ? totalValue + fee : totalValue - fee;

  const handleConfirm = () => {
    setIsProcessing(true);
    
    try {
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to confirm order:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isBuy ? <TrendingUp className="h-5 w-5 text-green-600" /> : <TrendingDown className="h-5 w-5 text-red-600" />}
            Confirm {isBuy ? "Buy" : "Sell"} Order
          </DialogTitle>
          <DialogDescription>Please review your order details before confirming.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Order Type</span>
              <span className={`text-sm font-semibold ${isBuy ? "text-green-600" : "text-red-600"}`}>
                {isBuy ? "Buy" : "Sell"} • {isMarket ? "Market" : "Limit"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Amount</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{amount} BTC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Price</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ${orderPrice.toLocaleString()} USDT
                {isMarket && <span className="text-xs text-gray-500 ml-1">(Market)</span>}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${totalValue.toLocaleString()} USDT
                </span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Trading Fee (0.1%)</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">${fee.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-600">
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  {isBuy ? "Total Cost" : "Total Received"}
                </span>
                <span className="text-base font-bold text-gray-900 dark:text-white">${finalTotal.toLocaleString()} USDT</span>
              </div>
            </div>
          </div>
          {isMarket ? (
            <Warning title="Market Order Notice">
              Market orders execute immediately at the best available price, which may differ from the displayed price.
            </Warning>
          ) : null}
        </div>
        <DialogFooter className="gap-2 mt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className={isBuy ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            {isProcessing ? "Processing..." : `Confirm ${isBuy ? "Buy" : "Sell"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

OrderConfirmationDialog.displayName = "OrderConfirmationDialog";

export default OrderConfirmationDialog;
