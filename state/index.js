import { BLOCKS } from "../consts/blocks.js";
import { drawBlocksToPickFromSection } from "../lib/drawBlocksToPickFromSection.js";
import { drawBoard } from "../lib/drawBoard.js";
import { getRandomInt } from "../lib/getRandomInt.js";
import { initBoardObject } from "../lib/initBoardObject.js";
import { putBlockIntoBoard } from "../lib/putBlockIntoBoard.js";

// HTML STATE
export const BOARD_EL = document.getElementById("board");
export const BLOCKS_TO_PICK_FROM_SECTION_EL = document.getElementById("blocks");
export const SCORE_EL = document.getElementById("score");
export const RESER_BTN = document.getElementById("reset");

RESER_BTN.addEventListener("click", resetState);

// JS STATE
export let score = 0;
/**
 * @param {number} points
 */
export function setScore(points) {
	score += points;
	SCORE_EL.textContent = score;
}
/**
 * {{ v: 0 | 1; color?: string }[]}
 */
export let board = initBoardObject();
export let blocksToPickFrom = [];
// console.log("blocksToPickFrom", blocksToPickFrom);
export function set3randomBlocksToPick() {
	const randomNums = [];

	for (let i = 0; i < 3; i++) {
		const randomNum = getRandomInt(BLOCKS.length);
		randomNums.push(randomNum);
	}

	const blocks = [];
	randomNums.forEach((n) => blocks.push(structuredClone(BLOCKS[n])));

	blocksToPickFrom = blocks;
	//return blocks;
}
/** `undefined` or `number` */
export let pickedBlockIndex = undefined; // undefined as an init value, so in the beginning of the game clicking the board accidentally will not place a block there
/**
 * @param {number} index
 */
export function setPickedBlockIndex(index) {
	pickedBlockIndex = index;
}

/** `undefined` or `{ x: number, y: number }` */
export let pickedCellCoords = undefined; // undefined as an init value, so in the beginning of the game clicking the board accidentally will not place a block there
/**
 *
 * @param {{ x: number, y: number }} coords
 * @returns void
 */
export function setPickedCellCoords(coords) {
	if (!coords) return alert("No cell coords!");
	if (pickedBlockIndex === undefined) return; // if the cell is clicked, but no block is picked

	pickedCellCoords = coords;
	console.log(pickedCellCoords);

	putBlockIntoBoard(pickedCellCoords, blocksToPickFrom[pickedBlockIndex]);

	// reset state:
	pickedBlockIndex = undefined;
	pickedCellCoords = undefined;
}

function resetState() {
	score = 0;
	board = initBoardObject();
	set3randomBlocksToPick();
	pickedBlockIndex = undefined;
	pickedCellCoords = undefined;

	drawBoard();
	drawBlocksToPickFromSection();
	SCORE_EL.textContent = score;
}
