from collections import deque


first_marker = -1

with open('Q6/input.txt', 'r') as file:
    str_queue =  deque()
    
    for line in file:
        for i in range(len(line)):
            str_queue.append(line[i])

            if (len(str_queue) < 4): continue

            if (len( set(str_queue) ) == 4):
                first_marker = i + 1
                break

            str_queue.popleft()

print(first_marker)