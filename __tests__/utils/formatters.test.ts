import { formatPrice, formatPnL } from '../../src/utils/formatters';

describe('formatPrice', () => {
  it('formats integer prices correctly', () => {
    expect(formatPrice('1000')).toBe('1,000');
    expect(formatPrice('1234567')).toBe('1,234,567');
  });

  it('formats decimal prices correctly', () => {
    expect(formatPrice('1000.50')).toBe('1,000.5');
    expect(formatPrice('1234.567')).toBe('1,234.567');
  });

  it('handles zero', () => {
    expect(formatPrice('0')).toBe('0');
    expect(formatPrice('0.00')).toBe('0');
  });
});

describe('formatPnL', () => {
  it('formats positive PnL correctly', () => {
    const result = formatPnL('150.75');
    expect(result.value).toBe('150.75');
    expect(result.isPositive).toBe(true);
    expect(result.className).toBe('text-green-600');
  });

  it('formats negative PnL correctly', () => {
    const result = formatPnL('-75.25');
    expect(result.value).toBe('-75.25');
    expect(result.isPositive).toBe(false);
    expect(result.className).toBe('text-red-600');
  });

  it('handles zero PnL', () => {
    const result = formatPnL('0');
    expect(result.value).toBe('0.00');
    expect(result.isPositive).toBe(true);
    expect(result.className).toBe('text-green-600');
  });

  it('rounds to 2 decimal places', () => {
    const result = formatPnL('123.456789');
    expect(result.value).toBe('123.46');
  });
});