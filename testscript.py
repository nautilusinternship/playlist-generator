def main():
    ''' PARSE COMMAND LINE ARGS '''
    # sys.argv[1] for testing: 1~6nipZlJiUvI0I7lCf1Z7Li~5BBBxfYZuMVGuyh9L0LcVWjzE~VECTOR~0,0,0.8,0,0.1,0,0,0,0,0.55,0.8,0,0.6
    args_array = sys.argv[1].split('~VECTOR~')
    front = args_array[0].split('~') # round & uris seen
    round_num = int(front[0]) # round number
    if (round_num == 0):
        genre = front[1]
    print(genre)

if __name__ == '__main__':
    main()
