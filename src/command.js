import {
  getDirectionName,
  getNewDirection,
  getNewCoordinate,
  isValidDirection,
  isValidCoordinate,
} from './direction.js';
import { info, success, error } from './message.js';

/**
 * Check if the command on the first round is PLACE X,Y,D
 * @param {int} round - indicates the number of round
 * @param {string} command - Command entered by the user from terminal
 */

const isInvalidFirstCommand = (round, command) => {
  
  return round === 0 && /PLACE\s\S{5}/.test(command) === false;
};

/**
 * check if the command recieved from user is valid on a specificied pattern
 * @param{string} command - The command that is typed by the user
 */
const isInvalidCommand = command => {
  return /PLACE\s\S{5}|MOVE|LEFT|RIGHT|REPORT/.test(command) === false;
};

/**
 * Check if the user typed command matches with the specified command
 * @param{string} type - the command to be verified
 * @param {string} command - the command that is entered by the user
 */

const isCommandTypeOf = (type, command) => {
  switch (type) {
    case 'PLACE':
      return /PLACE\s\S{5}/.test(command);
    default:
      return type === command;
  }
};

/**
 * check if command recieved is valid and eligible
 * @param {int} round- indicates the number of round
 * @param {string} command - command typed by user
 */
const isValidCommand = (round, command) => {
  let isValid = true;
  //valid user input
  if (isInvalidFirstCommand(round, command)) {
    if (process.env.NODE_ENV !== 'test') {
      error(
        'The first command should be "PLACE <x-coordinate>,<y-coordinate>,<direction>"'
      );
    }
    isValid = false;
  } else if (isInvalidCommand(command)) {
    if (process.env.NODE_ENV !== 'test') {
      notification.error(
        'Please enter a valid command: PLACE, MOVE, LEFT, RIGHT, REPORT'
      );
    }
    isValid = false;
  }

  return isValid;
};

/**
 * Execute the command PLACE, MOVE, LEFT, RIGHT, REPORT
 * @param {string} command- command typed by the user
 * @param {array} coordinate - X and Y coordinate
 * @param {string} direction - direction N(North) , S(SOUTH), E(East),W(West)
 */

const executeCommand = (command, coordinate = null, direction = null) => {
  switch (true) {
    case /PLACE\s\S{5}/.test(command):
      let subCommand = command.split(' ')[1]; //take the second portion of the command separated by space
      let separateSubCommand = subCommand.split(','); // separate the coordinates and direction
      let newXcoordinate = separateSubCommand[0];
      let newYcoordinate = separateSubCommand[1];
      let newDirection = separateSubCommand[2];

      let isValid =
      isValidCoordinate([newXcoordinate, newYcoordinate]) &&
        isValidDirection(newDirection);
      return [
        parseInt(newXcoordinate),
        parseInt(newYcoordinate),
        newDirection,
        isValid,
      ];
    case command === 'MOVE':
      let tempCoordinate = coordinate.slice(0);
      let newCoordinate = getNewCoordinate(tempCoordinate, direction);
      let isValidCoordinates = isValidCoordinate(newCoordinate);
      if (isValidCoordinates) {
        coordinate = newCoordinate;
      }
      break;
    case command === 'LEFT':
      direction = getNewDirection(direction, command);
      break;
    case command === 'RIGHT':
      direction = getNewDirection(direction, command);
      break;
    case command === 'REPORT':
      let result =
        coordinate[0] + ',' + coordinate[1] + ',' + getDirectionName(direction);
      if (process.env.NODE_ENV !== 'test') {
        success(`/n Current position of the toy robot is: ${result}\n`);
        info('You may now resume typing other commands below: \n');
      } else {
        return result;
      }
  }
  return [coordinate, direction];
};

export {
  isInvalidCommand,
  isInvalidFirstCommand,
  isCommandTypeOf,
  isValidCommand,
  executeCommand,
};
