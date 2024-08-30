import styled from '@emotion/styled'


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
`


const Navbar = () => {


  return (
    <NavbarContainer>      
      <LogoInputContainer>
        <LogoInput>SongsInfo</LogoInput>
      </LogoInputContainer>
    </NavbarContainer>
  )
}

export default Navbar;