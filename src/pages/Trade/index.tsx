import { type FC } from "react";

import EmptyPlaceholder from "@/components/trade/EmptyPlaceholder";
import PositionsList from "@/components/trade/PositionsList";
import { usePositionsStore } from "@/stores/PositionsStore";
import TradingChart from "@/components/trade/TradingChart";
import PlaceOrder from "@/components/trade/PlaceOrder";

const Trade: FC = () => {
  const positions = usePositionsStore((state) => state.positions);

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full min-h-[600px] overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                BTC/USDT - BINANCE
              </h2>
            </div>
            <div className="h-[calc(100%-80px)]">
              <TradingChart />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <PlaceOrder />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Positions
            </h3>
          </div>
          {positions.length ? (
            <PositionsList positions={positions} />
          ) : (
            <EmptyPlaceholder />
          )}
        </div>
      </div>
    </div>
  )
}

Trade.displayName = "Trade"

export default Trade
