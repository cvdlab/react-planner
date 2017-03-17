/** @description Return float fixed to desired precision
 *  @param {number} num Float to fix
 *  @param {number} precision Desired precision, or 6 if not specified
 *  @return {number}
*/
export function toFixedFloat(num, precision = 6) {
  if (num && precision) {
    let prec = (10 ** precision);
    return ( ~~(num * prec) / prec);
  }
  return 0;
}

/** @description Return absolute value of a number
 *  @param {number} n Number of wich get value without sign
 *  @return {number}
*/
export const fAbs = n => { let x = n; (x<0) && (x=~x+1); return x; };
