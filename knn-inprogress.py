# Importing libraries
import pandas as pd
import numpy as np
import math
import operator
import random
import sys

#### Start of STEP 1
# Importing data
data = pd.read_csv('audio_data_set.csv')
#### End of STEP 1
# print(data.head(5))

''' PARSE COMMAND LINE ARGS '''
# sys.argv[1] for testing: 1~6nipZlJiUvI0I7lCf1Z7Li~5BBBxfYZuMVGuyh9L0LcVWjzE~VECTOR~0,0,0.8,0,0.1,0,0,0,0,0.55,0.8,0,0.6
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

# Defining a function which calculates euclidean distance between two data points
def euclideanDistance(data1, data2, length):
    distance = 0
    for x in range(length):
        distance += np.square(data1[x] - data2[x])
    return np.sqrt(distance)


# Defining our KNN model
def knn(trainingSet, testInstance, k):
    distances = {}
    sort = {}

    length = testInstance.shape[1]

    #### Start of STEP 3
    # Calculating euclidean distance between each row of training data and test data
    for x in range(len(trainingSet)):
        #### Start of STEP 3.1
        dist = euclideanDistance(testInstance, trainingSet.iloc[x], length)

        distances[x] = dist[0]
        #### End of STEP 3.1

    #### Start of STEP 3.2
    # Sorting them on the basis of distance
    sorted_d = sorted(distances.items(), key=operator.itemgetter(1))
    #### End of STEP 3.2

    neighbors = []

    #### Start of STEP 3.3
    # Extracting top k neighbors
    for x in range(k):
        neighbors.append(sorted_d[x][0])
    #### End of STEP 3.3
    return neighbors

def find_index(input): 
    o = open('audio_data_set.csv', 'r') 
    myData = csv.reader(o) 
    index = 0 
    for row in myData:
      #print row
      if row[0] == input: 
        return index 
      else : index+=1

def get_vector(uri):
    # create df indexed by uri
    data_i_uri = pd.read_csv('audio_data_set.csv', index_col='uri')
    # print(data_i_uri.head(5))
    try:
        row = data_i_uri.loc[uri]
        # print(row)
        vector = row.values.tolist()
        return vector
    except:
        print('uri does not exist.', file=sys.stderr)
        return None

''' --------------------------------------------------- '''

if (round_num == 0):
    num_rows = 10
    # get relevants columns (uri + selected genre)
    uri_gen_df = data[['uri', genre]]
    # sort by genre values & select top 10 rows
    uri_gen_df = uri_gen_df.sort_values(by = genre, ascending=False).head(10)
    # get 1st random row 
    sample = random.sample(range(0, num_rows), 2)
    rand_index1 = sample[0]
    rand_row1 = uri_gen_df.iloc[rand_index1]
    # get 2nd random row
    rand_index2 = sample[1]
    rand_row2 = uri_gen_df.iloc[rand_index2]
    uri_str = rand_row1['uri'] + '~' + rand_row2['uri']
    print(uri_str)
else:
    # UPDATE TASTE VECTOR
    current_pref = get_vector(uri_pref)
    # print(current_pref)
    # print(taste_vector)
    updated_taste_vector = []
    if taste_vector is None:
        updated_taste_vector = current_pref
    else:
        for (x, y) in zip(current_pref, taste_vector):
            num = x * (round_num - 1)
            updated_taste_vector.append((num + y)/(round_num))
    # RUN KNN WITH SPECIFIED K
    test_df = pd.DataFrame([updated_taste_vector])
    if (round_num < 5):
        k = (int(round_num) + 1) * 2
    else:
        k = (int(round_num) + 1) * 2 + 3
    neighbors = knn(data.iloc[:,1:14], test_df, k)
    uri_list = []
    for n in neighbors:
        uri_list.append(data.iloc[n]['uri'])
    # REMOVE DUPLICATES
    i = 0
    while i < len(uri_list):
        current_uri = uri_list[i]
        if current_uri in uris_seen:
            uri_list.remove(current_uri)
            i -=1 # dec index b/c of removal
        else:
            i +=1
    # RETURN STRING OF URIS (PICK TOP 2 OF REMAINING)
    if (round_num < 2):
        payload = '~'.join(uri_list[:2])
    elif (round_num < 5):
        # convert vector elements to str vals
        str_tv = [str(val) for val in updated_taste_vector]
        payload = '~'.join(uri_list[:2]) + '~' + '~'.join(uris_seen) + '~VECTOR~' + ','.join(str_tv)
    else:
        payload = '~'.join(uri_list[:5])
    print(payload)


    ''' --------------------------------------------------- '''


    """ for x in range(len(sys.argv)):
        # get row number using uri and add all values in the row's other columns to taste vector
        tasteVector = [0] * 13
        songs
        songURI = sys.argv[x].split('/')[4]
        row_number = find_index(songURI)
        songs.append(row_number)
    # add all column values for each row in songs.apped together
    '''INSERT CODE HERE'''

    tasteVector = tasteVector/len(sys.argv)
    k = sys.argv[1] * 2
    test = tasteVector
    neigh = knn(data, test, k)
    uniqueSongs
    # check if any of the results have same URIs as those in sys.argv. Keep the new songs in their own dataframe
    for x in range(len(neigh)):
        # compare every value in neigh with every value in songs and put unique ones in uniqueSongs?
        '''INSERT CODE HERE'''    
    # print two random songs from the dataframe of new songs
    ''' INSERT CODE HERE'''
 """



# testSet = [[7.2, 3.6, 5.1, 2.5]]
# test = pd.DataFrame(testSet)

#### Start of STEP 2
# Setting number of neighbors = 1


# print('\n\nWith 1 Nearest Neighbour \n\n')
# k = 1
# #### End of STEP 2
# # Running KNN model
# result, neigh = knn(data, test, k)

# # Predicted class
# print('\nPredicted Class of the datapoint = ', result)

# # Nearest neighbor
# print('\nNearest Neighbour of the datapoints = ', neigh)

# print('\n\nWith 3 Nearest Neighbours\n\n')
# # Setting number of neighbors = 3
# k = 3
# # Running KNN model
# result, neigh = knn(data, test, k)

# # Predicted class
# print('\nPredicted class of the datapoint = ', result)

# # Nearest neighbor
# print('\nNearest Neighbours of the datapoints = ', neigh)

# print('\n\nWith 5 Nearest Neighbours\n\n')
# # Setting number of neighbors = 3
# k = 5
# # Running KNN model
# result, neigh = knn(data, test, k)

# # Predicted class
# print('\nPredicted class of the datapoint = ', result)

# # Nearest neighbor
# print('\nNearest Neighbours of the datapoints = ', neigh)
