const LEAD_ZEROS_REGEXP = /^0+/;

export function removeLeadZeros(source: string): string {
  return source.replace(LEAD_ZEROS_REGEXP, '');
}
