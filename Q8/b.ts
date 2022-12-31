const fs = require('fs');
const path = require('path');


const file : string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = file.split('\n')
                .map((line: string) => line.split('').map((num: string) => parseInt(num)));

if (lines.length !== lines[0].length) {
    throw new Error('The input is not a square');
}

const square_size = lines.length;

const grid_cell = {
    'left_to_right': 0,
    'right_to_left': 0,
    'top_to_bottom': 0,
    'bottom_to_top': 0
}

const grid = Array(square_size)
                .fill(Array(square_size).fill(undefined))
                .map((ar) => [...ar.map(() => ({...grid_cell}))]);

let stack: {
    'pos': number,
    'value': number
}[] = [];

let direction:
    'left_to_right' |
    'right_to_left' |
    'top_to_bottom' |
    'bottom_to_top';



for (let i = 0; i < square_size; i++) {
    stack = [];
    direction = 'left_to_right';
    for (let j = 0; j < square_size; j++) {
        while (stack.length > 0 && stack[stack.length - 1].value < lines[i][j]) {
            stack.pop();
        }

        if (stack.length > 0) {
            grid[i][j][direction] = Math.abs(stack[stack.length - 1].pos - j)
        } else {
            grid[i][j][direction] = j
            
        }
        stack.push({value: lines[i][j], pos: j});
    }
    
    stack = [];
    direction = 'top_to_bottom';
    for (let j = 0; j < square_size; j++) {
        while (stack.length > 0 && stack[stack.length - 1].value < lines[j][i]) {
            stack.pop();
        }

        if (stack.length > 0) {
            grid[j][i][direction] = Math.abs(stack[stack.length - 1].pos - j)
        } else {
            grid[j][i][direction] = j
            
        }
        stack.push({value: lines[j][i], pos: j});
    }
    
    stack = [];
    direction = 'right_to_left';
    for (let j = square_size - 1; j >= 0; j--) {
        while (stack.length > 0 && stack[stack.length - 1].value < lines[i][j]) {
            stack.pop();
        }

        if (stack.length > 0) {
            grid[i][j][direction] = Math.abs(stack[stack.length - 1].pos - j)
        } else {
            grid[i][j][direction] = Math.abs(square_size - 1 - j)
            
        }
        stack.push({value: lines[i][j], pos: j});
    }
    
    stack = [];
    direction = 'bottom_to_top';
    for (let j = square_size - 1; j >= 0; j--) {
        while (stack.length > 0 && stack[stack.length - 1].value < lines[j][i]) {
            stack.pop();
        }
        
        if (stack.length > 0) {
            grid[j][i][direction] = Math.abs(stack[stack.length - 1].pos - j)
        } else {
            grid[j][i][direction] = Math.abs(square_size - 1 - j)
            
        }
        stack.push({value: lines[j][i], pos: j});
    }
}

let max = 0;


for (let i = 1; i < square_size - 1; i++) {
    for (let j = 1; j < square_size - 1; j++) {
        const product = grid[i][j].left_to_right * grid[i][j].top_to_bottom * 
                        grid[i][j].right_to_left * grid[i][j].bottom_to_top;
        if (product > max) {
            max = product;
        }
    }
}

console.log(max);
