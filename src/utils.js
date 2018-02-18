import coinify from 'coinify'

import Fixer from './fixer'

/** @type {string} */
export const APP_TITLE = 'fxPocket'
/** @type {string} */
export const APP_MOTTO = 'Currency conversion made easy.'

/**
 * {@link App}'s initial state.
 *
 * First `widgets` entry is considered the "base" currency, next widgets are
 * "quote" currencies.
 *
 * @see https://www.investopedia.com/terms/c/currencypair.asp
 *
 * @type {Object}
 * @property {boolean} INITIAL_STATE.init - Keeps track of the app's async startup process
 * @property {Array<string>} INITIAL_STATE.widgets - A list of currency widgets to display at startup
 * @property {number|undefined} INITIAL_STATE.baseAmount - Keeps track of the base currency's amount
 */
export const INITIAL_STATE = {
  init: false,
  widgets: ['EUR', 'USD'],
  baseAmount: undefined
}

/**
 * Rounds floating numbers to n decimals.
 *
 * @see http://www.jacklmoore.com/notes/rounding-in-javascript/
 *
 * @param {number} value
 * @param {number} [decimals=2] - how many decimals to keep
 * @return {number}
 */
export function round(value, decimals = 2) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/**
 * Converts an amount from one currency to another.
 *
 * The function may be curried over a specific {@link Fixer} record.
 *
 * @param {Fixer} fixer - must provide conversion rates between specified currencies (any object abiding by Fixer's API is also valid)
 * @param {number} amount - the amount to convert
 * @param {string} baseCurrency - currency to convert from (amount's current unit)
 * @param {string} quoteCurrency - currency to convert to
 * @return {number} converted amount
 */
export function convertAmount(fixer, amount, baseCurrency, quoteCurrency) {
  if (arguments.length === 1 && arguments[0] instanceof Fixer)
    return (amount, baseCurrency, quoteCurrency) =>
      convertAmount.bind({}, fixer)(amount, baseCurrency, quoteCurrency)

  return amount * fixer.rates[baseCurrency][quoteCurrency]
}

/**
 * Batch-conversion of several amounts expressed in the same base currency, to
 * all supported quote currencies as specified by the Fixer record.
 *
 * The function may be curried over a specific {@link Fixer} record.
 *
 * @param {Fixer} fixer - must provide conversion rates between specified base currency and some quote currencies
 * @param {Object} context
 * @param {number} context.amount - the amount to convert
 * @param {string} context.currency - the base currency (amount's current unit)
 * @return {Object} a list of converted amounts for each supported quote currencies
 */
export function convertAmounts(fixer, context = {}) {
  if (arguments.length === 1 && arguments[0] instanceof Fixer)
    return (context = {}) => convertAmounts.bind({}, fixer)(context)

  if (!context.amount || !context.currency) return {}

  return context.currencies.reduce((acc, currency) => {
    let amount
    if (context.currency === currency)
      amount = context.amount
    else
      amount = convertAmount(fixer, context.amount, context.currency, currency)
    acc[currency] = round(amount)
    return acc
  }, {})
}

/**
 * User-friendly wording for a currency.
 *
 * Eg. for 'AUD', returns 'AUD / Australian Dollar'
 *
 * @param {string} currency
 * @return {string}
 */
export function currencyWording(currency) {
  const c = coinify.get(currency)
  return [
    c.code,
    '/',
    c.name
  ].join(' ')
}
