import {
	blocksToPickFrom,
	board,
	BOARD_EL,
	pickedBlockCellCoords,
	pickedBlockIndex,
	setPickedCellCoords,
} from "../state/index.js";

export function initBoard() {
	// init board:
	console.log("init board");

	for (let r = 0; r < 8; r++) {
		const ROW_EL = document.createElement("div");
		ROW_EL.setAttribute("class", "row");
		ROW_EL.setAttribute("id", "r" + r);

		for (let c = 0; c < 8; c++) {
			const CELL_EL = document.createElement("div");
			CELL_EL.setAttribute("class", "col");
			CELL_EL.setAttribute("id", "x:" + c + "y:" + r);

			// DRAG OVER THE CELL:
			CELL_EL.addEventListener("dragover", (e) => {
				e.preventDefault();

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
									// console.log("dragover: add highlighted class");
									highlightenedCell.classList.add("highlighted");
								}
							}
						}
					}
				}
			});
			CELL_EL.addEventListener("dragleave", (e) => {
				e.preventDefault();

				// console.log("dragleave: remove highlighted class");
				//CELL_EL.classList.remove("highlighted");
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
									// console.log("dragover: add highlighted class");
									highlightenedCell.classList.remove("highlighted");
								}
							}
						}
					}
				}
			});

			CELL_EL.addEventListener("drop", (e) => {
				e.preventDefault();

				// console.log("drop: remove highlighted class");
				//CELL_EL.classList.remove("highlighted");
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
									// console.log("dragover: add highlighted class");
									highlightenedCell.classList.remove("highlighted");
								}
							}
						}
					}
				}

				setPickedCellCoords({ x: c, y: r });
			});

			ROW_EL.appendChild(CELL_EL);
		}
		// updated board el
		BOARD_EL.appendChild(ROW_EL);
	}

	console.log("initBoard:", board);
}
