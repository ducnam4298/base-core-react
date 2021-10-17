const CurrencyConvert = class {
  VND(data: number) {
    const formatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    return formatter.format(data);
  }
};
const currencyConvert = new CurrencyConvert();

export { currencyConvert };
