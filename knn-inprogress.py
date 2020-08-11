# Importing libraries
import pandas as pd
import numpy as np
import math
import operator

#### Start of STEP 1
# Importing data
data = pd.read_csv('audio_data_set.csv')
#### End of STEP 1

print(data.head(5))


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
    # classVotes = {}

    # Commented out this part bc we don't need to know what "category" shows up most frequently-- just the best matches
    #### Start of STEP 3.4
    # Calculating the most freq class in the neighbors
    # for x in range(len(neighbors)):
    #     response = trainingSet.iloc[neighbors[x]][-1]

    #     if response in classVotes:
    #         classVotes[response] += 1
    #     else:
    #         classVotes[response] = 1
    # #### End of STEP 3.4

    # #### Start of STEP 3.5
    # sortedVotes = sorted(classVotes.items(), key=operator.itemgetter(1), reverse=True)
    # return (sortedVotes[0][0], neighbors)
    return neighbors
    #### End of STEP 3.5

    def find_index(input): 
    o = open('audio_data_set.csv', 'r') 
    myData = csv.reader(o) 
    index = 0 
    for row in myData:
      #print row
      if row[0] == input: 
        return index 
      else : index+=1

if (sys.argv[1] == 0)
{
    # pick out of top 10 songs
    k = 10
    genreColumn = data.columns.get_loc(sys.argv[0])
    print(genreColumn)
    testSet = [0] * 13
    testSet[genreColumn] = 1
    print(testSet)
    test = pd.DataFrame(testSet)
    # run knn to find 10 closest entries
    neigh = knn(data, test, k) # neigh is a vector of row numbers
    # put results in dataframe and grab two random rows
    '''INSERT CODE HERE'''
}
else {
    for x in range(len(sys.argv)):
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
}




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
