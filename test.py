Ids = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27,
       10402, 9648, 10749, 878, 10770, 53, 10752, 37]
Score = [0]*18
Genre_score = dict(zip(Ids, Score))
liked_movie_genre = []
disliked_movie_genre = []

genre_list = []  # genre data fromapi
# if liked
liked_movie_genre.extend(genre_list)

# if disliked
disliked_movie_genre.extend(genre_list)

for id in liked_movie_genre:
    Genre_score[id] += 1


for id in disliked_movie_genre:
    Genre_score[id] -= 1

Sorted_genres = sorted(Genre_score.items(), key=lambda x: x[1], reverse=True)
print(Sorted_genres)

URL = "https://api.themoviedb.org/3/search/movie?api_key=d47fa5c0c7cb3abd9ee5fbe08fa22559&query="
Ids = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27,
       10402, 9648, 10749, 878, 10770, 53, 10752, 37]
Genre_name = dict(zip([28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37], ["Action",
                                                                                                                       "Adventure",
                                                                                                                       "Animation",
                                                                                                                       "Comedy",
                                                                                                                       "Crime",
                                                                                                                       "Documentary",
                                                                                                                       "Drama",
                                                                                                                       "Family",
                                                                                                                       "Fantasy",
                                                                                                                       "History",
                                                                                                                       "Horror",
                                                                                                                       "Music",
                                                                                                                       "Mystery",
                                                                                                                       "Romance",
                                                                                                                       "Science Fiction",
                                                                                                                       "TV Movie",
                                                                                                                       "Thriller",
                                                                                                                       "War",
                                                                                                                       "Western"]))
Score = [0]*18
Genre_score = dict(zip(Ids, Score))
# print(Genre_score)

liked_movie_genre = []
disliked_movie_genre = []

# for testing purposes del when done
liked_movie_genre = [28, 12]
disliked_movie_genre = [16, 35]

# when new movie loads
# genre_list = list of genre from api

# if like button pressed
# liked_movie_genre.extend(genre_list)

# if like button pressed
# disliked_movie_genre.extend(genre_list)

# movie_genre = list obtained from api

for id in liked_movie_genre:
    Genre_score[id] += 1


for id in disliked_movie_genre:
    Genre_score[id] -= 1

Sorted_genres = sorted(Genre_score.items(), key=lambda x: x[1], reverse=True)
print(Sorted_genres)

top_user_genres = [x[0] for x in Sorted_genres[0:2]]
print(top_user_genres)

for i in top_user_genres:
    print(Genre_name[i])

keywords = []
keywords = [Genre_name[i] for i in top_user_genres]
for words in keywords:
    URL += words + '+'

print(URL[0:len(URL) - 1])
