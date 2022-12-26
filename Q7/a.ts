const fs = require('fs');
const path = require('path');

const file : string = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

type Command = {
    name: 'cd' | 'ls';
    argument?: string;
}

type ArchiveInfo = {
    parentDir: DirInfo | null;
    name: string;
    size?: number;
    type: 'file' | 'dir';
}


type DirInfo = ArchiveInfo & {
    type: 'dir';
    children: (FileInfo | DirInfo)[];
}

type FileInfo = ArchiveInfo & {
    size: number;
    type: 'file';
}


const rootDir: DirInfo = {
    parentDir: null,
    name: '/',
    type: 'dir',
    children: []
};

let currentDir: DirInfo = rootDir;

function handleCD(argument: string | undefined) {
    if (argument === '..') {
        currentDir = currentDir.parentDir ?? currentDir;
    } else if (argument === '/') {
        currentDir = rootDir;
    } else {
        let temp = currentDir.children
            .find((dir) => dir.type === 'dir' && dir.name === argument)
            ?? currentDir;

        if (temp.type === 'dir') {  // ts doesn't know that temp is a dir
            currentDir = temp;
        }
    }
}

const commandHandlers = {
    cd: handleCD,
    ls: () => {}
}
        

function handleCommand(command: Command) {
    // zod to parse if serious typescript
    commandHandlers[command.name](command.argument);
}

function parseCommandResponse(response: string) {
    let archive : FileInfo | DirInfo | null = null
    
    if (response.startsWith('dir')) {
        archive = {
            parentDir: currentDir,
            name: response.split(' ')[1],
            type: 'dir',
            children: []
        }
    } else {
        let [size, name] = response.split(' ');
        archive = {
            parentDir: currentDir,
            name,
            size: parseInt(size),
            type: 'file'
        }
    }

    currentDir.children.push(archive);
}



file.split('\n').forEach((line: string) => {
    if (line.startsWith('$')) {
        let words = line.split(' ')
        handleCommand({
            name: words[1] as 'cd' | 'ls',
            argument: words[2]
        });
    } else {
        parseCommandResponse(line);
    }
});

var sizesSum = 0;

function getDirSize(dir: DirInfo) {
    if (dir.size) {
        return dir.size;
    }

    let dirSize : number = dir.children.reduce((acc, child) => {
        if (child.type === 'dir') {
            if (child.size) {
                return acc + child.size;
            }
            return acc + getDirSize(child);
        } else {
            return acc + child.size;
        }
    }, 0);

    dir.size = dirSize;

    if (dirSize < 100000) {
        sizesSum += dirSize;
    }

    return dirSize;
}

getDirSize(rootDir);

console.log(sizesSum);
