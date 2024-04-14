//Dynamic route path generator using regex

//TODO: Generate path to validate routes with params
// -- Path Model: /tasks/:id

export function buildRoutePath(path) {
    //:id regex identifier
    const routeParametersRegex = /:([a-zA-Z]+)/g
    console.log(`Regex Test: ${ Array.from(path.matchAll(routeParametersRegex)).length === 0 ? '[]' :  Array.from(path.matchAll(routeParametersRegex))}`)
    
    
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    console.log(`Regex test pathWithParams: ${pathWithParams}`)

    const pathRegex = new RegExp(`^${pathWithParams}`)
    console.log(`Regex test pathRegex: ${pathRegex}`)
    
    return pathRegex
}
