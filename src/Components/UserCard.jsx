
export const UserCard = ({ user }) => {


    const { firstName, lastName, photoUrl, about, gender, age, skills } = user

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
                    <button className="btn btn-secondary">Interested</button>
                    <button className="btn btn-primary">Ignore</button>

                </div>
            </div>
        </div>
    )
}