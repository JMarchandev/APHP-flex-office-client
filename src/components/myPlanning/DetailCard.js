import React from 'react';

class DetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEvent: this.props.event
        }
    }

    handleEditingClick(e) {
        e.preventDefault()

    }


    render() {
        const event = this.state.currentEvent.event
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
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-warning float-right m-2 w-25" onClick={event => this.handleEditingClick(event)} >Editer</button>
                        <button className="btn btn-danger float-right m-2 w-25">Supprimer</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailCard;