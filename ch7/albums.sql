  select title, name, milliseconds, artist_name
    from (
        select albumid, title, artist.name as artist_name
          from   album
            natural join artist
         where artist.name = 'AC/DC'
        ) as artist_albums
        left join   track
    using(albumid)
order by trackid
