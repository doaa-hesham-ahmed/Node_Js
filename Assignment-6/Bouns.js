/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const values = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let sum = 0;

    for (let i = 0; i < s.length; i++) {

        if (i + 1 < s.length && values[s[i]] < values[s[i + 1]]) {
            sum -= values[s[i]];
        } else {
            sum += values[s[i]];
        }
    }

    return sum;
};
console.log(romanToInt("III"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV"));
