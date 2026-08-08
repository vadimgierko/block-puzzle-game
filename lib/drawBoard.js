import { board, BOARD_EL, setPickedCellCoords } from "../state/index.js";

export function drawBoard() {
	// clear prev board:
	while (BOARD_EL.firstChild) {
		BOARD_EL.removeChild(BOARD_EL.firstChild);
	}

	// redraw board
	for (let r = 0; r < 8; r++) {
		const ROW_EL = document.createElement("div");
		ROW_EL.style = "margin: auto";

		for (let c = 0; c < 8; c++) {
			const CELL_EL = document.createElement("div");
			const basicCellStyle =
				"width: 40px; height: 40px; display: inline-block; border: 1px solid black;";
			const cellStyle = board[r][c].v
				? basicCellStyle + " background-color: " + board[r][c].color
				: basicCellStyle;
			CELL_EL.style = cellStyle;

			CELL_EL.addEventListener("click", () => {
				setPickedCellCoords({ x: c, y: r });
			});

			ROW_EL.appendChild(CELL_EL);
		}
		// updated board el
		BOARD_EL.appendChild(ROW_EL);
	}

	console.log("drawBoard:", board);
}
