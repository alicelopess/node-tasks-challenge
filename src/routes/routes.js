//TODO: Create routes array
export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            return response
                .setHeader('content-type', 'application/json')
                .end('Tasks List...')
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            return response
                .writeHead(201)
                .end('Task Created!')
        }
    },
]