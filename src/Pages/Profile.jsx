import { useSelector } from "react-redux"
import { EditProfile } from "../Components/EditProfile"

export const Profile = () => {

    const user = useSelector((store) => store.user);


    return <>

        {user && <EditProfile user={user} />}

    </>

}