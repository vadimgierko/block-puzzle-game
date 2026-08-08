import { BLOCKS } from "../consts/blocks.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../consts/index.js";
import {
	BLOCKS_TO_PICK_FROM_SECTION_EL,
	blocksToPickFrom,
	board,
	pickedBlockIndex,
	setScore,
	set3randomBlocksToPick,
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
	for (let i = 0; i < BLOCK.w; i++) {
		for (let j = 0; j < BLOCK.h; j++) {
			// color only non-occupied cells & only if there is a value of the cell in the block:
			if (
				board[topLeftCoords.y + i][topLeftCoords.x + j].v === 0 &&
				BLOCK.matrix[i][j]
			) {
				//===================== put a block finally ==========================//
				board[topLeftCoords.y + i][topLeftCoords.x + j].v = BLOCK.matrix[i][j];

				board[topLeftCoords.y + i][topLeftCoords.x + j].color = BLOCK.color;

				pointsToAdd++;
			}
		}
	}

	drawBoard();

	// remove block from blocks section:
	blocksToPickFrom.splice(pickedBlockIndex, 1);

	// check full rows to pop:
	const rowsToPopIndexes = [];

	for (let r = 0; r < BOARD_HEIGHT; r++) {
		if (board[r].every((c) => c.v === 1)) rowsToPopIndexes.push(r);
	}

	// check full cols to pop:
	const colsToPopIndexes = [];

	for (let c = 0; c < BOARD_WIDTH; c++) {
		let columnToPop = true;
		for (let r = 0; r < BOARD_HEIGHT; r++) {
			if (board[r][c].v === 0) columnToPop = false;
		}
		if (columnToPop) colsToPopIndexes.push(c);
	}

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

	setScore(
		pointsToAdd + rowsToPopIndexes.length * 8 + colsToPopIndexes.length * 8,
	);

	// if all blocks are picked, replace the section with the new ones:
	if (!blocksToPickFrom.length) {
		console.log("no blocks left");
		set3randomBlocksToPick();
	}

	drawBoard();
	drawBlocksToPickFromSection();
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
function doesBlockFitTheBoard(topLeftCoords, BLOCK) {
	// check if the block fits the board itself:
	if (topLeftCoords.x + BLOCK.w > BOARD_WIDTH) {
		console.error("The block is too wide and doesn't fit the board...");
		return false;
	}

	if (topLeftCoords.y + BLOCK.h > BOARD_HEIGHT) {
		console.error("The block is too high and doesn't fit the board...");
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
	for (let i = 0; i < BLOCK.w; i++) {
		for (let j = 0; j < BLOCK.h; j++) {
			if (
				board[topLeftCoords.y + i][topLeftCoords.x + j].v &&
				BLOCK.matrix[i][j]
			) {
				console.error("collision...");
				return true;
			}
		}
	}

	return false;
}
