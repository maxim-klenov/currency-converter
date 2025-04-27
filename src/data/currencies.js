import Currency from 'currency.js';
export const currencyFormatters = {
  USD: value =>
    Currency(value).format({
      symbol: "$",
      precision: 2,
      decimal: ".",
      thousand: ",",
      pattern: "!#"
    }),
  RUB: value => 
    Currency(value).format({
      symbol: '₽', 
      precision: 3, 
      decimal: '.', 
      thousand: ',', 
      pattern: '#!',
    }),
  TMT: value => 
    Currency(value).format({
      symbol: 'TMT', 
      precision: 2, 
      decimal: '.', 
      thousand: ',', 
      pattern: '#!',
    }),
  EUR: value => 
    Currency(value).format({
      symbol: '€',
      precision: 2,
      decimal: ".",
      thousand: ",",
      pattern: '!#',
    }),
  JPY: value => 
  Currency(value).format({
    symbol: '¥',
    precision: 0,
    decimal: ".",
    thousand: ",",
    pattern: '!#',
  }),
  GBP: value => 
  Currency(value).format({
    symbol: '£',
    precision: 2,
    decimal: ".",
    thousand: ",",
    pattern: '!#',
  }),
  BTC: value => 
  Currency(value).format({
    symbol: '₿',
    precision: 8,
    fromCents: true,
    decimal: ".",
    thousand: ",",
    pattern: '!#',
  }),
  ETH: value => 
  Currency(value).format({
    symbol: 'Ξ',
    precision: 8,
    decimal: ".",
    thousand: ",",
    pattern: '!#',
  })
};
