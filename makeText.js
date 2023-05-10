const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function createText(text) {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText());
}

function generateText(path) {
    fs.readFile(path, "utf8", function cb(error, data) {
        if (error) {
            console.error(`Cannot read file: ${path}: ${error}`);
            process.exit(1);
        } else {
            createText(data)
        }
    });
}

async function createURLText(url) {
    let response;

    try {
        response = await axios.get(url);
    } catch (error) {
        console.error(`Cannot read URL: ${url}: ${error}`);
        process.exit(1);
    }
    createURLText(response.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
    generateText(path);
}

else if (method === "url") {
    createURLText(path);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}