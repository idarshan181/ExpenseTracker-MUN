import { formatCurrency } from '@/app/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats a number to CAD currency by default', () => {
    expect(formatCurrency(undefined, 1000)).toBe('CA$1,000');
  });

  it('formats a number to USD currency', () => {
    expect(formatCurrency('USD', 2500)).toBe('$2,500');
  });

  it('formats a number to EUR currency', () => {
    expect(formatCurrency('EUR', 999)).toBe('€999');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency('USD', 0)).toBe('$0');
  });

  it('handles large numbers', () => {
    expect(formatCurrency('USD', 1234567)).toBe('$1,234,567');
  });
});
