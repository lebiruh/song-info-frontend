import Song from "./Song"
import styled from '@emotion/styled'

const SongsContainer = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  max-width: 1600px;
  gap: 30px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 15px;
  place-items: center;
`

type Song = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}

interface FilteredSongs {
  songObject: Song[];
}

const FilteredSongsList: React.FC<FilteredSongs> = ({songObject}) => {  

  return (
    <SongsContainer>
      {
        songObject?.map((song, i) => {
          return <Song song = {song} key={i}/>
        })
      }
    </SongsContainer>
  )
}

export default FilteredSongsList