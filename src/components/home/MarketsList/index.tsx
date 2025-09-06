import type { FC } from "react";
import VirtualList from "rc-virtual-list";

import MarketslistRow from "./components/MarketListRow";
import type { MarketItem } from "@/types/market";

interface MarketslistProps {
    markets: MarketItem[];
}

const Marketslist: FC<MarketslistProps> = ({ markets }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700/50 overflow-hidden">
      <VirtualList
          data={markets}
          height={600}
          itemHeight={60}
          itemKey={(i) => i.id}
      >
          {(item) => <MarketslistRow item={item} />}
      </VirtualList>
    </div>
  )
}

Marketslist.displayName = "Marketslist"

export default Marketslist
