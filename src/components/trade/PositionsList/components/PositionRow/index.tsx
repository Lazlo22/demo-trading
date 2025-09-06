import { type FC } from "react";
import { TrendingUp, TrendingDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Position } from "@/types/trade";
import { formatPnL, formatPrice } from "@/utils/formatters";

interface PositionRowProps {
  position: Position;
  handleClosePositionClick: (position: Position) => void;
}

const PositionRow: FC<PositionRowProps> = ({ position, handleClosePositionClick }) => {
  const pnl = formatPnL(position.pnl);
  const isBuy = position.type === "buy";

  return (
    <div
      key={position.id}
      className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 dark:border-slate-600/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 items-center transition-colors"
    >
      <div className="flex items-center gap-2">
        {isBuy ? <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" /> : <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />}
        <span className={`text-sm font-medium ${isBuy ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{isBuy ? "Long" : "Short"}</span>
      </div>
      <div className="text-center">
        <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{position.size} BTC</span>
      </div>
      <div className="text-center">
        <span className="text-sm font-medium text-gray-900 dark:text-slate-100">${formatPrice(position.entryPrice)}</span>
      </div>
      <div className="text-center">
        <span className="text-sm text-gray-600 dark:text-slate-300 capitalize">{position.mode}</span>
      </div>
      <div className="text-center">
        <span className={`text-sm font-medium ${pnl.className}`}>
          {pnl.isPositive ? "+" : ""}${pnl.value}
        </span>
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleClosePositionClick(position)}
          className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-700/50 hover:text-red-600 dark:hover:text-red-400 dark:border-slate-600/50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

PositionRow.displayName = "PositionRow";

export default PositionRow;
