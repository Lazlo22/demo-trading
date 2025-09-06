import type { FC } from "react";

import { useMarkets } from "@hooks/useMarkets";
import HomeError from "@components/home/HomeError";
import Marketslist from "@components/home/MarketsList";
import HomeLoading from "@/components/home/HomeLoading";

const Home: FC = () => {
  const { markets, error } = useMarkets();

  if (error) return <HomeError />;

  return (
    <div className="p-6" data-testid="home-page">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Markets
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {markets.length === 0 ? (
          <HomeLoading />
        ) : (
          <Marketslist markets={markets} />
        )}
      </div>
    </div>
  )
}

Home.displayName = "Home"

export default Home
