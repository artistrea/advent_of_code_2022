possible_moves = {
    'rock': {
        'value': 1,
        'loses_against': 'paper',
        'draws_against': 'rock',
        'wins_against': 'scissors'
    },
    'paper': {
        'value': 2,
        'loses_against': 'scissors',
        'draws_against': 'paper',
        'wins_against': 'rock'
    },
    'scissors': {
        'value': 3,
        'loses_against': 'rock',
        'draws_against': 'scissors',
        'wins_against': 'paper'
    },
}

translating_letter_to_move = {
    'A': 'rock',
    'B': 'paper',
    'C': 'scissors',
    'X': 'loses_against',
    'Y': 'draws_against',
    'Z': 'wins_against'
}

WIN_POINTS = 6
DRAW_POINTS = 3

total = 0

with open('Q2/input.txt', 'r') as file:
    for line in file:
        a, x = map(lambda x: translating_letter_to_move[x], line.split())
        a = possible_moves[a]

        if x == 'wins_against':
            total += WIN_POINTS + (a['value'] % 3) + 1  # winner value
        elif x == 'draws_against':
            total += DRAW_POINTS + a['value']
        else:
            total += (a['value'] - 2 ) % 3 + 1               # loser value


print(total)
