/**
 * **http://fixer.io/ API wrapper providing helper functions.**
 */
export default class Fixer {
  /**
   * `Fixer.connect()` - Synchronously pre-fetches available currencies and
   * matching conversion rates.
   *
   * One *must* use `connect()` to instanciate `Fixer`.
   *
   * @return {Fixer} a populated instance
  */
  static async connect() {
    const currencies = await this.fetchCurrencies()
    const rates = await this.fetchRates(currencies)
    return new Fixer(currencies, rates)
  }

  /** @ignore */
  constructor(currencies, rates) {
    if (typeof currencies === 'undefined') {
      throw new Error('Cannot be called directly, use Fixer.connect() instead.')
    }
    /** @type {Array<string>} */
    this.currencies = currencies
    /** @type {Object} */
    this.rates = rates
  }

  /**
   * `Fixer.fetchRates()` - Fetches conversion rates for specified currencies.
   *
   * Specified currencies must be available on the API.
   *
   * @param {Array<string>} currencies - available currencies
   * @return {Array<Object>} matching rates for each available currency
   */
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

  /**
   * `Fixer.fetchCurrencies()` - Fetches available currencies.
   *
   * @return {Array<string>} A list of ISO 4217 codes, alpha-sorted
   * @see https://en.wikipedia.org/wiki/ISO_4217
   */
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
