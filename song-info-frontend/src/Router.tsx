
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import CreateSong from "./pages/CreateSong/CreateSong";
import UpdateSong from "./pages/UpdateSong/UpdateSong";

const Routing = () => {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/create-song' element={<CreateSong />} />
        <Route path='/update-song/:id' element={<UpdateSong />} />
      </Routes>
    </Router> 
  )
}

export default Routing