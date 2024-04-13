import { randomUUID } from 'node:crypto'

//TODO: Create temporary database
const tasks = []

//TODO: Create routes array
export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            console.log(tasks)

            return response
                .setHeader('content-type', 'application/json')
                .end(`Tasks List: ${tasks.length === 0 ? '[]' : JSON.stringify(tasks)}`)
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            tasks.push({
                id: randomUUID(),
                title: 'Um título',
                description: 'Uma descrição',
                completed_at: null,
                created_at: 'Data de criação',
                updated_at: 'Data de atualização'
            })

            return response
                .writeHead(201)
                .end('Task Created!')
        }
    },
]