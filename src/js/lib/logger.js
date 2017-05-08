/**
 * This logger is a thin wrapper around the native console.
 * Use blacklisting and sourcemaps to get to the original
 * error.
 */
class Logger {

    constructor(app) {
        this.levels = {error: 0, warn: 1, info: 2, verbose: 3, debug: 4}
        this.setLevel('info')
    }


    setLevel(level) {
        this.level = this.levels[level]
    }

    error(...args) {
        console.error(...args)
    }

    warn(...args) {
        if (this.level >= this.levels.warn) {
            console.warn(...args)
        }
    }

    info(...args) {
        if (this.level >= this.levels.info) {
            console.info(...args)
        }
    }

    verbose(...args) {
        if (this.level >= this.levels.verbose) {
            console.log(...args)
        }
    }

    debug(...args) {
        if (this.level >= this.levels.debug) {
            console.log(...args)
        }
    }
}

module.exports = Logger
