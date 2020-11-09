import chalk from 'chalk';
import figlet from 'figlet';

/**
 * Print the large text Header 
 */

 const headerDisplay = () => {
     console.log(
         chalk.cyan(
             figlet.textSync('Toy-Robot', {
                 Slant:'big',
                 horizontalLayout:'default',
                 verticalLayout: 'default'
             })
         )
     )
 };

 /**
  * Assist the new user by showing Description on how to run program
  */

const showDescription = () => {
    console.log(chalk.cyan('\nEach command needs to be separated into a new line:\nType "REPORT" to see the current coordinate of your robot\n'));

    console.log(chalk.white('PLACE 2,3,W\nLEFT\nRIGHT\nMOVE\nREPORT\n'));
  
    console.log(chalk.cyan('To terminate this program, press CTRL+C (for Windows) or Command+C (for Mac) on your keyboard\n'));
  
    console.log(chalk.green('Start typing your commands below:\n'));
}

export { headerDisplay, showDescription};