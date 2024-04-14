import { csvFileHandler } from "./read-csv-file.js"

const csvRecords = await csvFileHandler()

//TODO: Read each line of record and make http request to create on database
csvRecords.forEach(record => {
    const fetchOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: record,
    }

    fetch('http://localhost:3333/tasks', fetchOptions)
        .then(data => console.log(data))
})