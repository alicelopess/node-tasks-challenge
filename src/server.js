import http from 'node:http'
import { routes } from './routes/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request
    console.log(`{ method: ${method}, url: ${url} }`) 

    //
    const buffers = []

    for await (const chunk of request) {
        buffers.push(chunk)
    }

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        request.body = null
    }
    //
    
    const route = routes.find((route) => route.method == method && route.path.test(url))
    //console.log(`{ route: ${route} }`)

    if (route) {
        //TODO: Validate and collect params from routes
        const routeElements = request.url.match(route.path)
        //console.log(`routeElements: ${routeElements}`)

        const routeParams = { ...routeElements.groups }
        const { query, ...params } = routeParams
        console.log(routeParams)

        request.params = params
        request.query = query ? extractQueryParams(query) : {}
        
        console.log(`Query:`, request.query)

        route.handler(request, response)
    } else {
        //Route | Resource Not Found
        return response
            .writeHead(404)
            .end('Sorry! Route Not Found!')
    }
})

server.listen(3333)