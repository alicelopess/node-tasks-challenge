import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {} 
    
    #persistDatabase() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
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

    //Database Methods
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
            this.#persistDatabase()
        } else {
            this.#database[table] = [data]
            this.#persistDatabase()
        }

        return data
    }

    select(table) {
        const data = this.#database[table] ?? []
        return data
    }

    remove(table, id) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)
        
        if (taskIndex > -1) { 
            this.#database[table].splice(taskIndex, 1)
            this.#persistDatabase()

            return ['successfully deleted']
        } else {
            return []
        }
    }
    
    update(table, id, taskUpdatedData) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)

        if (taskIndex > -1) {
            const { title, description, updated_at } = taskUpdatedData
            
            const updatedTitle = title ? title : this.#database[table][taskIndex].title
            const updatedDescription = description ? description : this.#database[table][taskIndex].description

            const { completed_at, created_at } = this.#database[table][taskIndex]
            this.#database[table][taskIndex] = { id, updated_at, title: updatedTitle, description: updatedDescription, completed_at, created_at }
            this.#persistDatabase()

            return ['successfully updated']
        } else {
            return []
        }
    }

    updateTaskStatus(table, id, taskUpdatedStatus) {
        const taskIndex = this.#database[table].findIndex((task) => task.id == id)

        if (taskIndex > -1) {
            this.#database[table][taskIndex].completed_at ? this.#database[table][taskIndex].completed_at = null : this.#database[table][taskIndex].completed_at = taskUpdatedStatus.completed_at
            this.#persistDatabase()

            return ['successfully updated']
        } else {
            return []
        }
    }
}