biggest = [0, 0, 0]


with open('Q1/input.txt', 'r') as file:
    cur_sum = 0
    for line in file:
        if line != '\n':
            a = int(line)
            cur_sum += a
            continue

        if cur_sum > biggest[0]:
            biggest[0] = cur_sum
            biggest.sort()
            

        cur_sum = 0


print(sum(biggest))