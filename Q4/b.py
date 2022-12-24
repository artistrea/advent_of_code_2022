global redundant
redundant = 0

def expand_array(ranges_array, index):
    while len(ranges_array) <= index:
        ranges_array.append([])        # index = start, value = [end]

def add_to_ranges_array(ranges_array, range):
    start, end = range

    ranges_array.append(range)

ranges_array = []

def check_redundancy(ranges_array):
    global redundant

    if(len(ranges_array) == 0): return

    if(ranges_array[0][0] >= ranges_array[1][0] and ranges_array[0][0] <= ranges_array[1][1]):
        redundant += 1
        return

    if(ranges_array[0][0] <= ranges_array[1][0] and ranges_array[0][1] >= ranges_array[1][0]):
        redundant += 1

with open('Q4/input.txt', 'r') as file:
    for line in file:
        ranges_array = []
        range1, range2 = list(map(lambda x : list(map(int, x.split('-'))) , line.split(',')))
        add_to_ranges_array(ranges_array, range1)
        add_to_ranges_array(ranges_array, range2)
        check_redundancy(ranges_array)


print(redundant)
