
/**
 * Formats a number as currency
 * @param amount Amount in cents
 * @param currency Currency code (default: 'usd')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'usd'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  });
  
  return formatter.format(amount / 100);
}
