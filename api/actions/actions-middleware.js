const Action = require('./actions-model')
const Project = require('../projects/projects-model')

function validateActionID() {
    return async (request, response, next) => {
        let id = request.params.id
        let action = await Action.get(id)

        if (action) {
            request.action = action
            next()
        } else {
            response.status(400).json({"message": "invalid id"})
        }
    }
}

function validatePostData() {
    return async (request, response, next) => {
        let data = {
            project_id: request.body.project_id,
            description: request.body.description,
            notes: request.body.notes,
            completed: request.body.completed || false
        }

        let project = await Project.get(data.project_id)

        if(project) {
            if (!data.project_id || !data.description || !data.notes) {
                response.status(400).json({"message": "required data is missing, please check your action data"})
            } else {
                request.actionData = data
                next()
            }
        } else {
            response.status(400).json({"message": "invalid project id"})
        }
    }
}

module.exports = {
    validateActionID,
    validatePostData,
}
