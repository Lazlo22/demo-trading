import { ETheme } from "@constants/theme";

export const getWidgetConfig = (symbol: string, theme: ETheme) => ({
    autosize: true,
    symbol: symbol,
    interval: 'D',
    timezone: 'Etc/UTC',
    theme: theme === 'light' ? ETheme.Light : ETheme.Dark,
    style: '1',
    locale: 'en',
    enable_publishing: false,
    allow_symbol_change: true,
    calendar: false,
    support_host: 'https://www.tradingview.com'
});