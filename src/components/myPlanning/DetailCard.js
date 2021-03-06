import React from 'react';

//External imports
import axios from 'axios';

//Internal immports
import EditingModal from './EditingModal';
import { getToken } from '../../services/utils/getToken';

class DetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEvent: this.props.event,
            isEditing: false
        }
    }

    handleEditingClick(e) {
        e.preventDefault()
        this.setState({ isEditing: true })
    }

    handleClickDeleteEvent(e) {
        e.preventDefault()
        let eventId = this.props.event.event.id
        let confirmResp = window.confirm('Supprimer l\'événement ? Cette action sera irremediable')

        if (confirmResp == false) {
            return; 
        } else {
            axios.delete(`http://localhost:1337/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(response => {
                window.location = 'http://localhost:3000/myplanning';
            }).catch(error => {
                console.error(error)
            })
        }
    }


    render() {
        const event = this.props.event.event
        return (
            <div>
                <div className="card my-3">
                    <h5 className="card-header">Votre réservation du {this.state.currentEvent.eventDate}</h5>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nom / Prénom</th>
                                    <th scope="col">Salle</th>
                                    <th scope="col">Adresse</th>
                                    <th scope="col">Code postal</th>
                                    <th scope="col">Ville</th>
                                    <th scope="col">Batiment</th>
                                    <th scope="col">Etage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{event.user_id.lastName} {event.user_id.firstName}</th>
                                    <td>{event.room.roomIdentifier}</td>
                                    <td>{event.room.address}</td>
                                    <td>{event.room.zipcode}</td>
                                    <td>{event.room.city}</td>
                                    <td>{event.room.batiment || "-"}</td>
                                    <td>{event.room.floor}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {this.state.isEditing ?
                        <EditingModal event={event} />
                        : ""}
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-warning float-right m-2 w-25" onClick={event => this.handleEditingClick(event)} >Editer</button>
                        <button className="btn btn-danger float-right m-2 w-25" onClick={event => this.handleClickDeleteEvent(event)}>Supprimer</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailCard;