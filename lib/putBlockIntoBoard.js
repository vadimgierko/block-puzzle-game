import { BLOCKS } from "../consts/blocks.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../consts/index.js";
import {
	BLOCKS_TO_PICK_FROM_SECTION_EL,
	blocksToPickFrom,
	board,
	pickedBlockIndex,
} from "../state/index.js";
import { drawBlocksToPickFromSection } from "./drawBlocksToPickFromSection.js";
import { drawBoard } from "./drawBoard.js";

export function putBlockIntoBoard(
	topLeftCoords = { x: 0, y: 0 },
	BLOCK = {
		w: 3,
		h: 3,
		matrix: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 1, 0],
		],
		color: "white",
	},
) {
	if (!doesBlockFitTheBoard(topLeftCoords, BLOCK)) return;
	if (isColliding(topLeftCoords, BLOCK)) return;

	// put a block
	for (let i = 0; i < BLOCK.w; i++) {
		for (let j = 0; j < BLOCK.h; j++) {
			// color only non-occupied cells:
			if (board[topLeftCoords.y + i][topLeftCoords.x + j].v === 0) {
				// ❗❗❗TODO: CHECK IF THE BLOCK DOESN'T COLLIDE WITH ANYTHING❗❗❗

				//===================== put a block finally ==========================//
				board[topLeftCoords.y + i][topLeftCoords.x + j].v = BLOCK.matrix[i][j];

				board[topLeftCoords.y + i][topLeftCoords.x + j].color = BLOCK.color;
			}
		}
	}

	// remove block from blocks section:
	blocksToPickFrom.splice(pickedBlockIndex, 1);

	// if all blocks are picked, replace the section with the new ones:
	// ❗❗❗TODO: RANDOM❗❗❗
	if (!blocksToPickFrom.length) {
		console.log("no blocks left");
		BLOCKS.forEach((b) => blocksToPickFrom.push(b));
	}

	drawBoard();
	drawBlocksToPickFromSection();
}

// helper functions:
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

function isColliding(topLeftCoords, BLOCK) {
	for (let i = 0; i < BLOCK.w; i++) {
		for (let j = 0; j < BLOCK.h; j++) {
			if (
				board[topLeftCoords.y + i][topLeftCoords.x + j].v === 1 &&
				BLOCK.matrix[i][j]
			) {
				console.error("collision...");
				return true;
			}
		}
	}

	return false;
}
