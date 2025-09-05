import { type FC } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Position } from "@/types/trade";
import { formatPrice, formatPnL } from "@/utils/formatters";

interface ClosePositionDialogProps {
  position: Position | null;
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}

const ClosePositionDialog: FC<ClosePositionDialogProps> = ({
  position,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!position) return null;

  const isBuy = position.type === 'buy';
  const { value: pnlValue, isPositive } = formatPnL(position.pnl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isBuy ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            Close Position
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to close this position? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Position Type:</span>
              <div className="flex items-center gap-2">
                {isBuy ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${isBuy ? 'text-green-600' : 'text-red-600'}`}>
                  {isBuy ? 'Long' : 'Short'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Size:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {position.size} BTC
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Entry Price:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ${formatPrice(position.entryPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mode:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {position.mode}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900 dark:text-white">Current PnL:</span>
                <span className={`text-base font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}${pnlValue}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Position Closure Warning
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Closing this position will realize your current PnL and cannot be undone. 
                  Make sure you want to proceed with this action.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Close Position
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

ClosePositionDialog.displayName = "ClosePositionDialog";

export default ClosePositionDialog;