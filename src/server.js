import http from 'node:http'
import { routes } from './routes/routes.js'

//TODO: Create Server
const server = http.createServer(async (request, response) => {
    //TODO: Get Request Method and URL
    const { method, url } = request
    console.log(`{ method: ${method}, url: ${url} }`) //test

    //TODO: Collect request body using streams and buffers
    const buffers = []
    
    //await all request body reading and push into buffers array
    for await (const chunk of request) {
        buffers.push(chunk)
    }

    //console.log(buffers) //test

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        request.body = null
    }
    
    console.log(request.body) //test

    //TODO: Find route in routes array
    const route = routes.find((route) => route.method == method && route.path.test(url))
    console.log(route) //test

    //TODO: Call Route Handler Function
    if (route) {

        //TODO: Validate and collect params from routes
        const routeElements = request.url.match(route.path)
        console.log(routeElements)

        const routeParams = { ...routeElements.groups }
        console.log(routeParams)

        request.params = routeParams

        route.handler(request, response)
    } else {
        //Route | Resource Not Found
        return response
            .writeHead(404)
            .end('<h1>Hello World!</h1> <p>Sorry! Route Not Found!</p>') //Generate HTML response
    }

})

//TODO: Create Server Port
server.listen(3333)