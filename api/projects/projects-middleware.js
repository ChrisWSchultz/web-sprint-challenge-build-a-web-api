const Project = require('./projects-model')

function validateProjectID() {
    return async (request, response, next) => {
        let id = request.params.id
        let project = await Project.get(id)

        if (project) {
            request.project = project
            next()
        } else {
            response.status(400).json({"message": "invalid id"})
        }
    }
}

function validatePostData() {
    return async (request, response, next) => {
        let data = {
            name: request.body.name,
            description: request.body.description,
            completed: request.body.completed || false
        }

        if(!data.name || !data.description) {
            response.status(400).json({"message": "required data is missing, please check your project data"})
        } else {
            request.projectData = data
            next()
        }
    }
}

module.exports = {
    validateProjectID,
    validatePostData,
}
