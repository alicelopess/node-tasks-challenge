//Dynamic route path generator using regex

//TODO: Get Path ID
// -- Path Model: /tasks/:id

export function buildRoutePath(path) {
    //:id regex identifier
    const routeParametersRegex = /:([a-zA-Z]+)/g
    console.log(`Regex Test: ${Array.from(path.matchAll(routeParametersRegex))}`)
    
    return path
}
