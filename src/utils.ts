export function formatNumber(number: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    notation: "standard",
  }).format(number);
}
