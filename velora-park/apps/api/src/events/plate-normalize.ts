export type CountryProfileCode = 'TR' | 'DZ' | 'EU' | 'GENERIC';

/** Normalize plate text by country profile without rejecting unknown formats. */
export function normalizePlateText(
  plateText: string,
  countryCode: string,
): string {
  const cleaned = plateText
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .trim();

  switch (countryCode.toUpperCase()) {
    case 'TR':
    case 'DZ':
    case 'EU':
      return cleaned;
    default:
      return cleaned;
  }
}

export function resolveCountryProfile(countryCode: string): CountryProfileCode {
  const code = countryCode.toUpperCase();
  if (code === 'TR' || code === 'DZ' || code === 'EU') return code;
  return 'GENERIC';
}
