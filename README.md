# Block Puzzle Game (under development)

Online web game 🎮, where user should put 3 random blocks 🧱 per move into the board and when a row or a column is full it pops up 🔥.

## Tech Stack

- ### JavaScript
  Good Old Vanilla JavaScript... It's so refreshing to write this kind of code after so many years of using React & TypeScript - totally `framework-and-spaghetti-code-free` 😍
- ### HTML
- ### CSS
- ### ~~AI~~

## Issues / Problems

### General
- fix blocks to pick section to create and then remove nodes along with the listeners
- think of how to use rotatable & mirrorable props for blocks and derived blocks state

### Web

### Mobile
- the dragged block is centered under the finger, so it's hard to place it, becuase the block is put on the board under finger, but this is top-left corner of the block, not the center... => use `isMobile()` and if true offset block 1/2 left-top:
  ```js
  export function isMobile() {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      console.log("Mobile device detected");
      return true;
    }

    console.log("Desktop device detected");
    return false;
  }
  ```
  - 💡 in similar mobile game, when block is picked it appears and moves 1 cm above the finger and its "shadow" shows almost precisely under the dragged block

## TODO 🚀
- expand README (and add pages) with reasons for tech stack, why built (rebuilt with changes) the game
- add "redo" button - remove the last block from the board and put it back to blocks to pick
- save last record on the device (so need to check if the current result is a new record or not)
  - if there will be different settings (~levels) enabled, store records for each of them
- improve styles & RWD 😜
- add settings page as a separate HTML page/route
  - store them in local storage, so it is accessible for any route
  - store prev game state in local storage to be able to continue last game
  - enable vast settings (each setting is a-la level):
    - the pull of blocks and their configurations
    - board size?
- maybe add some predefined level based on blocks configurations OR/AND level up when user achieves some good results at current level
- store game/s history in local storage and:
  - enable rewatching a game step by step to analize strategy, bad choices
  - make a tutorial, how to build the game (article/course/video)

