import { memo, useEffect, useRef } from "react";

import { ETheme } from "@constants/theme";
import { TRADING_SYMBOL } from '@constants/trading';
import { getWidgetConfig } from "@/utils/chart";
import { loadScript } from "@utils/script";

const TradingChart = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const widgetConfig = getWidgetConfig(TRADING_SYMBOL, ETheme.Light);

    const script = loadScript({
      src: "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
      async: true,
      innerHTML: JSON.stringify(widgetConfig),
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full overflow-hidden"></div>;
});

TradingChart.displayName = "TradingChart";

export default TradingChart;
