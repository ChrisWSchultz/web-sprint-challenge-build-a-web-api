// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Project = require('./projects-model')

const { validateProjectID, validatePostData } = require('./projects-middleware')

router.get('/projects', async (request, response) => {
    try {
        let projects = await Project.get()

        return response.status(200).json(projects)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.get('/projects/:id', validateProjectID(), async (request, response) => {
    try {
        return response.status(200).json(request.project)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.post('/projects', validatePostData(), async (request, response) => {
    try {
        let project = await Project.insert(request.projectData)

        return response.status(200).json(project)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.put('/projects/:id', validateProjectID(), validatePostData(), async (request, response) => {
    try {
        let project = await Project.update(request.project.id, request.projectData)

        return response.status(200).json(project)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.delete('/projects/:id', validateProjectID(), async (request, response) => {
    try {
        let result = await Project.remove(request.project.id)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

// project actions
router.get('/projects/:id/actions', validateProjectID(), async (request, response) => {
    try {
        let projectActions = request.project.actions

        return response.status(200).json(projectActions)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

module.exports = router
