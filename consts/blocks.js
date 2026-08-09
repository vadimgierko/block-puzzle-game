import { getRandomInt } from "../lib/getRandomInt.js";

const SHAPES = {
	PLUS: "+",
	C: "C",
	H: "H",
	I: "I",
	L: "L",
	O: "O",
	T: "T",
	S: "S",
	SQUARE: "SQUARE",
	U: "U",
	V: "V",
	X: "X",
	Y: "Y",
	Z: "Z",
};
/**
 * `{w: number; h: number; matrix: number[][]; color: string;}[]`
 */
export const BLOCKS = [
	// CROSS
	{
		shape: SHAPES.PLUS,
		matrix: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 1, 0],
		],
	},
	// SQUARE LARGE
	{
		shape: SHAPES.SQUARE,
		matrix: [
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 1],
		],
	},
	// SQUARE MID
	{
		shape: SHAPES.SQUARE,
		matrix: [
			[1, 1],
			[1, 1],
		],
	},
	{
		shape: SHAPES.SQUARE,
		matrix: [[1]],
	},
	// I (line)
	{
		shape: SHAPES.I,
		matrix: [[1, 1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1], [1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1, 1, 1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1], [1], [1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1, 1, 1, 1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1], [1], [1], [1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1, 1, 1, 1, 1]],
	},
	{
		shape: SHAPES.I,
		matrix: [[1], [1], [1], [1], [1]],
	},
	// L
	// small L
	{
		shape: SHAPES.L,
		matrix: [
			[0, 1],
			[0, 1],
			[1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 0],
			[1, 0],
			[1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1],
			[0, 1],
			[0, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1],
			[1, 0],
			[1, 0],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 0, 0],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[0, 0, 1],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1, 1],
			[1, 0, 0],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1, 1],
			[0, 0, 1],
		],
	},
	// large L
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1, 1],
			[0, 0, 1],
			[0, 0, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1, 1],
			[1, 0, 0],
			[1, 0, 0],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[0, 0, 1],
			[0, 0, 1],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 0, 0],
			[1, 0, 0],
			[1, 1, 1],
		],
	},
	// x-small L
	{
		shape: SHAPES.L,
		matrix: [
			[1, 0],
			[1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[0, 1],
			[1, 1],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1],
			[1, 0],
		],
	},
	{
		shape: SHAPES.L,
		matrix: [
			[1, 1],
			[0, 1],
		],
	},
	// T
	// small T
	{
		shape: SHAPES.T,
		matrix: [
			[0, 1, 0],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.T,
		matrix: [
			[1, 1, 1],
			[0, 1, 0],
		],
	},
	{
		shape: SHAPES.T,
		matrix: [
			[0, 1],
			[1, 1],
			[0, 1],
		],
	},
	{
		shape: SHAPES.T,
		matrix: [
			[1, 0],
			[1, 1],
			[1, 0],
		],
	},
	// large T
	{
		shape: SHAPES.T,
		matrix: [
			[1, 1, 1],
			[0, 1, 0],
			[0, 1, 0],
		],
	},
	{
		shape: SHAPES.T,
		matrix: [
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 1],
		],
	},
	{
		shape: SHAPES.T,
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.T,
		matrix: [
			[1, 0, 0],
			[1, 1, 1],
			[1, 0, 0],
		],
	},
	// Z & S
	// small Z & S
	{
		shape: SHAPES.Z,
		matrix: [
			[1, 1, 0],
			[0, 1, 1],
		],
	},
	{
		shape: SHAPES.S,
		matrix: [
			[0, 1, 1],
			[1, 1, 0],
		],
	},
	{
		shape: SHAPES.S,
		matrix: [
			[1, 0],
			[1, 1],
			[0, 1],
		],
	},
	{
		shape: SHAPES.Z,
		matrix: [
			[0, 1],
			[1, 1],
			[1, 0],
		],
	},
	// large Z & S
	{
		shape: SHAPES.Z,
		matrix: [
			[1, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
	},
	{
		shape: SHAPES.S,
		matrix: [
			[0, 1, 1],
			[0, 1, 0],
			[1, 1, 0],
		],
	},
	{
		shape: SHAPES.S,
		matrix: [
			[1, 0, 0],
			[1, 1, 1],
			[0, 0, 1],
		],
	},
	{
		shape: SHAPES.Z,
		matrix: [
			[0, 0, 1],
			[1, 1, 1],
			[1, 0, 0],
		],
	},
	{
		shape: SHAPES.O,
		matrix: [
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.X,
		matrix: [
			[1, 0, 1],
			[0, 1, 0],
			[1, 0, 1],
		],
	},
	{
		shape: SHAPES.X,
		matrix: [
			[1, 0, 1],
			[0, 1, 0],
			[1, 0, 1],
		],
	},
	// H [UP, DOWN]
	{
		shape: SHAPES.H,
		matrix: [
			[1, 0, 1],
			[1, 1, 1],
			[1, 0, 1],
		],
	},
	{
		shape: SHAPES.H,
		matrix: [
			[1, 1, 1],
			[0, 1, 0],
			[1, 1, 1],
		],
	},
	// [U (UP, DOWN)
	// big U
	{
		shape: SHAPES.U,
		matrix: [
			[1, 0, 1],
			[1, 0, 1],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.U,
		matrix: [
			[1, 1, 1],
			[1, 0, 1],
			[1, 0, 1],
		],
	},
	// small U
	{
		shape: SHAPES.U,
		matrix: [
			[1, 0, 1],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.U,
		matrix: [
			[1, 1, 1],
			[1, 0, 1],
		],
	},
	// C (RIGHT, LEFT)]
	// BIG C
	{
		shape: SHAPES.C,
		matrix: [
			[1, 1, 1],
			[1, 0, 0],
			[1, 1, 1],
		],
	},
	{
		shape: SHAPES.C,
		matrix: [
			[1, 1, 1],
			[0, 0, 1],
			[1, 1, 1],
		],
	},
	// small C
	{
		shape: SHAPES.C,
		matrix: [
			[1, 1],
			[1, 0],
			[1, 1],
		],
	},
	{
		shape: SHAPES.C,
		matrix: [
			[1, 1],
			[0, 1],
			[1, 1],
		],
	},
	// Y
	{
		shape: SHAPES.Y,
		matrix: [
			[1, 0, 1],
			[0, 1, 0],
			[0, 1, 0],
		],
	},
	{
		shape: SHAPES.Y,
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 0, 1],
		],
	},
	{
		shape: SHAPES.Y,
		matrix: [
			[1, 0, 0],
			[0, 1, 1],
			[1, 0, 0],
		],
	},
	{
		shape: SHAPES.Y,
		matrix: [
			[0, 0, 1],
			[1, 1, 0],
			[0, 0, 1],
		],
	},
	// V
	{
		shape: SHAPES.V,
		matrix: [
			[1, 0, 1],
			[1, 0, 1],
			[0, 1, 0],
		],
	},
	{
		shape: SHAPES.V,
		matrix: [
			[0, 1, 0],
			[1, 0, 1],
			[1, 0, 1],
		],
	},
	{
		shape: SHAPES.V,
		matrix: [
			[1, 1, 0],
			[0, 0, 1],
			[1, 1, 0],
		],
	},
	{
		shape: SHAPES.V,
		matrix: [
			[0, 1, 1],
			[1, 0, 0],
			[0, 1, 1],
		],
	},
].map((block) => {
	const { matrix: b, shape } = block;

	const color =
		"rgb(" +
		getRandomInt(256) +
		", " +
		getRandomInt(256) +
		", " +
		getRandomInt(256) +
		")";

	const w = b[0].length;
	const h = b.length;
	const proportions = `${w}*${h}`;
	const horizontal = w > h;
	const vertical = h > w;
	const square = w === h;
	const right = isRight();
	const left = isLeft();
	const up = isUp();
	const down = isDown();
	const cellNum = countCellNum();

	function countCellNum() {
		let count = 0;
		b.forEach((r) =>
			r.forEach((c) => {
				if (c) count++;
			}),
		);

		return count;
	}

	function isRight() {
		let rightZeros = 0;
		let rigthOnes = 0;

		b.forEach((r) => (r[w - 1] === 0 ? rightZeros++ : rigthOnes++));

		return rightZeros >= rigthOnes;
	}

	function isLeft() {
		let leftZeros = 0;
		let leftOnes = 0;

		b.forEach((r) => (r[0] === 0 ? leftZeros++ : leftOnes++));

		return leftZeros >= leftOnes;
	}

	function isUp() {
		let upZeros = 0;
		let upOnes = 0;

		b[0].forEach((c) => (c === 0 ? upZeros++ : upOnes++));

		return upZeros >= upOnes;
	}

	function isDown() {
		let downZeros = 0;
		let downOnes = 0;

		b[h - 1].forEach((c) => (c === 0 ? downZeros++ : downOnes++));

		return downZeros >= downOnes;
	}

	return {
		w,
		h,
		proportions,
		horizontal,
		vertical,
		square,
		right,
		left,
		up,
		down,
		matrix: b,
		color,
		cellNum,
		shape,
	};
});
