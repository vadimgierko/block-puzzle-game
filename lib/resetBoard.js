import { BOARD_CELLS, BOARD_EL } from "../state/index.js";
import { doesBlockFitTheBoard } from "./putBlockIntoBoard.js";

export function resetBoard() {
	console.log("reset board");

	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const CELL_EL = BOARD_CELLS[r][c];
			CELL_EL.style.backgroundColor = "";
		}
	}
}
