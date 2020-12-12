// Write your "actions" router here!
const express = require('express')
const router = express.Router()

const Action = require('./actions-model')

const { validateActionID, validatePostData } = require('./actions-middleware')


router.get('/actions', async (request, response) => {
    try {
        let actions = await Action.get()

        return response.status(200).json(actions)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.get('/actions/:id', validateActionID(), async (request, response) => {
    try {
        return response.status(200).json(request.action)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.post('/actions', validatePostData(), async (request, response) => {
    try {
        let action = await Action.insert(request.actionData)

        return response.status(200).json(action)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.put('/actions/:id', validateActionID(), validatePostData(), async (request, response) => {
    try {
        let action = await Action.update(request.action.id, request.actionData)

        return response.status(200).json(action)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

router.delete('/actions/:id', validateActionID(), async (request, response) => {
    try {
        let result = await Action.remove(request.action.id)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({"message": "something went wrong"})
    }
})

module.exports = router
