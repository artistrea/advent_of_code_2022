import re


NUM_OF_STACKS = 9
SPACE_BETWEEN_STACK_IDS = 4
INITIAL_STACK_MAX_HEIGHT = 8

stacks = [[] for i in range(NUM_OF_STACKS)]

def parse_move(line: str) -> list:
    move_regex = re.compile(r'move (\d+) from (\d+) to (\d+)')
    move = move_regex.match(line)

    return [int(move.group(1)), int(move.group(2)), int(move.group(3))]


with open('Q5/input.txt', 'r') as file:
    i = 0
    for line in file:
        if i < INITIAL_STACK_MAX_HEIGHT:
            for stack_i in range(NUM_OF_STACKS):
                crate_id = line[1 + stack_i * SPACE_BETWEEN_STACK_IDS]
                if(crate_id == ' '): continue

                stacks[stack_i].append(crate_id)

            i += 1
            continue

        if i == INITIAL_STACK_MAX_HEIGHT:
            for j in range(NUM_OF_STACKS):
                stacks[j].reverse()
            i += 1
            continue

        if i == INITIAL_STACK_MAX_HEIGHT + 1:
            i += 1
            continue

        move = parse_move(line)
        
        n_of_crates_moved = move[0]
        from_stack = move[1] - 1
        to_stack = move[2] - 1

        crates_moved = [stacks[from_stack].pop() for _j in range(n_of_crates_moved)]

        for j in range(n_of_crates_moved):
            stacks[to_stack].append(crates_moved.pop())



for i in range(NUM_OF_STACKS):
    print(stacks[i][-1], end='')
print()