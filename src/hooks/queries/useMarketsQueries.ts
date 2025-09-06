import { useSuspenseQuery } from "@tanstack/react-query";

import { hyperliquidApiService } from "@/services/HyperliquidApiService";
import type { MarketMetadata } from "@/types/market";

export const MARKETS_QUERY_KEYS = {
  meta: ["markets", "meta"] as const,
  spotMeta: ["markets", "spotMeta"] as const,
  marketMetadata: ["markets", "metadata"] as const,
} as const;

const fetchMeta = () => hyperliquidApiService.getMeta();
const fetchSpotMeta = () => hyperliquidApiService.getSpotMeta();

const useMetaQuery = () => {
  return useSuspenseQuery({
    queryKey: MARKETS_QUERY_KEYS.meta,
    queryFn: fetchMeta,
  });
};

const useSpotMetaQuery = () => {
  return useSuspenseQuery({
    queryKey: MARKETS_QUERY_KEYS.spotMeta,
    queryFn: fetchSpotMeta,
  });
};

export const useMarketMetadataQuery = () => {
  const metaQuery = useMetaQuery();
  const spotMetaQuery = useSpotMetaQuery();

  return useSuspenseQuery({
    queryKey: MARKETS_QUERY_KEYS.marketMetadata,
    queryFn: (): MarketMetadata => {
      if (!metaQuery.data || !spotMetaQuery.data) {
        throw new Error("Meta data not available");
      }

      return {
        perpetuals: metaQuery.data.universe,
        spotTokens: spotMetaQuery.data.tokens,
        spotPairs: spotMetaQuery.data.universe,
      };
    }
  });
};
