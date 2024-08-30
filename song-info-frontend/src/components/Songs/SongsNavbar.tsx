import styled from '@emotion/styled'
import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';



const NavbarContainer = styled.div`
  position: sticky;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  background-color: #fff;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 650px) {
    flex-direction: column;
    gap: 0.5em;
  }
`
const LogoInputContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;  
  margin-left: 10px;
  
  @media screen and (max-width: 650px) {
    flex-direction: column;
    gap: 0.5em;
  }
`
const LogoInput = styled.div`
  font-family: sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  color: #0A66C2;
  font-size: 20px;
  cursor: pointer;

`

const InputContainer = styled.div`
  width: 300px;
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: #EDF3F8;
  margin-left: 10px;
  height: 40px;


  &:focus-within {
    width: 400px;
    border: 2px solid #101010;
    transition: width 0.5s ease, border 0.5s ease;
  }
`

const SearchInput = styled.input`
  height: 40px;
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 18px;
  padding: 10px;
`

const ButtonContainer = styled.div`
  margin-right: 25px;
  display: flex;
  align-items: center;  
`

const StyledButton = styled.button`
  width: 150px;
  height: 40px;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 20px;
  background-color: #0a66c2;
  font-size: 1rem;
  font-weight: 400;

  &:hover {
    background-color: #004182;
    transition: background-color 0.3s ease;
  }
  
`

type Song = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}

interface SearchError {
  setSearchError: (hasError: boolean) => void;
  setSongObject: (songObject: Song[]) => void;
}

const SongsNavbar: React.FC<SearchError> = ({setSearchError, setSongObject}) => {

  const [search, setSearch] = useState('')

  const songs = useAppSelector((state) => state.songs.songs)

  const navigate = useNavigate();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleAddSongClick = () => {
    navigate('/create-song')
  }

  const handleLogoClick = () => {
    setSongObject([])
    setSearchError(false)
  }

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const lowerCaseSearchValue = search.toLowerCase().trim();

    const value = songs.filter(song => {
      return (
        song.title === lowerCaseSearchValue ||
        song.genre === lowerCaseSearchValue ||
        song.artist === lowerCaseSearchValue ||
        song.album === lowerCaseSearchValue
      )     
    })

    if(value.length === 0) {
      setSearchError(true)
    }
    
    setSongObject(value);

    setSearch('') 
  }

  return (
    <NavbarContainer>      
      <LogoInputContainer>
        <LogoInput onClick={handleLogoClick}>SongsInfo</LogoInput>
        <InputContainer>
          <IoMdSearch style={{ width: "40px", height: "24px", color:'#3B3D3E', cursor: "pointer" }}/>
          <form action="" onSubmit={handleSearchClick}>
            <SearchInput type='text' placeholder='Search...' onChange={handleChange} value={search}/>
          </form>
        </InputContainer>
      </LogoInputContainer>
      <ButtonContainer>
        <StyledButton onClick={handleAddSongClick}>Add New Song</StyledButton>
      </ButtonContainer>
    </NavbarContainer>
  )
}

export default SongsNavbar;