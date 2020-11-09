import expect from 'expect';
import {
  executeCommand,
  isInvalidCommand,
  isInvalidFirstCommand,
} from './command.js';

before(() => {
  process.env.NODE_ENV = 'test';
});

it('should not change the initial coordinate and direction that will make the robot fall of the table', () => {
  let command = 'MOVE';
  let initialCoordinate = [0, 0];
  let initialDirection = 'S';

  let output = executeCommand(command, initialCoordinate, initialDirection);
  let newCoordinate = output[0];
  let newDirection = output[1];

  expect(newCoordinate).toEqual(initialCoordinate);
  expect(newDirection).toEqual(initialDirection);
});

it('should get valid command text( PLACE *,*,S, MOVE,LEFT,RIGHT,REPORT)', () => {
  let validCommands = ['PLACE 1,2,N', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
  let invalidCommands = ['HELLO', 'MATE', 'THANKS'];

  validCommands.map(validCommand => {
    expect(isInvalidCommand(validCommand)).toBeFalsy();
  });
  invalidCommands.map(invalidCommand => {
    expect(isInvalidCommand(invalidCommand)).toBeTruthy();
  });
});

it('should receive PLACE command for first round', () => {
  let round = 0;
  let validCommand = 'PLACE 1,1,S';
  let invalidCommand = 'LEFT';

  expect(isInvalidFirstCommand(round, validCommand)).toBeFalsy();
  expect(isInvalidFirstCommand(round, invalidCommand)).toBeTruthy();
});

it('PLACE should place the robot at the given location', () => {
  let command = 'PLACE 1,2,N';
  let expectedCoordinateX = 1;
  let expectedCoordinateY = 2;
  let expectedDirection = 'N';
  let expectedIndicator = true;
  let result = executeCommand(command);

  let placedCoordinateX = result[0];
  let placedCoordinateY = result[1];
  let placedDirection = result[2];
  let isValid = result[3];

  expect(placedCoordinateX).toEqual(expectedCoordinateX);
  expect(placedCoordinateY).toEqual(expectedCoordinateY);
  expect(placedDirection).toEqual(expectedDirection);
  expect(isValid).toEqual(expectedIndicator);
});

it('MOVE should move the robot one unit on the given direction', () => {
  let command = 'MOVE';
  let initialCoordinate = [0, 0];
  let initialDirection = 'E';
  let expectedCoordinate = [1, 0];
  let expectedDirection = 'E';

  let result = executeCommand(command, initialCoordinate, initialDirection);
  let newCoordinate = result[0];
  let newDirection = result[1];

  expect(newCoordinate).toEqual(expectedCoordinate);
  expect(newDirection).toEqual(expectedDirection);
});

it('left should turn robot to left side', () => {
  let command = 'LEFT';
  let initialCoordinate = [0, 0];
  let initialDirection = 'E';
  let expectedDirection = 'N';

  let result = executeCommand(command, initialCoordinate, initialDirection);
  let newDirection = result[1];

  expect(newDirection).toEqual(expectedDirection);
});

it('RIGHT should turn the toy robot to the right side', () => {
  let command = 'RIGHT';
  let initialCoordinate = [0, 0];
  let initialDirection = 'E';
  let expectedDirection = 'S';

  let result = executeCommand(command, initialCoordinate, initialDirection);
  let newDirection = result[1];

  expect(newDirection).toEqual(expectedDirection);
});

it('Report should print the correct output',() => {
    let command = 'REPORT';
  let coordinateX = 2;
  let coordinateY = 4;
  let direction = 'N';
  let expectedOutput = '2,4,NORTH';
  let output = executeCommand(command, [coordinateX, coordinateY], direction);
  expect(output).toEqual(expectedOutput);
})