possible_moves = {
    'rock': {
        'name': 'rock',
        'value': 1,
        'loses_against': 'paper',
        'wins_against': 'scissors'
    },
    'paper': {
        'name': 'paper',
        'value': 2,
        'loses_against': 'scissors',
        'wins_against': 'rock'
    },
    'scissors': {
        'name': 'scissors',
        'value': 3,
        'loses_against': 'rock',
        'wins_against': 'paper'
    },
}

translating_letter_to_move = {
    'A': 'rock',
    'B': 'paper',
    'C': 'scissors',
    'X': 'rock',
    'Y': 'paper',
    'Z': 'scissors'
}

WIN_POINTS = 6
DRAW_POINTS = 3

total = 0

with open('Q2/input.txt', 'r') as file:
    for line in file:
        a, x = map(lambda x: possible_moves[translating_letter_to_move[x]], line.split())

        if x['wins_against'] == a['name']:
            total += WIN_POINTS
        elif x['loses_against'] != a['name']:
            total += DRAW_POINTS

        total += x['value']        

print(total)
