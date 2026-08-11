import { BLOCKS } from "../consts/blocks.js";
import { drawBlocksToPickFromSection } from "../lib/drawBlocksToPickFromSection.js";
import { getRandomInt } from "../lib/getRandomInt.js";
import { initBoard } from "../lib/initBoard.js";
import { initBoardObject } from "../lib/initBoardObject.js";
import { putBlockIntoBoard } from "../lib/putBlockIntoBoard.js";
import { resetBoard } from "../lib/resetBoard.js";

// HTML STATE
export const BOARD_EL = document.getElementById("board");
// Cancel dragover so that drop can fire
BOARD_EL.addEventListener("dragover", (e) => {
	e.preventDefault();
});

export const BOARD_CELLS = [];

export const BLOCKS_TO_PICK_FROM_SECTION_EL = document.getElementById("blocks");

export const SCORE_EL = document.getElementById("score");

export const RESER_BTN = document.getElementById("reset");
RESER_BTN.addEventListener("click", resetState);

const RESET_BLOCKS_TO_PICK_BTN = document.getElementById("reset-blocks");
RESET_BLOCKS_TO_PICK_BTN.addEventListener("click", () => {
	set3randomBlocksToPick();
	drawBlocksToPickFromSection();
});

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
	// ADJUST PERCENTAGE OF 1-3-CELL BLOCKS TO BE EQUAL:
	const BLOCKS_ADJUSTED = [];
	BLOCKS.forEach((b) => {
		if (b.cellNum === 1) {
			for (let i = 0; i < 25; i++) {
				BLOCKS_ADJUSTED.push(structuredClone(b));
			}
		} else if (b.cellNum === 2) {
			for (let i = 0; i < 12; i++) {
				BLOCKS_ADJUSTED.push(structuredClone(b));
			}
		} else if (b.cellNum === 3) {
			for (let i = 0; i < 4; i++) {
				BLOCKS_ADJUSTED.push(structuredClone(b));
			}
		} else {
			BLOCKS_ADJUSTED.push(structuredClone(b));
		}
		// b.cellNum === 7 || b.cellNum === 8 || b.cellNum === 9
	});
	// adjusted blocks with 1 cells: 25/129 (19%)
	// adjusted blocks with 2 cells: 24/129 (19%)
	// adjusted blocks with 3 cells: 24/129 (19%)
	// adjusted blocks with 4 cells: 23/129 (18%)
	// adjusted blocks with 5 cells: 25/129 (19%)
	// adjusted blocks with 6 cells: 0/129 (0%)
	// adjusted blocks with 7 cells: 6/129 (5%) ⁉️ => should this be adjusted too ⁉️
	// adjusted blocks with 8 cells: 1/129 (1%) ⁉️ => should this be adjusted too ⁉️
	// adjusted blocks with 9 cells: 1/129 (1%) ⁉️ => should this be adjusted too ⁉️

	// adjusted blocks stats:
	// [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((n) => {
	// 	console.log(
	// 		`adjusted blocks with ${n} cells: ${BLOCKS_ADJUSTED.filter((b) => b.cellNum === n).length}/${BLOCKS_ADJUSTED.length} (${((BLOCKS_ADJUSTED.filter((b) => b.cellNum === n).length / BLOCKS_ADJUSTED.length) * 100).toFixed()}%)`,
	// 	);
	// });

	const randomNums = [];

	for (let i = 0; i < 3; i++) {
		const randomNum = getRandomInt(BLOCKS_ADJUSTED.length);
		randomNums.push(randomNum);
	}

	const blocks = [];
	randomNums.forEach((n) => blocks.push(BLOCKS_ADJUSTED[n]));

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
/** {x: number; y: number} or `number` */
export let pickedBlockCellCoords = undefined;
export function setPickedBlockCellCoords(c) {
	pickedBlockCellCoords = c;
	console.log("pickedBlockCellCoords", pickedBlockCellCoords);
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
	resetBoard();
	set3randomBlocksToPick();
	pickedBlockIndex = undefined;
	pickedCellCoords = undefined;
	pickedBlockCellCoords = undefined;
	drawBlocksToPickFromSection();
	SCORE_EL.textContent = score;
}
