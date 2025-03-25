// __tests__/getFlagEmoji.test.ts

import { getFlagEmoji } from '@/app/utils/countriesList';

describe('getFlagEmoji', () => {
  it('returns 🇮🇳 for "India"', () => {
    expect(getFlagEmoji('India')).toBe('🇮🇳');
  });

  it('is case-insensitive and trims spaces', () => {
    expect(getFlagEmoji('   india   ')).toBe('🇮🇳');
    expect(getFlagEmoji('iNdIa')).toBe('🇮🇳');
  });

  it('returns correct flag from a sentence containing the country', () => {
    expect(getFlagEmoji('Visited Canada last year')).toBe('🇨🇦');
  });

  it('returns empty string if country not found', () => {
    expect(getFlagEmoji('Middle Earth')).toBe('');
  });

  it('returns 🇺🇸 for "United States"', () => {
    expect(getFlagEmoji('United States')).toBe('🇺🇸');
  });

  it('returns 🇬🇧 for "United Kingdom"', () => {
    expect(getFlagEmoji('United Kingdom')).toBe('🇬🇧');
  });

  it('returns 🇨🇦 for lowercase "canada"', () => {
    expect(getFlagEmoji('canada')).toBe('🇨🇦');
  });
});
