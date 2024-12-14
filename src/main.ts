import { BasePuzzle } from './puzzles/base-puzzle.ts'
import puzzles from './puzzles/index.ts'

console.log(`
               _   ★             _            __    _____          _     
      /\\      | |               | |          / _|  / ____|        | |  ★
  ★  /  \\   __| |_   _____ _ __ | |_    ___ | |_  | |     ___   __| | ___ 
    / /\\ \\ / _\` \\ \\ / / _ \\ \'_ \\| __|  / _ \\|  _| | |    / _ \\ / _\` |/ _ \\
   / ____ \\ (_| |\\ \V /  __/ | | | |_  | (_) | |   | |___| (_) | (_| |  __/
  /_/    \\_\\__,_| \\_/ \\___|_| |_|\\__|  \\___/|_|    \\_____\\___/ \\__,_|\\___|
                                                ★
  (https://adventofcode.com) - Eric Wastl                        >>> 2024
  _______________________________________________________________________
                             |                                           
  Stars collected:  27 / 50  |                          Code by EepyBerry
  ★★★★★★★★★★★★✰★             |               https://github.com/EepyBerry
  `)

let fullRun = false
const curDate = new Date()
if (curDate > new Date('2024-12-25')) {
  console.warn(`
  ★ -------------------- Mysterious Puzzle Guardian ------------------- ★
  |                                                                     |
  |  Seems like the holidays have passed...                             |
  |  The Historians will compile each day\'s results for you!            |
  |                                                                     |
  ★ ------------------------------------------------------------------- ★
    `)
  fullRun = true
} else {
  console.warn(`
  ★ -------------------[ Mysterious Puzzle Guardian ]------------------ ★
  |                                                                     |
  |  You\'re just in time! The Historians will compile today's results   |
  |  for you now!                                                       |
  |                                                                     |
  ★ ------------------------------------------------------------------- ★
  `)
}

setTimeout(() => {
    if (fullRun) {
      puzzles.forEach((p: BasePuzzle) => p.run())
    } else {
      puzzles[curDate.getDate()-1].run()
    }
    console.log(`
    
        _                                                         _   
       ( )                                                       ( )  
      _|/    ______   ______   _  __   __  _   ______   ______    \\|_ 
     (_)    |______| |______| (_) \\ \\ / / (_) |______| |______|    (_)
                                   \\ V /                              
                                    \\_/                               
    `)
}, 2500)