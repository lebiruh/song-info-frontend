
import {useAppSelector} from '../../app/hooks'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import SongsNavbar from '../../components/Songs/SongsNavbar'
import ACTION_TYPES from "../../lib/action.types"
import SongsList from '../../components/Songs/SongsList'
import FilteredSongsList from '../../components/Songs/FilteredSongs'
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import { CircularProgress } from '@mui/material';



const OuterContainer = styled.div`
  background-color: white;
  height: 100vh;
  width: 100vw;
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`

const StatButton = styled.button`

  margin-top: 20px;

  margin-bottom: 10px;
  width: 100px;
  height: 40px;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  background-color: lightblue;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;

  &:hover {
    background-color: #007BFF;
    transition: background-color 0.3s ease;
  }
`

const List = styled.ul`
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
`

const ListItem = styled.li`
  list-style: none;
  font-weight: 400;
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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch({type: ACTION_TYPES.FETCH_SONGS});
    dispatch({type: ACTION_TYPES.FETCH_SONG_STATISTICS});
    dispatch({type: ACTION_TYPES.FETCH_ARTIST_STATISTICS});
    dispatch({type: ACTION_TYPES.FETCH_ALBUM_STATISTICS});
    dispatch({type: ACTION_TYPES.FETCH_GENRE_STATISTICS});
  }, [dispatch]);

  const handleStatButtonClick = () => {
    setOpen((prev) => !prev);
  }

  return (
    <OuterContainer>
      <SongsNavbar setSearchError = {setSearchError} setSongObject={setSongObject}/>
      {searchError ? <>
      <p style={{textAlign: "center", width: "100%", marginTop: "20px", fontWeight: "bold"}}>Sorry! No songs found!</p>
        <hr />
      </> : songObject.length > 0 ? <FilteredSongsList songObject = {songObject}/> :
      songs.isLoading ? (
        <p style={{textAlign: "center", width: "100%"}}><CircularProgress /></p>
      ) : songs.error ? (
        <p style={{textAlign: "center", width: "100%"}}>Error: {songs.error}</p>
      ) : (
        <>
          <InnerContainer>        
            <StatButton onClick={handleStatButtonClick}>Stats { open ? <FaChevronUp style={{ width: "25px", height: "25px"}} /> : <FaAngleDown style={{ width: "30px", height: "30px"}}/>}</StatButton>
              <List style={{ display: open ? 'block' : 'none'}}>
                <ListItem>
                  {songs.totalSongs} <span style={{fontSize: "18px", fontWeight: "400", color: "#0984D1", fontStyle: "italic"}}>-Songs</span>
                </ListItem>
                <ListItem>
                  {songs.totalArtists} <span style={{fontSize: "18px", fontWeight: "400", color: "#0984D1", fontStyle: "italic"}}>-Artists</span> 
                </ListItem>
                <ListItem>
                  {songs.totalAlbums} <span style={{fontSize: "18px", fontWeight: "400", color: "#0984D1", fontStyle: "italic"}}>-Albums</span> 
                </ListItem>
                <ListItem>
                  {songs.totalGenres} <span style={{fontSize: "18px", fontWeight: "400", color: "#0984D1", fontStyle: "italic"}}>-Genres</span> 
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
