import React, { useEffect, useState } from 'react';

//External imports
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/min/locales.min'
import Calendar from "react-calendar";
import axios from 'axios';
import qs from 'querystring'

//Internal imports
import { getCurrentUser } from '../../../services/api/users/getCurrentUser';
// import { getMyEvents } from '../../services/api/events/getMyEvents';
import { getFormartedDate } from '../../../services/utils/getFormartedDate';
import { getRooms } from '../../../services/api/rooms/getRooms';
import { getToken } from '../../../services/utils/getToken'

moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object
    .keys(BigCalendar.Views)
    .map(k => BigCalendar.Views[k])

const Planning = () => {
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [myEvents, setMyEvents] = useState(null)
    const [currentUser, setCurrentUser] = useState([])
    const [eventObject, setEventObject] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long'
    }))
    const [detailCard, setDetailCard] = useState(null)
    const [rooms, setRooms] = useState(null)
    const [newEditingDate, setNewEditingDate] = useState(null)

    useEffect(() => {
        async function getEvents() {
            getCurrentUser()
                .then(response => {
                    setCurrentUser(response.data)

                    getMyEvents(response.data.id)
                        .then(response => {
                            setMyEvents(response.data)
                            let object = []

                            for (let i = 0; i < response.data.length; i++) {
                                let constructObject = {
                                    title: response.data[i].room.roomIdentifier,
                                    start: response.data[i].eventDate,
                                    end: response.data[i].eventDate,
                                    allDay: true,
                                    ressource: {
                                        id: response.data[i].room.id,
                                        address: response.data[i].room.address,
                                        batiment: response.data[i].room.batiment,
                                        city: response.data[i].room.city,
                                        zipCode: response.data[i].room.zipcode,
                                        floor: response.data[i].room.floor,
                                        capacity: response.data[i].room.sitPlace,
                                        eventId: response.data[i].id
                                    }
                                }
                                object.push(constructObject)
                            }
                            setEventObject(object);
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    getRooms()
                        .then(response => {
                            setRooms(response.data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch(error => {
                    console.log(error)
                });
        }

        getEvents()
    }, [])

    const handleEventClick = (event) => {
        setDetailCard({
            id: event.ressource.id,
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            address: event.ressource.address,
            batiment: event.ressource.batiment,
            city: event.ressource.city,
            zipCode: event.ressource.zipCode,
            floor: event.ressource.floor,
            capacity: event.ressource.capacity,
            eventId: event.ressource.eventId
        })
    }

    const handleEditingClick = event => {
        event.preventDefault()
        setIsEditing(true)
    }

    const handleEditingChangeDate = (value) => {

        value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
        const dateFormated = value.toISOString().split('T')[0];

        setNewEditingDate(dateFormated)
    }

    const handleEditingSubmit = (event, id) => {
        event.preventDefault()
        let date;
        const roomId = event.target.options

        if (newEditingDate) {
            date = newEditingDate
        } else {
            date = event.target.currentEventDate.value;
        }

        console.log(roomId);

        const requestBody = {
            room: rooms[roomId],
            eventDate: date,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

        console.log(requestBody)

        // axios.put(`http://localhost:1337/events/${id}`, qs.stringify(requestBody), config)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => { console.log(error) })
    }

    const messages = {
        allDay: 'journée',
        previous: 'précédent',
        next: 'suivant',
        today: 'Mois en cours',
        month: 'mois',
        week: 'semaine',
        day: 'jour',
        agenda: 'Agenda',
        date: 'date',
        time: 'heure',
        event: 'événement',
        Sun: 'Dimanche',
        showMore: total => `+ ${total} événement(s) supplémentaire(s)`
    }

    return (
        <div className="container">
            <div>
                {detailCard ?
                    <div className="card my-3">
                        <h5 className="card-header">Votre réservation du {detailCard.start}</h5>
                        <div className="card-body">
                            {isEditing ? "" :
                                <div>
                                    <h5 className="card-title">Details</h5>
                                    <p className="card-text">Salle: {detailCard.title} / Adresse: {detailCard.address} /
                                    Ville: {detailCard.city} / Code Postal: {detailCard.zipCode}</p>
                                </div>
                            }
                            <div>
                                {isEditing ?
                                    <div className="d-flex">
                                        <div className="w-75 mr-2">
                                            <Calendar
                                                className="w-100"
                                                onClickDay={(value) => handleEditingChangeDate(value)}
                                                value={new Date(detailCard.start)}
                                            />
                                        </div>
                                        <div className="w-25 ml-2">
                                            <form onSubmit={event => handleEditingSubmit(event, detailCard.eventId)}>
                                                <div className="form-group">
                                                    <label>Choisir une salle</label>
                                                    <select name="room" className="form-control">
                                                        {rooms.map((room) =>
                                                            <option key={room.id}>{room.roomIdentifier}</option>
                                                        )}

                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Date actuel</label>
                                                    <input name="currentEventDate" className="form-control" value={detailCard.start} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Nouvelle date</label>
                                                    <input name="newEventdate" className="form-control" placeholder="Choisissez sur une date" value={newEditingDate} />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                    : ""}
                            </div>
                            <button className="btn btn-danger float-right m-2">Supprimer</button>
                            <button onClick={event => handleEditingClick(event)}
                                className="btn btn-warning float-right m-2">Editer
                                </button>
                        </div>
                    </div>
                    : ""}
            </div>
            <div style={{ height: '80vh' }}>
                <h4 className="text-center my-3">{currentDate}</h4>
                {eventObject ?
                    <BigCalendar
                        messages={messages}
                        localizer={localizer}
                        events={eventObject}
                        step={60}
                        views={'month'}
                        defaultDate={new Date()}
                        toolbar={false}
                        onSelectEvent={(event) => handleEventClick(event)}
                    />
                    : ""}
            </div>
        </div>
    )
}

export default Planning;