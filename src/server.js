import http from 'node:http'
import { routes } from './routes/routes.js'

//TODO: Create Server
const server = http.createServer((request, response) => {
    //TODO: Get Request Method and URL
    const { method, url } = request
    console.log(`{ method: ${method}, url: ${url} }`) //test

    //TODO: Find route in routes array
    const route = routes.find((route) => route.method == method && route.path == url)
    console.log(route) //test

    //TODO: Call Route Handler Function
    if (route) { //if exists
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