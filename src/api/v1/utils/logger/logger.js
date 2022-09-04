const logger = require("./winston")

module.exports = console_log = (level, message) => {
    if (process.env.NODE_ENV === "production") {
        logger.serverLogger.log(level, message);
    }
    else console.log(`${level}: ${message}`)
}
