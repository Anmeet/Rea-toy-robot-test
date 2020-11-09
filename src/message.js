import chalk from 'chalk';

/**
 * show information message to the console
 * @param string message - message to be displayed in console
 */

 const info = async message => {
     console.log(chalk.green(message));
 }

 /**
  * Show the success message on the console
  * @param string message - message to be displayed in console
  */
const success = async message => {
    console.log(chalk.black.green(message))
}

/**
 * Show the error message on the console
 * @param string message - message to be displayed in console
 */

 const error = async message => {
     console.log(chalk.white.bgRedBright(message));
 }

 export {info, success, error};