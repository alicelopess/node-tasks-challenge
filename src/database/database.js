//TODO: Create database
// --Model: { "tasks": [{task}, ...] }

export class Database {
    #database = {} //property

    //TODO: Create method that inserts data into database
    insert(table, data) {
        console.log(`Insert Table Test 1: ${this.#database[table]}`) //test

        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        console.log(`Insert Table Test 2: ${JSON.stringify(this.#database[table])}`) //test
        console.log(`Insert Table Test 3: ${JSON.stringify(this.#database)}`) //test


        return data
    }

    //TODO: Create method that select data from database
    select(table) {
        const data = this.#database[table] ?? []
        console.log(`Select Table Test: ${JSON.stringify(data)}`) //test

        return data
    }
    // --Model: { "tasks": [{task}, ...] }
    //TODO: Create method that remove data from database
    remove(table, id) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)

        if (taskIndex > -1) {
            this.#database[table].splice(taskIndex, 1)
        }

    }
    
}