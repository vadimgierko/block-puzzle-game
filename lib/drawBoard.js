import {
	blocksToPickFrom,
	board,
	BOARD_CELLS,
	BOARD_EL,
	pickedBlockCellCoords,
	pickedBlockIndex,
	setPickedCellCoords,
} from "../state/index.js";

/**
 * redraw the board with the new blocks state after `initBoard()`
 */
export function drawBoard() {
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const CELL_EL = BOARD_CELLS[r][c]; // document.getElementById("x:" + c + "y:" + r);

			CELL_EL.style.backgroundColor = board[r][c].v ? board[r][c].color : "";
		}
	}

	console.log("drawBoard:", board);
}
