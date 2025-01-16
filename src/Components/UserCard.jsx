import axios from "axios"
import { baseURL } from "../utils/constant"

export const UserCard = ({ user, userFeed }) => {


    const { _id, firstName, lastName, photoUrl, about, gender, age, skills } = user

    const handleSendRequest = async (status, id) => {
        try {

            const res = await axios.post(baseURL + "/request/send/" + status + "/" + id, {}, { withCredentials: true })
            userFeed()

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {gender && <p>gender : {gender}</p>}
                {age && <p> age : {age}</p>}
                {<h4>skills -</h4>}
                {skills.map((skill, index) => <p key={index}>{skill}</p>)
                }
                <p>about : {about}</p>
                <div className="card-actions flex  justify-centre">
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>

                </div>
            </div>
        </div>
    )
}