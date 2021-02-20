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
