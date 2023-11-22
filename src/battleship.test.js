import * as battleship from './battleship';

test('Ship object has length property', () => {
  expect(battleship.Ship(3)).toHaveProperty('length', 3);
});

test('Ship object has hit() function that increases number of hits', () => {
  const newShip = battleship.Ship(4);
  expect(newShip).toHaveProperty('hit');
  expect(newShip.hit()).toBe(1);
  expect(newShip.hit()).toBe(2);
});

test('Ship object has isSunk() function that calculates if ship is sunk', () => {
  const newShip = battleship.Ship(3);
  expect(newShip).toHaveProperty('isSunk');
  expect(newShip.isSunk()).toBeFalsy();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBeTruthy();
});

test('Gameboard class has tiles property', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard).toHaveProperty('tiles');
});

test('Gameboard tiles has rows', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard.tiles).toHaveProperty('row1');
  expect(newBoard.tiles).toHaveProperty('row7');
});

test('Gameboard rows have columns', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard.tiles.row2).toHaveProperty('col1');
  expect(newBoard.tiles.row9).toHaveProperty('col0');
});

test('Gameboard cells track information', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard.tiles.row4.col5).toHaveProperty('coords', [4, 5]);
  expect(newBoard.tiles.row4.col5.checkAttack()).toBeFalsy();
  expect(newBoard.tiles.row4.col5.getShip()).toBeFalsy();
});

test('Gameboard.placeShip() places a new Ship at specified coordinates', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard.tiles.row1.col4.getShip()).toBeFalsy();
  expect(newBoard.tiles.row2.col4.getShip()).toBeFalsy();
  expect(newBoard.tiles.row3.col4.getShip()).toBeFalsy();
  newBoard.placeShip(3, [1, 4]);
  expect(newBoard.tiles.row1.col4.getShip()).toBeTruthy();
  expect(newBoard.tiles.row2.col4.getShip()).toBeTruthy();
  expect(newBoard.tiles.row3.col4.getShip()).toBeTruthy();
});

test('Gameboard.placeShip() can place ships horizontally', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard.tiles.row1.col4.getShip()).toBeFalsy();
  expect(newBoard.tiles.row1.col5.getShip()).toBeFalsy();
  expect(newBoard.tiles.row3.col6.getShip()).toBeFalsy();
  newBoard.placeShip(3, [1, 4], 'h');
  expect(newBoard.tiles.row1.col4.getShip()).toBeTruthy();
  expect(newBoard.tiles.row2.col4.getShip()).toBeFalsy();
  expect(newBoard.tiles.row3.col4.getShip()).toBeFalsy();
  expect(newBoard.tiles.row1.col5.getShip()).toBeTruthy();
  expect(newBoard.tiles.row1.col6.getShip()).toBeTruthy();
});

test('Gameboard.receiveAttack() sends the hit function to the correct ship', () => {
  const newBoard = battleship.Gameboard();
  newBoard.placeShip(3, [1, 4]);
  const shipHere = newBoard.tiles.row1.col4.getShip();
  expect(shipHere.isSunk()).toBeFalsy();
  newBoard.receiveAttack([1, 4]);
  newBoard.receiveAttack([2, 4]);
  newBoard.receiveAttack([3, 4]);
  expect(shipHere.isSunk()).toBeTruthy();
});

test('Gameboard.receiveAttack() records the shots taken', () => {
  const newBoard = battleship.Gameboard();
  expect(newBoard.tiles.row1.col4.checkAttack()).toBeFalsy();
  newBoard.receiveAttack([1, 4]);
  expect(newBoard.tiles.row1.col4.checkAttack()).toBeTruthy();
});

test('Gameboard reports whether or not all of the ships have been sunk', () => {
  const newBoard = battleship.Gameboard();
  newBoard.placeShip(2, [1, 4]);
  newBoard.placeShip(1, [7, 7]);
  expect(newBoard.allSunk()).toBeFalsy();
  newBoard.receiveAttack([1, 4]);
  newBoard.receiveAttack([7, 7]);
  expect(newBoard.allSunk()).toBeFalsy();
  newBoard.receiveAttack([2, 4]);
  expect(newBoard.allSunk()).toBeTruthy();
});
