export function formatINR(paise: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paise / 100)
}

export function formatCurrency(amount: number, locale = "en-IN", currency = "INR") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount)
}
