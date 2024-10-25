const fs = require('fs');
const path = require('path');

class ReportGenerator {
    constructor(dataDir, outputFile) {
        this.dataDir = dataDir;
        this.outputFile = outputFile;
        this.testData = [];
        this.columnNames = new Set();
        this.init();
    }

    init() {
        this.loadTestData();
        this.generateHTML();
    }

    loadTestData() {
        const files = fs.readdirSync(this.dataDir);

        files.forEach(file => {
            const filePath = path.join(this.dataDir, file);
            if (path.extname(filePath) === '.json') {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                this.testData.push(data);

                // Collect column names
                Object.keys(data).forEach(key => this.columnNames.add(key));
            }
        });
    }

    generateHTML() {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Test Cases Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
css
Copy code
    h1 {
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
</style>
</head>
<body>
    <h1>JSON Test Cases Report</h1>
    <table>
        <thead>
            <tr>
                ${this.generateTableHeaders()}
            </tr>
        </thead>
        <tbody>
            ${this.generateTableRows()}
        </tbody>
    </table>
</body>
</html>
`;
            fs.writeFileSync(this.outputFile, htmlContent, 'utf8');
            console.log(`${this.outputFile} has been generated.`);
        }
    generateTableHeaders() {
        return Array.from(this.columnNames).map(name => `<th>${name}</th>`).join('');
    }

    generateTableRows() {
        return this.testData.map(row => `
            <tr>
                ${Array.from(this.columnNames).map(col => `<td>${row[col] || ''}</td>`).join('')}
            </tr>
        `).join('');
    }
}

// Example usage
const dataDirectory = './testcases';
const outputFilePath = 'report.html';

new ReportGenerator(dataDirectory, outputFilePath);