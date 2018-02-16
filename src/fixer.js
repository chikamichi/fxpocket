/*
 * http://fixer.io/ API wrapper & helper functions.
 */
export default class Fixer {
  // Pre-fetches currencies list and rates.
  // @return a populated Fixer instance
  static async connect() {
    const currencies = await this.fetchCurrencies()
    const rates = await this.fetchRates(currencies)
    return new Fixer(currencies, rates)
  }

  constructor(currencies, rates) {
    if (typeof currencies === 'undefined') {
      throw new Error('Cannot be called directly, use Fixer.connect() instead.')
    }
    this.currencies = currencies
    this.rates = rates
  }

  static fetchRates(currencies) {
    return Promise.all(currencies.map((currency) => {
      // Beware: as fetch().then() returns a Promise (for chainability), it must
      // be part of Promise.all().
      return fetch(`https://api.fixer.io/latest?base=${currency}`)
        .then(response => response.json())
    }))
    .then(data => {
      const extractRates = (acc, val) => {
        acc[val.base] = val.rates
        return acc
      }
      return data.reduce(extractRates, {})
    })
  }

  static fetchCurrencies() {
    return fetch(`https://api.fixer.io/latest?base=EUR`)
      .then(response => response.json())
      .then(data => {
        return [
          'EUR',
          ...Object.keys(data.rates),
        ].sort((a,b) => a.localeCompare(b))
      })
  }
}
