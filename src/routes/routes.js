import { randomUUID } from 'node:crypto'
import { Database } from '../database/database.js'

//TODO: Create database
const database = new Database()

//TODO: Create routes array
export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            const tasks = database.select('tasks')

            return response
                .setHeader('content-type', 'application/json')
                .end(`Tasks List: ${JSON.stringify(tasks)}`)
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            const { title, description } = request.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: 'Data de criação',
                updated_at: 'Data de atualização'
            }

            database.insert('tasks', task)

            return response
                .writeHead(201)
                .end('Task Created!')
        }
    },
]