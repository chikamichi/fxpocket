export const APP_TITLE = 'fxPocket'
export const APP_MOTTO = 'Currency conversion made easy.'

// http://www.jacklmoore.com/notes/rounding-in-javascript/
export function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
