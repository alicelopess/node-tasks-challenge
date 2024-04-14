import { csvFileHandler } from "./read-csv-file.js"

const csvRecords = await csvFileHandler()

csvRecords.forEach(record => {
    const fetchOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: record,
    }

    fetch('http://localhost:3333/tasks', fetchOptions)
        .then(data => console.log(data.status))
})