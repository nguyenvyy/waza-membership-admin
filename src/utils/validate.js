

export const checkPositiveNumber = value => /^(\d+\d+)$|^(\d+)$/gm.test(value)
export const checkDivideBy = (number, by) => number%by === 0 ? true : false

export const checkMinMax = (value, min, max) => {
    return value >= min && value <= max
}

export const checkIsInterge = value => Number.isInteger(value)
export const check = value => /^[0-9]*$/gm.test(value)
export const checkIsNaN = value => isNaN(value);
export const checkNoSymbolsOrSpecialChars = value => {
    let regex = new RegExp(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g)
    return regex.test(value)
}