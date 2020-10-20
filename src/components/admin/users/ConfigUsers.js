import React, {useEffect, useState} from "react";

//Internal Imports
import {getAllUsers} from '../../../services/api/users/getAllUsers'
import EditRoomModal from "../rooms/EditRoomModal";
import AddRoomModal from "../rooms/AddRoomModal";

const ConfigUsers = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        getAllUsers()
            .then(response => {
                setUsersList(response.data)
            })
            .catch(error => {
                setError(error)
            })
    }, [])

    return (
        <div className="m-3">
            <h3 className="text-center mb-2">Gestion des utilisateurs</h3>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">APH</th>
                    <th scope="col">Username</th>
                    <th scope="col">Nom / Prénom</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Bloqué</th>
                </tr>
                </thead>
                {usersList !== [] ?
                    <tbody>
                    {usersList.map(user => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.aph}</td>
                            <td>{user.username}</td>
                            <td>{user.lastName} {user.firstname}</td>
                            <td>{user.email}</td>
                            <td>{user.blocked === true ? "true" : "false"}</td>
                        </tr>
                    ))}
                    </tbody>
                    : ""}
            </table>
        </div>
    )
}

export default ConfigUsers;