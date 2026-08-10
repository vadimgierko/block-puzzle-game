# Changelog

## implement init board func to set listeners add reset blocks btn

- split drawBoard into drawBoard & initBoard funcs and set listeners in initBoard to prevent
  - setting & adding listeners on every draw, what results in browser crush eventually
  - redrawing the entire board so many times
- add reset blocks to pick button
- fix home link

## adjust small blocks (1-3 cells) percentage for better gaming; add new shapes

- adjust small blocks (1-3 cells) percentage for better gaming
- add new shapes
- add derived blocks props for stats & future use: 
  - size (3*3, 3*2, 2*2, 2*1, 1*1)
  - cell num (1-9)
  - shape (square, I (line), Z, S, U, C, V, H, T, L, O, X, Y, +)
  - left/right
  - horizontal/vertical
  - up/down
- add changelog page

## implement basic drag and drop

## improve rows & cols popping and enable all blocks shapes
- set timeout to pop rows & cols & add fire emoji to them, so it is visible to the user
- fix placing blocks with not equal w and h
- add ids to every cell, so the element can be accessed

## enable first gameable experience with limited blocks options
- add remaining blocks to block schemas
- assign different random colors to blocks when game starts
- detect full rows & cols and pop them
- randomly choose 3 blocks per move
- implement scoring
- enable game reset

## Initial scaffold for block puzzle game
- constants (BOARD_WIDTH/HEIGHT and BLOCKS definitions)
- app state
- core library functions
- board initialization (initBoardObject)
- rendering (drawBoard, drawBlocksToPickFromSection)
- random helper (getRandomInt)
- block placement logic (putBlockIntoBoard) with fit/collision checks