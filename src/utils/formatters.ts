export const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString();
};

export const formatPnL = (pnl: string) => {
    const pnlValue = parseFloat(pnl);
    const isPositive = pnlValue >= 0;

    return {
        value: pnlValue.toFixed(2),
        isPositive,
        className: isPositive ? "text-green-600" : "text-red-600",
    };
};