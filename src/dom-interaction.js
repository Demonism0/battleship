const Dom = (() => {
  let rot = 'v';
  document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      if (rot === 'v') {
        rot = 'h';
      } else {
        rot = 'v';
      }
    }
  });

  const modelFour = document.querySelector('.four');
  const modelThree = document.querySelectorAll('.three');
  const modelTwo = document.querySelectorAll('.two');
  const modelOne = document.querySelectorAll('.one');

  let shipLength = 4;

  modelFour.addEventListener('click', () => {
    shipLength = 4;
  });
  for (let i = 0; i < modelThree.length; i += 1) {
    modelThree[i].addEventListener('click', () => {
      shipLength = 3;
    });
  }
  for (let i = 0; i < modelTwo.length; i += 1) {
    modelTwo[i].addEventListener('click', () => {
      shipLength = 2;
    });
  }
  for (let i = 0; i < modelOne.length; i += 1) {
    modelOne[i].addEventListener('click', () => {
      shipLength = 1;
    });
  }

  function hoverEffect(coords, tiles) {
    const [row, col] = coords;
    if (rot === 'h') {
      for (let i = 0; i < shipLength; i += 1) {
        if (col + i < 10) {
          const domCell = tiles[`row${row}`][`col${col + i}`].getDomCell();
          domCell.classList.add('highlight');
        }
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        if (row + i < 10) {
          const domCell = tiles[`row${row + i}`][`col${col}`].getDomCell();
          domCell.classList.add('highlight');
        }
      }
    }
  }
  function removeHoverEffect(coords, tiles) {
    const [row, col] = coords;
    if (rot === 'h') {
      for (let i = 0; i < shipLength; i += 1) {
        if (col + i < 10) {
          const domCell = tiles[`row${row}`][`col${col + i}`].getDomCell();
          domCell.classList.remove('highlight');
        }
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        if (row + i < 10) {
          const domCell = tiles[`row${row + i}`][`col${col}`].getDomCell();
          domCell.classList.remove('highlight');
        }
      }
    }
  }

  function displayPlacedShip(coords, player) {
    const [row, col] = coords;
    if (rot === 'h') {
      if (col + shipLength - 1 < 10) {
        let hasOverlap = false;
        for (let i = 0; i < shipLength; i += 1) {
          const cell = player.playerBoard.tiles[`row${row}`][`col${col + i}`];
          if (cell.getShip()) {
            hasOverlap = true;
          }
        }
        if (!hasOverlap) {
          if (player.canBePlaced(shipLength)) {
            player.playerBoard.placeShip(shipLength, coords, rot);
            for (let i = 0; i < shipLength; i += 1) {
              const domCell = player.playerBoard.tiles[`row${row}`][`col${col + i}`].getDomCell();
              domCell.classList.add('placed');
            }
          }
        }
      }
    } else if (row + shipLength - 1 < 10) {
      let hasOverlap = false;
      for (let i = 0; i < shipLength; i += 1) {
        const cell = player.playerBoard.tiles[`row${row + i}`][`col${col}`];
        if (cell.getShip()) {
          hasOverlap = true;
        }
      }
      if (!hasOverlap) {
        if (player.canBePlaced(shipLength)) {
          player.playerBoard.placeShip(shipLength, coords, rot);
          for (let i = 0; i < shipLength; i += 1) {
            const domCell = player.playerBoard.tiles[`row${row + i}`][`col${col}`].getDomCell();
            domCell.classList.add('placed');
          }
        }
      }
    }
  }
  const createPlayerBoard = (player) => {
    const newBoard = document.querySelector('#playerboard');
    newBoard.innerHTML = '';
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        const cell = player.playerBoard.tiles[`row${row}`][`col${col}`];
        const newCell = document.createElement('div');
        newCell.setAttribute('class', 'cell');
        newBoard.appendChild(newCell);
        cell.insertDomCell(newCell);

        newCell.addEventListener('mouseover', () => {
          if (!player.allShipsPlaced()) {
            hoverEffect([row, col], player.playerBoard.tiles);
          }
        });

        newCell.addEventListener('mouseout', () => {
          removeHoverEffect([row, col], player.playerBoard.tiles);
        });

        newCell.addEventListener('click', () => {
          displayPlacedShip([row, col], player);
        });
      }
    }
  };

  const createComputerBoard = (player) => {
    const dialog = document.querySelector('dialog');
    dialog.close();

    const newBoard = document.querySelector('#computerboard');
    newBoard.innerHTML = '';
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        const cell = player.computerBoard.tiles[`row${row}`][`col${col}`];
        const newCell = document.createElement('div');
        newCell.setAttribute('class', 'cell');
        newBoard.appendChild(newCell);
        cell.insertDomCell(newCell);

        newCell.addEventListener('click', () => {
          if (player.checkTurn() && player.allShipsPlaced()) {
            if (!cell.checkAttack()) {
              player.attack([row, col]);
            }
          }
        });
      }
    }
  };

  const updateCell = (cell) => {
    const domCell = cell.getDomCell();
    if (cell.getShip()) {
      domCell.classList.add('hit');
    } else {
      domCell.classList.add('miss');
    }
  };

  const announceWinner = (win) => {
    const dialog = document.querySelector('dialog');
    const winner = document.querySelector('#winner');
    if (win) {
      winner.textContent = 'Congratulations! You have won!';
    } else {
      winner.textContent = 'Sorry, computer won!';
    }
    dialog.showModal();
  };

  return {
    createPlayerBoard, createComputerBoard, updateCell, announceWinner,
  };
})();

export default Dom;
