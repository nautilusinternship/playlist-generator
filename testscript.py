# Importing libraries
""" import pandas as pd
import numpy as np
import math
import operator
import random """
import sys

#### Start of STEP 1
# Importing data
# data = pd.read_csv('audio_data_set.csv')
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
    num_rows = 10
    print('hi')
    """ # get relevants columns (uri + selected genre)
    uri_gen_df = data[['uri', genre]]
    # sort by genre values & select top 10 rows
    uri_gen_df = uri_gen_df.sort_values(by = genre, ascending=False).head(10)
    # get 1st random row 
    print('hello')
    sample = random.sample(range(0, num_rows), 2)
    rand_index1 = sample[0]
    rand_row1 = uri_gen_df.iloc[rand_index1]
    # get 2nd random row
    rand_index2 = sample[1]
    rand_row2 = uri_gen_df.iloc[rand_index2]
    uri_str = rand_row1['uri'] + '~' + rand_row2['uri']
    print('beep~boop') """
