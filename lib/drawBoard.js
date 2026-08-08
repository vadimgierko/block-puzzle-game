import {
	blocksToPickFrom,
	board,
	BOARD_EL,
	pickedBlockCellCoords,
	pickedBlockIndex,
	setPickedCellCoords,
} from "../state/index.js";

export function drawBoard() {
	// clear prev board:
	while (BOARD_EL.firstChild) {
		BOARD_EL.removeChild(BOARD_EL.firstChild);
	}

	// Cancel dragover so that drop can fire
	BOARD_EL.addEventListener("dragover", (e) => {
		e.preventDefault();
	});

	let highlightedCells = [];
	function resetHighlightedCells() {
		highlightedCells.forEach((h) => (h.style.borderColor = "black"));
		highlightedCells = [];
	}
	// redraw board
	for (let r = 0; r < 8; r++) {
		const ROW_EL = document.createElement("div");
		ROW_EL.style = "margin: 0 auto";

		for (let c = 0; c < 8; c++) {
			const CELL_EL = document.createElement("div");
			// add id to cell:
			const basicCellStyle =
				"width: 40px; height: 40px; display: inline-block; border: 1px solid black;";
			const cellStyle = board[r][c].v
				? basicCellStyle + " background-color: " + board[r][c].color
				: basicCellStyle;
			CELL_EL.style = cellStyle;
			CELL_EL.setAttribute("id", "x:" + c + "y:" + r);
			// DRAG OVER THE CELL:
			CELL_EL.addEventListener("dragover", (e) => {
				e.preventDefault();

				resetHighlightedCells();
				//console.log("dragging");
				if (pickedBlockCellCoords && pickedBlockIndex !== undefined) {
					const block = blocksToPickFrom[pickedBlockIndex];

					const startX = c - pickedBlockCellCoords.x;
					const startY = r - pickedBlockCellCoords.y;

					for (let y = 0; y < block.h; y++) {
						for (let x = 0; x < block.w; x++) {
							if (block.matrix[y][x]) {
								const highlightenedCell = document.getElementById(
									`x:${x + c}y:${y + r}`,
								);

								if (highlightenedCell) {
									highlightenedCell.style.borderColor = "yellow";
									highlightedCells.push(highlightenedCell);
								}
							}
						}
					}
				}
			});
			CELL_EL.addEventListener("dragleave", (e) => {
				e.preventDefault();
				//console.log("dragging");
				CELL_EL.style.borderColor = "black";
			});

			CELL_EL.addEventListener("drop", (e) => {
				e.preventDefault();
				//console.log("dragging");
				CELL_EL.style.borderColor = "black";
				setPickedCellCoords({ x: c, y: r });
				resetHighlightedCells();
			});

			ROW_EL.appendChild(CELL_EL);
		}
		// updated board el
		BOARD_EL.appendChild(ROW_EL);
	}

	console.log("drawBoard:", board);
}
