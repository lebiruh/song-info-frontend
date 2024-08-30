
import {useAppSelector} from '../../app/hooks'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import SongsNavbar from '../../components/Songs/SongsNavbar'
import ACTION_TYPES from "../../lib/action.types"
import SongsList from '../../components/Songs/SongsList'
import FilteredSongsList from '../../components/Songs/FilteredSongs'



const OuterContainer = styled.div`
  background-color: white;
  height: 100vh;
  width: 100vw;
`

const InnerContainer = styled.div`
  width: 100%;
  text-align: center;
`

const Heading = styled.h2`
  margin-left: 20px;
  margin-bottom: 0;
`

const List = styled.ul`
  margin-top: 0;
`

const ListItem = styled.li`
  list-style: none;
`

type Song = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}


const LandingPage = () => {

  
  const songs = useAppSelector((state) => state.songs)
  const dispatch = useDispatch()
  
  const [searchError, setSearchError] = useState(false);
  const [songObject, setSongObject] = useState<Song[]>([])

  useEffect(() => {
    dispatch({type: ACTION_TYPES.FETCH_SONGS});
    dispatch({type: ACTION_TYPES.FETCH_SONG_STATISTICS});
    dispatch({type: ACTION_TYPES.FETCH_ARTIST_STATISTICS});
    dispatch({type: ACTION_TYPES.FETCH_ALBUM_STATISTICS});
    dispatch({type: ACTION_TYPES.FETCH_GENRE_STATISTICS});
  }, [dispatch]);

  return (
    <OuterContainer>
      <SongsNavbar setSearchError = {setSearchError} setSongObject={setSongObject}/>
      {searchError ? <>
      <p style={{textAlign: "center", width: "100%", marginTop: "20px", fontWeight: "bold"}}>Sorry! No songs found!</p>
        <hr />
      </> : songObject.length > 0 ? <FilteredSongsList songObject = {songObject}/> :
      songs.isLoading ? (
        <p style={{textAlign: "center", width: "100%"}}>Loading songs...</p>
      ) : songs.error ? (
        <p style={{textAlign: "center", width: "100%"}}>Error: {songs.error}</p>
      ) : (
        <>
          <InnerContainer>        
            <Heading>Stats</Heading>
              <List>
                <ListItem>
                  <span style={{fontWeight: 300}}>Total Number of Songs</span> - {songs.totalSongs} 
                </ListItem>
                <ListItem>
                  <span style={{fontWeight: 300}}>Total Number of Artists</span> - {songs.totalArtists} 
                </ListItem>
                <ListItem>
                  <span style={{fontWeight: 300}}>Total Number of Albums</span> - {songs.totalAlbums} 
                </ListItem>
                <ListItem>
                  <span style={{fontWeight: 300}}>Total Number of Genres</span> - {songs.totalGenres} 
                </ListItem>
              </List>
          </InnerContainer>
          <SongsList />
        </>
      )}
    </OuterContainer>
  )
}

export default LandingPage;
