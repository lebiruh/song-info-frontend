
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import ACTION_TYPES from '../../lib/action.types'
import { useDispatch } from "react-redux"
import {useAppSelector} from '../../app/hooks'
import { useParams } from 'react-router-dom'

const Container = styled.section`
  width: 500px;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  animation: grow 2s ease-in-out;

  @keyframes grow {
    from {
      opacity: 0;
      transform: scale(0);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media screen and (max-width: 650px) {
    padding-bottom: 20px;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    width: 95%;
    box-shadow: none;
  }
`

const Header = styled.h2`
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
  margin-left: 20px;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;

  @media screen and (max-width: 650px) {
    align-items: center;
    justify-content: center;
    column-gap: 0;
    row-gap: 10px;
  }
`

const TitleInputContainer = styled.div`
  width: 90%;
`
const TitleLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #404040;
`
const TitleInput = styled.input`
  height: 2rem;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 1.2;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);

  &:focus-within {
    border: 2px solid #101010;
  }
`
const ArtistInputContainer = styled.div`
  width: 90%;
`
const ArtistLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #404040;
`
const ArtistInput = styled.input`
  height: 2rem;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 1.2;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);

  &:focus-within {
    border: 2px solid #101010;
  }
`
const AlbumInputContainer = styled.div`
  width: 90%;
`
const AlbumLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #404040;
`
const AlbumInput = styled.input`
  height: 2rem;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 1.2;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);

  &:focus-within {
    border: 2px solid #101010;
  }
`

const GenreInputContainer = styled.div`
  width: 90%;
`
const GenreLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #404040;
`
const GenreInput = styled.input`
  height: 2rem;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 1.2;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);

  &:focus-within {
    border: 2px solid #101010;
  }
`

const ButtonContainer = styled.div`
  width: 90%;

  @media screen and (max-width: 650px) {
    width: 90%;
  }
`

const CreateSongButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  color: #fff;
  border-radius: 25px;
  background-color: #0a66c2;
  cursor: pointer;

  &:hover {
    background-color: #004182;
    transition: background-color 0.5s ease;
  }
`

const Link = styled.a`
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 8px 8px 8px 8px;
  border-radius: 25px;
  color: #0A66C2;

  &:hover {
    background-color: #D0E8FF;
    text-decoration: underline;
  }
`


const UpdateSongForm = () => {

  const {id} = useParams()

  const songs = useAppSelector((state) => state.songs)

  const song = songs.songs.find((song) => song._id === id)

  const [songData, setSongData] = useState({ id: song?._id || "", title: song?.title || "", artist: song?.artist || "", album: song?.album || "", genre: song?.genre || ""})

  const [updateSuccess, setUpdateSuccess] = useState(false)

 const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: ACTION_TYPES.FETCH_SONGS});
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setSongData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  function myTimeout() {
    setUpdateSuccess(true)
  }


  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    dispatch({type: ACTION_TYPES.UPDATE_SONG, payload: songData})
    setSongData({id: "", title: "", artist: "", album: "", genre: ""})
    setTimeout(myTimeout, 500)

  }

  return (
     <Container>
      <div>
        <Header>Edit song</Header>
      </div>
      <FormContainer action="" onSubmit={handleUpdate}>    
        <TitleInputContainer>
          <TitleLabel htmlFor="title">Song Title</TitleLabel>
          <TitleInput type="text" id="title" name="title" required value={songData?.title} onChange={handleChange}/>
        </TitleInputContainer>
        <ArtistInputContainer>
          <ArtistLabel htmlFor="artist">Artist Name</ArtistLabel>
          <ArtistInput type="text" id="artist" name="artist" required value={songData?.artist} onChange={handleChange}/>
        </ArtistInputContainer>
        <AlbumInputContainer>
          <AlbumLabel htmlFor="album">Album Name</AlbumLabel>
          <AlbumInput type="text" id="album" name="album" required value={songData?.album} onChange={handleChange}/>
        </AlbumInputContainer>
        <GenreInputContainer>
          <GenreLabel htmlFor="genre">Genre</GenreLabel>
          <GenreInput type="text" id="genre" name="genre" required value={songData?.genre} onChange={handleChange}/>
        </GenreInputContainer>        
        <ButtonContainer>
          <CreateSongButton type='submit'>Update</CreateSongButton>
        </ButtonContainer>
      </FormContainer>

      {
        updateSuccess && <p style={{color: 'green', width: '90%',  textAlign: 'center'}}>Song updated successfully. Go to<Link href="/">Home</Link></p>
      }
    </Container>
  )
}

export default UpdateSongForm