
function requestLogger() {
    return (request, response, next) => {
        let time = new Date().toISOString()
        console.log(`${time} ${request.ip} ${request.method} ${request.url}`)
        next()
    }
}

function errorLogger(error) {
    return (request, response, next) => {
        console.error(error)
        next()
    }
}

module.exports = {
    requestLogger,
    errorLogger,
}
