import CreateSongForm from "../../components/CreateSongsForm/CreateSongsForm"
import styled from '@emotion/styled'
import Navbar from "../../components/Navbar/Navbar"


const Container = styled.div`
  width: 100vw;
  height: 83vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F3F2F0;

  @media screen and (max-width: 900px) {
    height: 100vh;
  }
`


const CreateSong = () => {
  return (
    <>
      <Navbar />
      <Container className="signup_container">    
        <CreateSongForm />
      </Container>
    </>
  )
}

export default CreateSong