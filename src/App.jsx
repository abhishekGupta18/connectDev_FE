
import { NavBar } from "./Components/NavBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Body } from "./Pages/Body"
import { Login } from "./Pages/Login";
import { Feed } from "./Pages/Feed";
import { Profile } from "./Pages/Profile";

function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />


        </Route>

      </Routes>

    </>
  )
}

export default App;
