import React, {useEffect, useState} from "react";

//External imports
import axios from 'axios';
import qs from 'query-string';

//Internal imports
import {getToken} from "../../../services/utils/getToken";

const AddRoomModal = () => {
    const [room, setRoom] = useState([])
    const [isEditing, setIsEditing] = useState(null)

    useEffect(() => {
        setIsEditing(true)
    }, [])

    const handleChange = event => {
        setRoom({
            ...room,
            [event.target.name]: event.target.value
        })
    }

    const handleClickToggleEdit = event => {
        event.preventDefault()

        setIsEditing(!isEditing)
    }

    const handleSubmit = event => {
        event.preventDefault()

        let roomPrepare = {...room}
        roomPrepare.active ? console.log('oui') : roomPrepare = ({...roomPrepare, active: true})
        roomPrepare.sitPlace ? console.log('oui') : roomPrepare = ({...roomPrepare, sitPlace: 1})
        roomPrepare.type ? console.log('oui') : roomPrepare = ({...roomPrepare, type: "public"})

        const requestBody = roomPrepare

        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

        axios.post('http://localhost:1337/rooms', qs.stringify(requestBody), config)
            .then(response => {
                console.log(response.data)
                window.location = 'http://localhost:3000/admin';
            })
            .catch(error => console.log(error))
    }


    return (
        <div className="container">
            {isEditing === true ?
                <div className="card m-3">
                    <div className="card-header d-flex justify-content-between">
                        <h3>Ajouter une salle</h3>
                        <button onClick={event => handleClickToggleEdit(event)} className="btn btn-secondary">x</button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={event => handleSubmit(event)}>
                            <div className="d-flex">
                                <div className="w-25">
                                    <div className="d-flex justify-content-between flex-wrap">
                                        <div className="d-flex">
                                            <div className="form-group w-75 mx-1">
                                                <label htmlFor="address">Nom de la salle: <span
                                                    className="text-danger">*</span></label>
                                                <input id="roomIdentifier" name="roomIdentifier"
                                                       onChange={event => handleChange(event)} type="text"
                                                       className="form-control" required/>
                                            </div>
                                            <div className="form-check w-25 mx-1">
                                                <input name="active" type="checkbox" className="form-check-input"
                                                       id="exampleCheck1" defaultChecked={true}
                                                       onChange={event => handleChange(event)}/>
                                                <label className="form-check-label"
                                                       htmlFor="exampleCheck1">Active: </label>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="form-group w-25 mx-1">
                                                <label htmlFor="address">Places: <span className="text-danger">*</span></label>
                                                <input id="sitPlace" name="sitPlace"
                                                       onChange={event => handleChange(event)}
                                                       type="number" className="form-control" defaultValue="1"
                                                       required/>
                                            </div>
                                            <div className="form-group w-75 mx-1">
                                                <label htmlFor="address">Type: <small>(defaut public)</small></label>
                                                <select className="form-control" id="address" id="type" name="type"
                                                        onChange={event => handleChange(event)}>
                                                    <option selected>Public</option>
                                                    <option>Manager</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-75">
                                    <div className="d-flex justify-content-between">
                                        <div className="form-group w-50 mx-1">
                                            <label htmlFor="address">Adresse: <span
                                                className="text-danger">*</span></label>
                                            <input id="address" name="address" onChange={event => handleChange(event)}
                                                   type="text"
                                                   className="form-control" required/>
                                        </div>
                                        <div className="form-group w-25 mx-1">
                                            <label htmlFor="address">Code postal: <span className="text-danger">*</span></label>
                                            <input id="zipcode" name="zipcode" onChange={event => handleChange(event)}
                                                   type="text"
                                                   className="form-control" required/>
                                        </div>
                                        <div className="form-group w-25 mx-1">
                                            <label htmlFor="address">Ville: <span
                                                className="text-danger">*</span></label>
                                            <input id="city" name="city" onChange={event => handleChange(event)}
                                                   type="text"
                                                   className="form-control" required/>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="form-group w-50 mx-1 mx-1">
                                            <label htmlFor="address">Batiment: </label>
                                            <input id="batiment" name="batiment" onChange={event => handleChange(event)}
                                                   type="text"
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group w-50 mx-1 mx-1">
                                            <label htmlFor="address">Etage: </label>
                                            <input id="floor" name="floor" onChange={event => handleChange(event)}
                                                   type="number"
                                                   className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right m-1">Ajouter</button>
                        </form>
                    </div>
                </div>
                : ""}
        </div>
    )
}

export default AddRoomModal;