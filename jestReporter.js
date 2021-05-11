const fs = require('fs');

function report(resultData) {
    const content = {};

    let prevResults;

    try {
        prevResults = JSON.parse(
            fs.readFileSync('./testResults.json', 'utf-8'),
        );
    } catch (e) {
        console.log('Error retrieving previous test results: ', e);
    }

    const prevData =
        prevResults && prevResults.results && prevResults.results.length
            ? [...prevResults.results]
            : [];
    content.results = [...prevData, resultData];

    try {
        fs.writeFileSync('./testResults.json', JSON.stringify(content));
    } catch (e) {
        console.log('Error writing new test results: ', e);
    }

    return resultData;
}

module.exports = report;
