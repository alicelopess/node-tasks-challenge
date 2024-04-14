import { randomUUID } from 'node:crypto'
import { Database } from '../database/database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const tasks = database.select('tasks')

            return response
                .setHeader('content-type', 'application/json')
                .end(`${JSON.stringify(tasks)}`)
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { title, description } = request.body

            if (title) {
                const task = {
                    id: randomUUID(),
                    title,
                    description: description ? description : null,
                    completed_at: null,
                    created_at: new Date(),
                    updated_at: new Date()
                }

                database.insert('tasks', task)

                return response
                    .writeHead(201)
                    .end(`Task Created! \n id: ${task.id}`)

            } else {
                return response
                    .writeHead(400)
                    .end(`Oops! Must add task title!`)
            }
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {

            const { id } = request.params
            console.log(`id: ${id}`)

            const reqMessage = database.remove('tasks', id)

            if (reqMessage.length === 0) {
                return response
                    .writeHead(404)
                    .end('Task Not Found!')
            } else {
                return response
                    .writeHead(200)
                    .end(`Task ${reqMessage[0]}`)
            }
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {

            const { id } = request.params
            console.log(`id: ${id}`)

            const { title, description } = request.body

            const reqMessage = database.update('tasks', id, {
                title,
                description,
                updated_at: new Date()
            })

            if (reqMessage.length === 0) {
                return response
                    .writeHead(404)
                    .end('Task Not Found!')
            } else {
                return response
                    .writeHead(200)
                    .end(`Task ${reqMessage[0]}`)
            }
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            
            const { id } = request.params
            console.log(`id: ${id}`)

            const reqMessage = database.updateTaskStatus('tasks', id, {
                completed_at: new Date()
            })

            if (reqMessage.length === 0) {
                return response
                    .writeHead(404)
                    .end('Task Not Found!')
            } else {
                return response
                    .writeHead(200)
                    .end(`Task ${reqMessage[0]}`)
            }
        }
    },
]