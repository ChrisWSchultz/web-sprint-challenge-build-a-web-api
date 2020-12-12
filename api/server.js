// module imports
const express = require('express')

// middleware imports
const logger = require('./middleware/logging')

// route imports
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

// app
const app = express()

// modules
app.use(express.json())

// middleware
app.use(logger.requestLogger())

// routes
app.use('/api', actionsRouter)
app.use('/api', projectsRouter)

module.exports = app
