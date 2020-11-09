import { info, success, error } from './message.js';

/**
 * Convert the long direction name into short form
 * @param string shortForm - The short form of direction (North/South/East/West)
 */

const getDirectionName = shortForm => {
  switch (shortForm) {
    case 'N':
      return 'NORTH';
    case 'S':
      return 'SOUTH';
    case 'E':
      return 'EAST';
    case 'W':
      return 'WEST';
  }
};

/**
 * get the current direction based on the command given
 * @param {string} currentDirection - The present direction of toy robot
 * @param {string} command - command typed by the user in console
 */

const getNewDirection = (currentDirection, command) => {
  const directions = ['N', 'E', 'S', 'W'];
  let currentDirectionIndex = directions.indexOf(currentDirection);

  switch (command) {
    case 'LEFT':
      currentDirectionIndex--;
      break;
    case 'RIGHT':
      currentDirectionIndex++;
      break;
  }

  if (currentDirectionIndex < 0) return 'W';
  if (currentDirectionIndex > 3) return 'N';

  return directions[currentDirectionIndex];
};

/**
 * Get a new co-ordinate after moving one unit towards the direction that robot is facing
 *
 * @param {array} currentCoordinate - current X and Y coordinate of toy robot
 * @param {string} currentDirection- current direction that the toy robot is facing
 */

const getNewCoordinate = (currentCoordinate, currentDirection) => {
  switch (currentDirection) {
    case 'N':
      currentCoordinate[1] = parseInt(
        (parseInt(currentCoordinate[1]) + 1).toString()
      );
      return currentCoordinate;
    case 'S':
      currentCoordinate[1] = parseInt(
        (parseInt(currentCoordinate[1]) - 1).toString()
      );
      return currentCoordinate;
    case 'W':
      currentCoordinate[0] = parseInt(
        (parseInt(currentCoordinate[0]) - 1).toString()
      );
      return currentCoordinate;
    case 'E':
      currentCoordinate[0] = parseInt(
        (parseInt(currentCoordinate[0]) + 1).toString()
      );
      return currentCoordinate;
  }
};

/**
 * Check validity of current coordinate and prevent toy robot from falling from the table
 * @param {array} coordinate - X and Y coordinate of the toy robot.
 */

const isValidCoordinate = coordinate => {
  const testX = parseInt(coordinate[0]) >= 0 && parseInt(coordinate[0]) < 5;
  const testY = parseInt(coordinate[1]) >= 0 && parseInt(coordinate[1]) < 5;

  if ((!testX || !testY) && process.env.NODE_ENV !== 'test') {
    error(
      `You cannot place at the coordinate of [${coordinate[0]},${coordinate[1]}] as it will make the robot falls off, please change direction or key in another coordinate`
    );
  }
  return testX && testY;
};

/**
 * Check if the user enter invalid input other than text S/E/W/N
 * @param {string} direction- direction(S/N/E/W) toy robot is facing
 */
const isValidDirection = (direction) => {
    const validDirection = ['N', 'S', 'E', 'W'].indexOf(direction) !== -1;
    if(!validDirection && process.env.NODE_ENV !== 'test') {
        error(`Please key in one of the valid directions: N, S, E, W`);
    }
    return validDirection;
}

export {getDirectionName, getNewDirection, getNewCoordinate, isValidCoordinate, isValidDirection }