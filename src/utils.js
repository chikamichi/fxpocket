import coinify from 'coinify'

import Fixer from './fixer'

export const APP_TITLE = 'fxPocket'
export const APP_MOTTO = 'Currency conversion made easy.'

export const INITIAL_STATE = {
  // Keeps track of the app's async startup process.
  init: false,
  // A list of currency widgets to display at startup.
  // First currency is considered the "base" currency, next widgets are
  // "quote" currencies.
  // @see https://www.investopedia.com/terms/c/currencypair.asp
  widgets: ['EUR', 'USD'],
  // Keeps track of the base currency's amount.
  baseAmount: undefined
}

// http://www.jacklmoore.com/notes/rounding-in-javascript/
export function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export function convertAmounts(fixer, context = {}) {
  if (arguments.length === 1 && arguments[0] instanceof Fixer)
    return (context = {}) => convertAmounts.bind({}, fixer)(context)

  if (!context.amount || !context.currency) return {}

  return context.currencies.reduce((acc, currency) => {
    let amount
    if (context.currency === currency)
      amount = context.amount
    else
      amount = context.amount * fixer.rates[context.currency][currency]
    acc[currency] = round(amount, 2)
    return acc
  }, {})
}

export function currencyWording(currency) {
  const c = coinify.get(currency)
  return [
    c.code,
    '/',
    c.name
  ].join(' ')
}
