import { useEffect } from 'react';
import { debounce } from 'lodash';

import { useWebSocket } from '@/contexts/WebSocketContext';
import { useMarketsStore } from '@/stores/MarketsStore';
import { useMarketMetadataQuery } from '@/hooks/queries/useMarketsQueries';
import { WEBSOCKET_SUBSCRIPTIONS, WS_INTERFACE_UPDATE_TIMEOUT } from '@/constants/websocket';
import type { AllMidsResponse } from '@/types/websocket';

export const useMarkets = () => {
  const updateMarkets = useMarketsStore((state) => state.updateMarkets);
  const markets = useMarketsStore((state) => state.markets);
  
  const { subscribe, unsubscribe } = useWebSocket();
  
  const {
    data: metadata,
    error: queryError,
  } = useMarketMetadataQuery();

  const error = queryError ? (queryError instanceof Error ? queryError.message : 'Failed to load market metadata') : null;
  
  useEffect(() => {
    const onWSUpdate = (response: AllMidsResponse) => {
      if (response.data?.mids) {
        updateMarkets(response.data.mids);
      }
    };

    subscribe<AllMidsResponse>(WEBSOCKET_SUBSCRIPTIONS.ALL_MIDS, debounce(onWSUpdate, WS_INTERFACE_UPDATE_TIMEOUT));

    return () => {
      unsubscribe(WEBSOCKET_SUBSCRIPTIONS.ALL_MIDS);
    };
  }, [metadata, updateMarkets, subscribe, unsubscribe]);

  return {
    markets,
    error
  };
};