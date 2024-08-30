import styled from '@emotion/styled'
import image from '../../assets/placeholderAlbumArt.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import ACTION_TYPES from '../../lib/action.types'

const SongContainer = styled.div`
  height: 375px;
  width: 350px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`

const Link = styled.a`
  text-decoration: none;
  color: rgb(35,35,35);
`

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  max-height: 250px;
  background-color: #EDF3F8;
`
const SongTitle = styled.h2`
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 300;
`

const Artist = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(9, 132, 209);
  margin-bottom: 0;
  margin-top: 0;
`

const Album = styled.p`
  text-align: center;
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 0;
  color: rgb(9, 132, 209);
`
const ButtonContainer = styled.div`
  width: 80%;
  margin-left: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`
const DeleteButton = styled.button`
  background-color: gray;
  border: none;
  border-radius: 5px;
  width: 75px;
  color: #fff;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #C0C0C0;
    transition: background-color 0.3s ease;
  }
`

const UpdateButton = styled.button`
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  width: 75px;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #007BFF;
    transition: background-color 0.3s ease;
  }
`


type data = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}

interface songProp {
  song: data;
}



const Song:React.FC<songProp> = ({song}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleEditClick = () => {
    navigate(`update-song/${song._id}`)
  }

  const handleDelete = async () => {
    dispatch({type: ACTION_TYPES.DELETE_SONG, payload: song._id})
  }

  return (
    <SongContainer >
      <Link href='#'>        
        <Img src={image} alt="album art" />
        <SongTitle>{song.title}</SongTitle>
        <Artist>{song.artist}</Artist>
        <Album>{song.album}</Album>
      </Link>
      <ButtonContainer>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        <UpdateButton onClick={handleEditClick}>Edit</UpdateButton>
      </ButtonContainer>
    </SongContainer>
  )
}

export default Song