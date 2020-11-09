import {isInvalidFirstCommand, isValidCommand, isInvalidCommand,isCommandTypeOf,executeCommand} from './command.js'
import {headerDisplay, showDescription} from './header.js';


/**
 * receives input from user until user terminte the program
 */

 const input = () => {
    let stdin = process.openStdin();
    let coordinate = [0, 0];
    let direction = '';
    let round = 0;


    stdin.addListener('data', function(d){
        let command = d.toString()
        .trim()
        .toUpperCase();

        let isValid = isValidCommand(round, command);
        if(isValid) {
            if(isCommandTypeOf('PLACE', command)){
                let [newCoordinateX, newCoordinateY, newDirection, isValid] = executeCommand(command);
                if(isValid){
                    coordinate[0] = newCoordinateX;
                    coordinate[1] = newCoordinateY;
                    direction = newDirection;
                }
            } else {
                [coordinate, direction ] = executeCommand(command, coordinate, direction)
            }
            if(isValid) {
                round++;
            }
        }
    })
 }

/**
 * Start a program
 */

 const start = () => {
    headerDisplay();
    showDescription();
    input();
 }

 start();