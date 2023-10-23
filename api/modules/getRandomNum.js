// Gives me a random number with set number of of deciamals and a maximal value
// It works by generating a ranom number that from 1 to 0 (Math.random()) then
// it multiplies it by max value to get to the wanted range (0 -> max)
// then it multiply it by 10 to the power of dicamals so put those numbers before the dicimal dot
// so now i can round it and get rid of un needed deciamls and the i devide with 10 to the power of decimals so
// i can get needed numbers from left side of the dot to the right
// Example:
// Math.random() = 0.5286671
// max = 10
// decimals = 2
// 0.5286671*10 = 5.286671
// 5.286671 * (10**2) = 5.286671 * 100 = 528.6671
// Math.round(528.6671) = 528
// 528 / (10**2) = 528 / 100 = 5.25
// So i got a random number from 0 to 10 with 2 decimals
const getRandomNum = (max, decimals=1) => Math.round(Math.random()*max*(10**decimals))/10**decimals

module.exports = getRandomNum;