import fs from 'node:fs/promises'
//TODO: Create database
// --Model: { "tasks": [{task}, ...] }

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {} //property

    //TODO: Persist database into JSON file using fs module
    #persistDatabase() {
        fs.writeFile(databasePath, JSON.stringify(this.#database)) //write JSON file from db object
    }

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persistDatabase()
            })
    }

    //TODO: Create method that inserts data into database
    insert(table, data) {
        //console.log(`Insert Table Test 1: ${this.#database[table]}`) //test

        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
            this.#persistDatabase()
        } else {
            this.#database[table] = [data]
            this.#persistDatabase()
        }

        //console.log(`Insert Table Test 2: ${JSON.stringify(this.#database[table])}`) //test
        //console.log(`Insert Table Test 3: ${JSON.stringify(this.#database)}`) //test


        return data
    }

    //TODO: Create method that select data from database
    select(table) {
        const data = this.#database[table] ?? []
        //console.log(`Select Table Test: ${JSON.stringify(data)}`) //test

        return data
    }

    //TODO: Create method that remove data from database
    remove(table, id) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)
        
        if (taskIndex > -1) { //if task exists
            this.#database[table].splice(taskIndex, 1)
            this.#persistDatabase()
        }
    }
    
    //TODO: Create method that update data
    update(table, id, taskUpdatedData) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)

        if (taskIndex > -1) { //if task exists
            const { completed_at, created_at } = this.#database[table][taskIndex]
            this.#database[table][taskIndex] = { id, completed_at, created_at, ...taskUpdatedData }
            this.#persistDatabase()
        }
    }

    //TODO: Create method that update completed_at data 
    updateTaskStatus(table, id, taskUpdatedStatus) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)
        
        console.log(taskUpdatedStatus.completed_at) //test

        if (taskIndex > -1) { //if task exists
            this.#database[table][taskIndex].completed_at ? this.#database[table][taskIndex].completed_at = null : this.#database[table][taskIndex].completed_at = taskUpdatedStatus.completed_at
            this.#persistDatabase()
        }
    }
    
}