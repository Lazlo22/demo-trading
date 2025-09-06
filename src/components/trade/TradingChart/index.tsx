import { memo, useEffect, useRef } from "react";

import { useTheme } from "@/contexts/ThemeContext";
import { TRADING_SYMBOL } from '@constants/trading';
import { getWidgetConfig } from "@/utils/chart";
import { loadScript } from "@utils/script";

const TradingChart = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const widgetConfig = getWidgetConfig(TRADING_SYMBOL, theme);

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
  }, [theme]);

  return <div ref={containerRef} className="w-full h-full overflow-hidden bg-white dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700/50"></div>;
});

TradingChart.displayName = "TradingChart";

export default TradingChart;
