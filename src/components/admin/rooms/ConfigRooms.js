import React, {useEffect, useState} from "react";

import {getRooms} from "../../../services/api/rooms/getRooms";
import EditRoomModal from './EditRoomModal';
import AddRoomModal from './AddRoomModal';

const ConfigRoom = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [rooms, setRooms] = useState([])
    const [editingRoom, setEditingRoom] = useState()

    useEffect(() => {
        getRooms()
            .then(response => {
                setRooms(response.data)
            })
            .catch(error => {
                setError(error)
            })
    }, [])

    const handleClickEditRoom = (event, index) => {
        event.preventDefault()
        setEditingRoom(rooms[index])
        setIsAdding(false)
        setIsEditing(true)
    }

    const handleClickAddRoom = (event) => {
        event.preventDefault()
        setIsEditing(false)
        setIsAdding(true)
    }

    return (
        <div className="m-3">
            <h3 className="text-center mb-2">Gestion des salles</h3>
            <div className="w-100">
                {isEditing === true ? <EditRoomModal roomToEdit={editingRoom}/> : ""}
                {isAdding === true ? <AddRoomModal/> : ""}
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Identifiant</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Code postal</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Batiment</th>
                    <th scope="col">active</th>
                    <th scope="col">type</th>
                    <th scope="col">Places assise</th>
                    <th scope="col"/>
                    <th scope="col"/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th>
                        <button onClick={event => handleClickAddRoom(event)} type="button"
                                className="btn btn-success w-100">Ajouter une salle
                        </button>
                    </th>
                </tr>
                </tbody>

                {rooms !== [] ?
                    rooms.map((room, index) => (
                        <tbody>
                        <tr>
                            <th scope="row">{room.id}</th>
                            <td>{room.roomIdentifier}</td>
                            <td>{room.address}</td>
                            <td>{room.zipcode}</td>
                            <td>{room.city}</td>
                            <td>{room.batiment}</td>
                            <td>{room.active === true ? "true" : "false"}</td>
                            <td>{room.type}</td>
                            <td>{room.sitPlace}</td>
                            <td>
                                <button onClick={event => handleClickEditRoom(event, index)} type="button"
                                        className="btn btn-warning w-100">Editer
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))
                    : ""}
            </table>
        </div>
    )
}

export default ConfigRoom;