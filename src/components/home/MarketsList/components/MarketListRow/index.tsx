import type { FC } from "react";

import type { MarketItem } from "@/types/market";

interface MarketslistRowProps {
    item: MarketItem;
}

const MarketslistRow: FC<MarketslistRowProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        <div className="font-medium text-gray-900 dark:text-white">
            {item.symbol}
        </div>
        <div className="text-right font-mono text-gray-900 dark:text-white">
            ${parseFloat(item.price).toFixed(4)}
        </div>
        <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Live
            </span>
        </div>
    </div>
  )
}

MarketslistRow.displayName = "MarketslistRow"

export default MarketslistRow
