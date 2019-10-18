

export const checkPositiveNumber = value => /^(\d+\d+)$|^(\d+)$/gm.test(value)

export const checkDivideBy = (number, by) => number%by === 0 ? true : false