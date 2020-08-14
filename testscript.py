import sys

args_array = sys.argv[1].split('~VECTOR~')
front = args_array[0].split('~') # round & uris seen
round_num = int(front[0]) # round number
if (round_num == 0):
    genre = front[1]
else:
    length = len(front)
    uris_seen = front[1:length] # list of uris already seen by user
    uri_pref = uris_seen[0] # uri of song pref'd by user in this round
if (args_array[1] == ''):
    taste_vector = None
else:
    taste_vector = list(map(float, args_array[1].split(','))) # current taste vector, to be updated by uri_pref

if (round_num == 0):
    print('hello~hi')
