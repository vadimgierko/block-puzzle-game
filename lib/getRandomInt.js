/**
 * ❗❗❗ for max 3 => 0, 1, 2; so max will never be chosen
 * @param {number} max
 * @returns number
 */
export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
