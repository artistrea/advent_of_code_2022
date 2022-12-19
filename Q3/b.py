def get_value(letter: str):
    if not letter.isalpha(): return 0
    if letter.lower() == letter:
        return ord(letter) - ord('a') + 1
    return ord(letter) - ord('A') + 27

total = 0

with open('Q3/input.txt', 'r') as file:
    current_group_size = 0
    current_group_letter_count = {}
    print("total", total)
    for line in file:
        for letter in set(line):
            current_group_letter_count[letter] = current_group_letter_count.setdefault(letter, 0) + 1

        current_group_size += 1

        if current_group_size == 3:
            for letter, count in current_group_letter_count.items():
                if count == current_group_size:
                    total += get_value(letter)
            current_group_size = 0
            current_group_letter_count = {}
        
        

print(total)
