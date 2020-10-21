import React, {useEffect, useState} from "react";

//External Imports
import axios from 'axios'
import qs from 'query-string'

//Internal Imports
import {getAllUsers} from '../../../services/api/users/getAllUsers'
import {getToken} from "../../../services/utils/getToken";

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

    const handleClickBlockUser = (event, user) => {
        event.preventDefault()
        let value = event.target.value
        let userId = user.id

        if (value === "block") {
            value = true
        } else if (value ==="unblock") {
            value = false
        }

        const requestBody = {
            blocked: value
        }

        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

        axios.put(`http://localhost:1337/users/${userId}`, qs.stringify(requestBody), config)
            .then(response => {
                window.location = '/admin'
            })
            .catch((error => [console.log(error)]))
    }


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
                    <th scope="col"></th>
                    <th scope="col"></th>
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
                            {user.blocked === true ?
                                <div>
                                    <td>true</td>
                                    <td className="w-100">
                                        <button onClick={(event) => handleClickBlockUser(event, user)} value="unblock" className="btn btn-success w-100">Débloquer</button>
                                    </td>
                                </div>
                                : <div>
                                    <td>false</td>
                                    <td className="w-100">
                                        <button onClick={(event) => handleClickBlockUser(event, user)} value="block" className="btn btn-danger w-100">Bloquer</button>
                                    </td>
                                </div>
                            }
                        </tr>
                    ))}
                    </tbody>
                    : ""}
            </table>
        </div>
    )
}

export default ConfigUsers;