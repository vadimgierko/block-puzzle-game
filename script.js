import { BLOCKS } from "./consts/blocks.js";
import { drawBlocksToPickFromSection } from "./lib/drawBlocksToPickFromSection.js";
import { drawBoard } from "./lib/drawBoard.js";
import { initBoardObject } from "./lib/initBoardObject.js";
import { putBlockIntoBoard } from "./lib/putBlockIntoBoard.js";
import { board } from "./state/index.js";

drawBoard();

drawBlocksToPickFromSection();
