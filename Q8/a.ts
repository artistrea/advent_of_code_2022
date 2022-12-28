const fs = require('fs');
const path = require('path');


const file : string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = file.split('\n');
const num_of_columns = lines[0].length;



const grid = Array(num_of_columns).fill(Array(num_of_columns).fill(0)).map((ar) => [...ar]);



const analyze_line = (line_i: number) => {
    const line = lines[line_i];

    if (num_of_columns !== line.length) {
        throw new Error('Invalid input. All lines must be of the same length.');
    }

    let highestPeakBefore = -1;
    
    for (let i = 0; i < num_of_columns; i++) {
        const num = parseInt(lines[line_i][i]);

        if (num > highestPeakBefore) {
            highestPeakBefore = num;
            grid[line_i][i] = 1;
        }
    }

    highestPeakBefore = -1;
    for (let i = num_of_columns - 1; i >= 0; i--) {
        const num = parseInt(lines[line_i][i]);

        if (num > highestPeakBefore) {
            highestPeakBefore = num;
            grid[line_i][i] = 1;
        }
    }
}


const analyze_column = (column_i: number) => {
    let highestPeakBefore = -1;
    
    for (let i = 0; i < num_of_columns; i++) {
        const num = parseInt(lines[i][column_i]);
        
        if (num > highestPeakBefore) {
            highestPeakBefore = num;
            grid[i][column_i] = 1;
        }
    }

    highestPeakBefore = -1;
    for (let i = num_of_columns - 1; i >= 0; i--) {
        const num = parseInt(lines[i][column_i]);

        if (num > highestPeakBefore) {
            highestPeakBefore = num;
            grid[i][column_i] = 1;
        }
    }

}

const analyze_trees = () => {
    for (let i = 0; i < num_of_columns; i++) {
        analyze_column(i);
    }
    
    for (let i = 0; i < lines.length; i++) {
        analyze_line(i);
    }
    
    const visibleTrees = grid.reduce((acc, ar) => acc + ar.reduce((acc, num) => acc + num, 0), 0);
    
    return visibleTrees;
}

console.log(analyze_trees());
