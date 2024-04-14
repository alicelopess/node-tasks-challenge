import fs from 'node:fs'
import { parse } from 'csv-parse'

//TODO: Importing tasks in large quantities via a CSV file

const csvPath = "static/tasks.csv"

//const csvRecords = await csvFileHandler()

export async function csvFileHandler() {
    const records = []
    const parser = fs.createReadStream(csvPath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
 
    for await (const record of parser) {
        records.push(JSON.stringify({"title": record[0], "description": record[1]}))
    }
    //console.log(records) //test
    return records
}