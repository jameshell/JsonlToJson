const readline = require('readline');
const fs = require('fs');

const fileNameInput = 'default-lexile-events-metadata.jsonl';
const fileNameOutput = 'default-lexile-events-metadata.json'

// create a readline interface for reading the file line by line
const rl = readline.createInterface({
    input: fs.createReadStream(__dirname+'\\'+fileNameInput),
    crlfDelay: Infinity
});

// create an array to hold the parsed JSON objects
const jsonArray = [];

// read each line of the file and parse it as JSON
rl.on('line', (line) => {
    jsonArray.push(JSON.parse(line));
});

// log the parsed JSON objects once the file has been fully read
rl.on('close', () => {
    const jsonData = JSON.stringify(jsonArray, null, 2);
    fs.writeFile(fileNameOutput, jsonData, (err)=> {
        if (err) {
            console.error(err);
        } else {
            console.log('File converted successfully.');
        }
    });
});