import { BOARD_HEIGHT, BOARD_WIDTH } from "../consts/index.js";

/**
 *
 * @returns {{ v: 0 | 1 }[]}
 */
export function initBoardObject() {
	const BOARD = [];

	for (let r = 0; r < BOARD_HEIGHT; r++) {
		BOARD[r] = [];

		for (let c = 0; c < BOARD_WIDTH; c++) {
			BOARD[r][c] = { v: 0 };
		}
	}

	console.log("initBoard:", BOARD);

	return BOARD;
}
