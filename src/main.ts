import { aoc, by, d, gh, s } from './aoc-toolbox/pretty-print.ts'
import { BasePuzzle } from './puzzles/base-puzzle.ts'
import puzzles from './puzzles/index.ts'

// check command line format
if (process.argv.slice(2).length > 1) {
  console.warn('\x1b[33mInvalid command format!\x1b[0m')
  console.warn('\x1b[33mUsage: npm run start [full]\x1b[0m')
  console.warn('\x1b[38;5;244m(full: runs every puzzle script sequentially)\x1b[0m\n')
  process.exit(1)
}

// display cute banner :3 (yes it looks mangled in here but shush it works)
console.log(`
               _   ${s}             _            __    _____          _     
      /\\      | |               | |          / _|  / ____|        | |  ${s}
  ${s}  /  \\   __| |_   _____ _ __ | |_    ___ | |_  | |     ___   __| | ___ 
    / /\\ \\ / _\` \\ \\ / / _ \\ \'_ \\| __|  / _ \\|  _| | |    / _ \\ / _\` |/ _ \\
   / ____ \\ (_| |\\ \V /  __/ | | | |_  | (_) | |   | |___| (_) | (_| |  __/
  /_/    \\_\\__,_| \\_/ \\___|_| |_|\\__|  \\___/|_|    \\_____\\___/ \\__,_|\\___|
                                                ${s}
  \x1b[92m${aoc}\x1b[92m - Eric Wastl & co.                    >>> 2024\x1b[0m
  \x1b[38;5;244m_______________________________________________________________________\x1b[0m
                             ${d}                                           
  Stars collected:  30 / 50  ${d}                          Code by ${by('EepyBerry')}
  \x1b[38;5;220m★★★★★★★★★★★★★★★\x1b[0m            ${d}               ${gh('EepyBerry')}
  `)

// display info message for run mode
let fullRun = false
const curDate = new Date()
if (process.argv[2] == 'full' || curDate > new Date('2024-12-25')) {
  console.log(`
  ${s} -------------------- Mysterious Puzzle Guardian ------------------- ${s}
  |                                                                     |
  |  Ah, I see you'd like to get a full report of this year's ventures! |
  |  The Historians will compile each day\'s results for you!            |
  |                                                                     |
  ${s} ------------------------------------------------------------------- ${s}`)
  fullRun = true
} else {
  console.log(`
  ${s} -------------------[ Mysterious Puzzle Guardian ]------------------ ${s}
  |                                                                     |
  |  You\'re just in time! The Historians will compile today's results   |
  |  for you now!                                                       |
  |                                                                     |
  ${s} ------------------------------------------------------------------- ${s}`)
}

// exec puzzle scripts
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