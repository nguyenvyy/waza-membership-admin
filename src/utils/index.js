
export function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;

        var executeFunction = function () {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
    };
};

export const formatVND = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const deleteformatVND = value => value.replace(/\$\s?|(,*)/g, '')

/**
 *  random date
 * @param {Date} start start date
 * @param {Date} end start date
 * @returns {Date}
 */
export const  randomDate = (start, end) => () => {
    var diff =  end.getTime() - start.getTime();
    var new_diff = diff * Math.random();
    var date = new Date(start.getTime() + new_diff);
    return date;
}

/**
 *  random number in range
 * @param {number} start start number
 * @param {number} end end number
 * @returns {number}
 */
export const randomNumberInRange = (start, end) => {
    return Math.floor(Math.random() * (end - start)) + start
}