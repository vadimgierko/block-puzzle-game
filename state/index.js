import { BLOCKS } from "../consts/blocks.js";
import { initBoardObject } from "../lib/initBoardObject.js";
import { putBlockIntoBoard } from "../lib/putBlockIntoBoard.js";

// HTML STATE
export const BOARD_EL = document.getElementById("board");
export const BLOCKS_TO_PICK_FROM_SECTION_EL = document.getElementById("blocks");

// JS STATE
export let board = initBoardObject();
export let blocksToPickFrom = structuredClone(BLOCKS);

export let pickedBlockIndex = undefined; // undefined as an init value, so in the beginning of the game clicking the board accidentally will not place a block there
export function setPickedBlockIndex(index) {
	pickedBlockIndex = index;
}

export let pickedCellCoords = undefined; // undefined as an init value, so in the beginning of the game clicking the board accidentally will not place a block there
export function setPickedCellCoords(coords = { x: 0, y: 0 }) {
	if (pickedBlockIndex === undefined) return; // if the cell is clicked, but no block is picked

	pickedCellCoords = coords;
	console.log(pickedCellCoords);

	putBlockIntoBoard(pickedCellCoords, blocksToPickFrom[pickedBlockIndex]);

	// reset state:
	pickedBlockIndex = undefined;
	pickedCellCoords = undefined;
}
