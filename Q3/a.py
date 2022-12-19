total = 0


def get_value(letter: str):
    if letter.lower() == letter:
        return ord(letter) - ord('a') + 1
    return ord(letter) - ord('A') + 27


with open('Q3/input.txt', 'r') as file:
    for line in file:
        w1, w2 = list(line[0 : len(line) // 2]), line[len(line) // 2 : len(line) - 1]

        for letter in set(w1):
            if w2.find(letter) != -1:
                total += get_value(letter)
        

print(total)
