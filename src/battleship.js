function Ship(length) {
  let hits = 0;
  const hit = () => {
    hits += 1;
    return hits;
  };
  const isSunk = () => hits >= length;
  return { length, hit, isSunk };
}

function Gameboard() {
  function generateCell(row, col) {
    const coords = [row, col];

    let isAttacked = false;
    const checkAttack = () => isAttacked;
    const attackHere = () => {
      isAttacked = true;
    };

    let shipHere;
    const getShip = () => shipHere;
    const addShip = (newShip) => {
      shipHere = newShip;
    };

    return {
      coords, checkAttack, attackHere, getShip, addShip,
    };
  }
  function generateCols(row) {
    const col0 = generateCell(row, 0);
    const col1 = generateCell(row, 1);
    const col2 = generateCell(row, 2);
    const col3 = generateCell(row, 3);
    const col4 = generateCell(row, 4);
    const col5 = generateCell(row, 5);
    const col6 = generateCell(row, 6);
    const col7 = generateCell(row, 7);
    const col8 = generateCell(row, 8);
    const col9 = generateCell(row, 9);

    return {
      col0, col1, col2, col3, col4, col5, col6, col7, col8, col9,
    };
  }
  function generateRows() {
    const row0 = generateCols(0);
    const row1 = generateCols(1);
    const row2 = generateCols(2);
    const row3 = generateCols(3);
    const row4 = generateCols(4);
    const row5 = generateCols(5);
    const row6 = generateCols(6);
    const row7 = generateCols(7);
    const row8 = generateCols(8);
    const row9 = generateCols(9);

    return {
      row0, row1, row2, row3, row4, row5, row6, row7, row8, row9,
    };
  }
  const tiles = generateRows();

  const shipArray = [];

  const placeShip = (length, coords, rot = 'v') => {
    const newShip = Ship(length, coords);
    shipArray.push(newShip);
    const [row, col] = coords;
    for (let i = 0; i < length; i += 1) {
      if (rot === 'h') {
        tiles[`row${row}`][`col${col + i}`].addShip(newShip);
      } else {
        tiles[`row${row + i}`][`col${col}`].addShip(newShip);
      }
    }
  };

  const receiveAttack = (coords) => {
    const [row, col] = coords;
    const shipHere = tiles[`row${row}`][`col${col}`].getShip();
    if (shipHere) shipHere.hit();
    tiles[`row${row}`][`col${col}`].attackHere();
  };

  const allSunk = () => {
    for (let i = 0; i < shipArray.length; i += 1) {
      if (!shipArray[i].isSunk()) return false;
    }
    return true;
  };

  return {
    tiles, placeShip, receiveAttack, allSunk,
  };
}

export { Ship, Gameboard };
