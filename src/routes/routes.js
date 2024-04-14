import { randomUUID } from 'node:crypto'
import { Database } from '../database/database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

//TODO: Create database
const database = new Database()

//TODO: Create routes array
export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const tasks = database.select('tasks')

            return response
                .setHeader('content-type', 'application/json')
                .end(`Tasks List: ${JSON.stringify(tasks)}`)
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { title, description } = request.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }

            database.insert('tasks', task)

            return response
                .writeHead(201)
                .end('Task Created!')
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {

            //TODO: Get Path ID
            const { id } = request.params
            console.log(`id: ${id}`)

            //database.remove('tasks', id)

            return response
                .writeHead(204)
                .end('Task Deleted!')
        }
    },
]