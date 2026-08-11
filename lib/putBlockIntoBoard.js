import { BLOCKS } from "../consts/blocks.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../consts/index.js";
import {
	BLOCKS_TO_PICK_FROM_SECTION_EL,
	blocksToPickFrom,
	board,
	pickedBlockIndex,
	setScore,
	set3randomBlocksToPick,
	score,
} from "../state/index.js";
import { drawBlocksToPickFromSection } from "./drawBlocksToPickFromSection.js";
import { drawBoard } from "./drawBoard.js";

/**
 * @param {{ x: number, y: number }} topLeftCoords 
 * @param {{
    w: number;
    h: number;
    matrix: number[][];
    color: string;
}[]} BLOCK 
 * @returns void
 */
export function putBlockIntoBoard(topLeftCoords, BLOCK) {
	if (!topLeftCoords || !BLOCK) return alert("!topLeftCoords || !BLOCK");

	if (!doesBlockFitTheBoard(topLeftCoords, BLOCK)) return;
	if (isColliding(topLeftCoords, BLOCK)) return;

	let pointsToAdd = 0;
	// put a block
	for (let r = 0; r < BLOCK.h; r++) {
		for (let c = 0; c < BLOCK.w; c++) {
			if (
				board[topLeftCoords.y + r][topLeftCoords.x + c].v === 0 &&
				BLOCK.matrix[r][c]
			) {
				//===================== put a block finally ==========================//
				board[topLeftCoords.y + r][topLeftCoords.x + c].v = BLOCK.matrix[r][c];

				board[topLeftCoords.y + r][topLeftCoords.x + c].color = BLOCK.color;

				pointsToAdd++;
			}
		}
	}

	drawBoard();
	setScore(pointsToAdd);

	// remove block from blocks section:
	blocksToPickFrom.splice(pickedBlockIndex, 1);
	// if all blocks are picked, replace the section with the new ones:
	if (!blocksToPickFrom.length) {
		console.log("no blocks left");
		set3randomBlocksToPick();
	}
	drawBlocksToPickFromSection();

	/** {x: number; y: number} */
	const cellsToPopCoords = [];

	// check full rows to pop:
	const rowsToPopIndexes = [];

	for (let r = 0; r < BOARD_HEIGHT; r++) {
		if (board[r].every((c, i) => c.v === 1)) {
			rowsToPopIndexes.push(r);
			for (let c = 0; c < BOARD_WIDTH; c++) {
				cellsToPopCoords.push({ x: c, y: r });
			}
		}
	}

	// check full cols to pop:
	const colsToPopIndexes = [];

	for (let c = 0; c < BOARD_WIDTH; c++) {
		let columnToPop = true;
		for (let r = 0; r < BOARD_HEIGHT; r++) {
			if (board[r][c].v === 0) columnToPop = false;
		}
		if (columnToPop) {
			colsToPopIndexes.push(c);
			for (let r = 0; r < BOARD_HEIGHT; r++) {
				cellsToPopCoords.push({ x: c, y: r });
			}
		}
	}

	if (rowsToPopIndexes.length || colsToPopIndexes.length) {
		// add 🔥 to cells to pop:
		const CELLS_TO_POP_ELS = [];
		cellsToPopCoords.forEach((coords) =>
			CELLS_TO_POP_ELS.push(
				document.getElementById("x:" + coords.x + "y:" + coords.y),
			),
		);
		CELLS_TO_POP_ELS.forEach((el) => {
			el.textContent = "🔥";
			//el.style = "background-color: orange";
		});
		// pop after a second
		setTimeout(() => {
			// pop full rows
			if (rowsToPopIndexes.length) {
				console.log("rows to pop:", rowsToPopIndexes, "board:", board);

				rowsToPopIndexes.forEach((r) =>
					board[r].forEach((c) => {
						c.v = 0;
						delete c.color;
					}),
				);
			}

			// pop full cols
			if (colsToPopIndexes.length) {
				console.log("cols to pop:", colsToPopIndexes, "board:", board);

				colsToPopIndexes.forEach((c) => {
					for (let r = 0; r < BOARD_HEIGHT; r++) {
						board[r][c].v = 0;
						delete board[r][c].color;
					}
				});
			}

			// remove 🔥
			CELLS_TO_POP_ELS.forEach((el) => {
				el.textContent = "";
				//el.style = "background-color: orange";
			});

			setScore(rowsToPopIndexes.length * 8 + colsToPopIndexes.length * 8);

			drawBoard();
		}, 1000);
	}
}

/**
 * 
 * @param {{ x: number, y: number }} topLeftCoords 
 * @param {{
    w: number;
    h: number;
    matrix: number[][];
    color: string;
}[]} BLOCK 
 * @returns boolean
 */
export function doesBlockFitTheBoard(topLeftCoords, BLOCK) {
	if (
		topLeftCoords.x < 0 ||
		topLeftCoords.x + BLOCK.w > BOARD_WIDTH ||
		topLeftCoords.y < 0 ||
		topLeftCoords.y + BLOCK.h > BOARD_HEIGHT
	) {
		console.error("The block doesn't fit the board...");
		return false;
	}

	return true;
}

/**
 * 
 * @param {{ x: number, y: number }} topLeftCoords 
 * @param {{
    w: number;
    h: number;
    matrix: number[][];
    color: string;
}[]} BLOCK 
 * @returns boolean
 */
function isColliding(topLeftCoords, BLOCK) {
	for (let r = 0; r < BLOCK.h; r++) {
		for (let c = 0; c < BLOCK.w; c++) {
			if (
				board[topLeftCoords.y + r][topLeftCoords.x + c].v &&
				BLOCK.matrix[r][c]
			) {
				console.error("collision...");
				return true;
			}
		}
	}

	return false;
}
