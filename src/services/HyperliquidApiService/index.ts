import type { PerpetualMeta, SpotToken, SpotPair } from '@/types/market';

interface MetaResponse {
  universe: PerpetualMeta[];
}

interface SpotMetaResponse {
  universe: SpotPair[];
  tokens: SpotToken[];
}

class HyperliquidApiService {
  private readonly baseUrl = 'https://api.hyperliquid.xyz/info';

  private async makeRequest<T>(data: any): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getMeta(): Promise<MetaResponse> {
    return this.makeRequest<MetaResponse>({
      type: 'meta',
    });
  }

  async getSpotMeta(): Promise<SpotMetaResponse> {
    return this.makeRequest<SpotMetaResponse>({
      type: 'spotMeta',
    });
  }
}

export const hyperliquidApiService = new HyperliquidApiService();