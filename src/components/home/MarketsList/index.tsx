import type { FC } from "react";
import VirtualList from "rc-virtual-list";

import MarketslistRow from "./components/MarketListRow";
import type { MarketItem } from "@/types/market";

interface MarketslistProps {
    markets: MarketItem[];
}

const Marketslist: FC<MarketslistProps> = ({ markets }) => {
  return (
    <VirtualList
        data={markets}
        height={600}
        itemHeight={60}
        itemKey={(i) => i.id}
    >
        {(item) => <MarketslistRow item={item} />}
    </VirtualList>
  )
}

Marketslist.displayName = "Marketslist"

export default Marketslist
