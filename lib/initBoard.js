import { BOARD_CELLS, BOARD_EL, setPickedCellCoords } from "../state/index.js";
import { doesBlockFitTheBoard } from "./putBlockIntoBoard.js";

export function initBoard() {
	// init board:
	console.log("init board");

	for (let r = 0; r < 8; r++) {
		const ROW_EL = document.createElement("tr");
		ROW_EL.setAttribute("class", "row");
		ROW_EL.setAttribute("id", "r" + r);

		BOARD_CELLS[r] = [];

		for (let c = 0; c < 8; c++) {
			const CELL_EL = document.createElement("td");
			CELL_EL.setAttribute("class", "col");
			CELL_EL.setAttribute("id", "x:" + c + "y:" + r);

			BOARD_CELLS[r].push(CELL_EL);

			CELL_EL.addEventListener("drop", (e) => {
				e.preventDefault();

				setPickedCellCoords({ x: c, y: r });
			});

			ROW_EL.appendChild(CELL_EL);
		}
		// updated board el
		BOARD_EL.appendChild(ROW_EL);
	}
}
