
import { NavBar } from "./Components/NavBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Body } from "./Pages/Body"
import { Login } from "./Pages/Login";

function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Body />} ><Route path="/login" element={<Login />} /></Route>

      </Routes>

    </>
  )
}

export default App;
