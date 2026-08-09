import { BLOCKS } from "./consts/blocks.js";
import { drawBlocksToPickFromSection } from "./lib/drawBlocksToPickFromSection.js";
import { drawBoard } from "./lib/drawBoard.js";
import { set3randomBlocksToPick } from "./state/index.js";

// INIT GAME:
set3randomBlocksToPick();
drawBoard();
drawBlocksToPickFromSection();

console.log("blocks:", BLOCKS);

// blocks stats:
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((n) => {
	console.log(
		`blocks with ${n} cells: ${BLOCKS.filter((b) => b.cellNum === n).length}/${BLOCKS.length} (${((BLOCKS.filter((b) => b.cellNum === n).length / BLOCKS.length) * 100).toFixed()}%)`,
	);
});
