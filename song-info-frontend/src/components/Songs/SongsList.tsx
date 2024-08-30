import {useAppSelector} from '../../app/hooks'
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
  place-items: center;
`

const SongsList = () => {

  const songs = useAppSelector((state) => state.songs)

  return (
    <SongsContainer>
      {
        songs?.songs?.map((song, i) => {
          return <Song song = {song} key={i}/>
        })
      }
    </SongsContainer>
  )
}

export default SongsList