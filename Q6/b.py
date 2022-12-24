from collections import deque

MARKER_SIZE = 14
first_marker = -1

with open('Q6/input.txt', 'r') as file:
    str_queue =  deque()
    
    for line in file:
        for i in range(len(line)):
            str_queue.append(line[i])

            if (len(str_queue) < MARKER_SIZE): continue

            if (len( set(str_queue) ) == MARKER_SIZE):
                first_marker = i + 1
                break

            str_queue.popleft()

print(first_marker)