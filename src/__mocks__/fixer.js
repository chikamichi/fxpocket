/**
 * Mock requests to fixer.io in tests.
 *
 * @ignore
 */
export default class Fixer {

  static async connect() {
    const currencies = ['EUR', 'USD']
    const rates = {
      EUR: {
        USD: 1.25
      },
      USD: {
        EUR: 0.8
      }
    }
    return new Fixer(currencies, rates)
    // Without async:
    // return new Promise((resolve, reject) => {
    //   resolve(new Fixer(currencies, rates))
    // })
  }

  constructor(currencies, rates) {
    this.currencies = currencies
    this.rates = rates
  }
}
