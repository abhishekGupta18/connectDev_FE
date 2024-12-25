
import { Outlet } from "react-router-dom"
import { NavBar } from "../Components/NavBar"
export const Body = () => {
    return <div>

        <NavBar />
        <Outlet />

    </div>
}
