import anosql
import psycopg2 
import argparse 
import sys 

PGCONNSTRING = "user=postgres password=stanislav100 dbname=chinook"


class chinook(object):
    """Our database model and queries"""
    def __init__(self):
        self.pgconn = psycopg2.connect(PGCONNSTRING)
        self.queries = anosql.from_path('./sql', 'psycopg2')
    
    def genre_list(self):
        return self.queries.tracks_by_genre(self.pgconn)
    
    def genre_top_n(self, n):
        return self.queries.genre_top_n(self.pgconn, n=n)

    def artists_by_album(self, n):
        return self.queries.top_artists_by_album(self.pgconn, n=n)

    def album_length_for_artist(self, name):
        return self.queries.list_albums_by_artist(self.pgconn, name=name)
   

db = chinook()

# print('artists by album')
# print(db.artists_by_album(3))

print('genre-top-n')
print(db.genre_top_n(2))


# print('album-length-for-artist')
# print(db.album_length_for_artist('Red Hot Chili Peppers'))




