select artist.name as artist_name,
       inspired.name as inspired_name,
       album.title as album_title,
       track.name as track_name
  from      artist
    join    track on track.name = artist.name
    join    album on album.albumid = track.albumid
    join    artist inspired on inspired.artistid = album.artistid
 where artist.artistid <> inspired.artistid

