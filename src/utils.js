import coinify from 'coinify'

import Fixer from './fixer'

export const APP_TITLE = 'fxPocket'
export const APP_MOTTO = 'Currency conversion made easy.'

export const INITIAL_STATE = {
  // Keeps track of app's startup process.
  init: false,
  // A list of currency widgets to display at startup.
  widgets: ['EUR', 'USD'],
  // Keeps track of user intents.
  base: {
    amount: undefined,
    currency: undefined
  }
}

// http://www.jacklmoore.com/notes/rounding-in-javascript/
export function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export function convertAmounts(fixer, base = {}) {
  if (arguments.length === 1 && arguments[0] instanceof Fixer)
    return (base = {}) => convertAmounts.bind({}, fixer)(base)

  if (!base.amount || !base.currency) return {}

  return fixer.currencies.reduce((acc, currency) => {
    let amount
    if (base.currency === currency)
      amount = base.amount
    else
      amount = base.amount * fixer.rates[base.currency][currency]
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
