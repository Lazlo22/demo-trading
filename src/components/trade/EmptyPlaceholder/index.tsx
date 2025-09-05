import { memo, type FC } from "react";
import { ChartColumnStacked } from 'lucide-react';

const EmptyPlaceholder: FC = memo(() => {
  return (
    <div className="p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
            <ChartColumnStacked className="mx-auto" />
        </div>
        <p className="text-gray-500 dark:text-gray-400">
            No open positions
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Your positions will appear here once you place trades
        </p>
    </div>
  )
})

EmptyPlaceholder.displayName = "EmptyPlaceholder"

export default EmptyPlaceholder
