import React, {useEffect, useState} from "react";

//External imports
import axios from 'axios';
import qs from 'query-string'

//Internal imports
import {getToken} from "../../../services/utils/getToken";

const EditRoomModal = (props) => {
    const [room, setRoom] = useState()
    const [isEditing, setIsEditing] = useState()

    useEffect(() => {
        setIsEditing(true)
        setRoom(props.roomToEdit)
    }, [props.roomToEdit])

    const handleChange = event => {
        setRoom({
            ...room,
            [event.target.name]: event.target.value
        })
    }

    const handleActiveCheckChange = () => {
        setRoom({
            ...room,
            active: !room.active
        })
    }

    const handleClickToggleEdit = event => {
        event.preventDefault()
        setIsEditing(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = room

        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

        axios.put(`http://localhost:1337/rooms/${room.id}`, qs.stringify(requestBody), config)
            .then(response => {
                console.log(response.data)
                window.location = 'http://localhost:3000/admin';
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleClickDeleteRoom = event => {
        event.preventDefault()

        let confirmResp = window.confirm(`Supprimer la salle ${room.roomIdentifier} ? Cette action sera irremediable`)

        if (confirmResp === false) {
            return;
        } else {
            axios.delete(`http://localhost:1337/rooms/${room.id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(response => {
                window.location = 'http://localhost:3000/admin';
            }).catch(error => {
                console.error(error)
            })
        }
    }

    return (
        <div className="container ">
            {isEditing === true ?
                <div className="card m-3">
                    <div className="card-header d-flex justify-content-between">
                        <h3>{props.roomToEdit.roomIdentifier}</h3>
                        <button onClick={event => handleClickToggleEdit(event)} className="btn btn-secondary">x</button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={event => handleSubmit(event)}>
                            <div className="d-flex">
                                <div className="w-25">
                                    <div className="d-flex justify-content-between flex-wrap">
                                        <div className="d-flex">
                                            <div className="form-group w-75 mx-1">
                                                <label htmlFor="address">Nom de la salle: </label>
                                                <input id="roomIdentifier" name="roomIdentifier"
                                                       onChange={event => handleChange(event)} type="text"
                                                       value={room.roomIdentifier} className="form-control"/>
                                            </div>
                                            <div className="form-check w-25 mx-1">
                                                <input name="active" type="checkbox" className="form-check-input"
                                                       id="exampleCheck1"
                                                       defaultChecked={room.active}
                                                       onChange={event => handleActiveCheckChange(event)}/>
                                                <label className="form-check-label"
                                                       htmlFor="exampleCheck1">Active: </label>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group w-50 mx-1">
                                                <label htmlFor="address">Places assise: </label>
                                                <input id="sitPlace" name="sitPlace"
                                                       onChange={event => handleChange(event)}
                                                       type="number"
                                                       value={room.sitPlace} className="form-control"/>
                                            </div>
                                            <div className="form-group w-50 mx-1">
                                                <label htmlFor="address">Type: </label>
                                                <select className="form-control" id="address" id="type" name="type"
                                                        onChange={event => handleChange(event)}>
                                                    <option>Public</option>
                                                    <option>Manager</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-75">
                                    <div className="d-flex justify-content-between">
                                        <div className="form-group w-50 mx-1">
                                            <label htmlFor="address">Adresse: </label>
                                            <input id="address" name="address" onChange={event => handleChange(event)}
                                                   type="text"
                                                   value={room.address} className="form-control"/>
                                        </div>
                                        <div className="form-group w-25 mx-1">
                                            <label htmlFor="address">Code postal: </label>
                                            <input id="zipcode" name="zipcode" onChange={event => handleChange(event)}
                                                   type="text"
                                                   value={room.zipcode} className="form-control"/>
                                        </div>
                                        <div className="form-group w-25 mx-1">
                                            <label htmlFor="address">Ville: </label>
                                            <input id="city" name="city" onChange={event => handleChange(event)}
                                                   type="text"
                                                   value={room.city} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="form-group w-50 mx-1 mx-1">
                                            <label htmlFor="address">Batiment: </label>
                                            <input id="batiment" name="batiment" onChange={event => handleChange(event)}
                                                   type="text"
                                                   value={room.batiment} className="form-control"/>
                                        </div>
                                        <div className="form-group w-50 mx-1 mx-1">
                                            <label htmlFor="address">Etage: </label>
                                            <input id="floor" name="floor" onChange={event => handleChange(event)}
                                                   type="number"
                                                   value={room.floor} className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={event => handleClickDeleteRoom(event)} type="button"
                                    className="btn btn-danger float-right mx-1">Supprimer
                            </button>
                            <button type="submit" className="btn btn-primary float-right mx-1">Modifier</button>
                        </form>
                    </div>
                </div>
                : ""
            }
        </div>
    )
}

export default EditRoomModal;