import {
	BLOCKS_TO_PICK_FROM_SECTION_EL,
	blocksToPickFrom,
	pickedBlockIndex,
	setPickedBlockIndex,
} from "../state/index.js";

export function drawBlocksToPickFromSection() {
	// clear prev blocks section:
	while (BLOCKS_TO_PICK_FROM_SECTION_EL.firstChild) {
		BLOCKS_TO_PICK_FROM_SECTION_EL.removeChild(
			BLOCKS_TO_PICK_FROM_SECTION_EL.firstChild,
		);
	}

	blocksToPickFrom.forEach((b, i) => {
		const BLOCK_DIV = document.createElement("div");
		BLOCK_DIV.style = "display: inline-block; margin: 0.5em";

		BLOCK_DIV.addEventListener("click", () => {
			console.log(i, "block clicked");
			setPickedBlockIndex(i);
			console.log(pickedBlockIndex);
			// alert(
			// 	"You've picked a block, now click the cell at the board which will be its' top left",
			// );
		});

		for (let r = 0; r < b.h; r++) {
			const ROW_EL = document.createElement("div");
			for (let c = 0; c < b.w; c++) {
				const CELL_EL = document.createElement("div");
				const basicCellStyle =
					"width: 40px; height: 40px; display: inline-block; border: 1px solid black;";
				const cellStyle = b.matrix[r][c]
					? basicCellStyle + " background-color: " + b.color
					: basicCellStyle;
				CELL_EL.style = cellStyle;
				ROW_EL.appendChild(CELL_EL);
			}
			BLOCK_DIV.appendChild(ROW_EL);
		}
		BLOCKS_TO_PICK_FROM_SECTION_EL.appendChild(BLOCK_DIV);
	});
}
