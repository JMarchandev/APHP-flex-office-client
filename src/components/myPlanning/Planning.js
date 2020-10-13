import React, { useEffect, useState } from 'react';

//External imports
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/min/locales.min'

//Internal imports
import { getCurrentUser } from '../../services/api/getCurrentUser';
import { getMyEvents } from '../../services/api/events/getMyEvents';
import { getFormartedDate } from '../../services/utils/getFormartedDate';

moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object
    .keys(BigCalendar.Views)
    .map(k => BigCalendar.Views[k])

const Planning = () => {
    const [myEvents, setMyEvents] = useState(null)
    const [currentUser, setCurrentUser] = useState([])
    const [eventObject, setEventObject] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }))
    const [detailCard, setDetailCard] = useState(null)

    useEffect(() => {
        async function getEvents() {
            getCurrentUser()
                .then(response => {
                    console.log(response);
                    setCurrentUser(response.data)

                    getMyEvents(response.data.id)
                        .then(response => {
                            console.log(response.data);
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
                                        capacity: response.data[i].room.sitPlace
                                    }
                                }
                                object.push(constructObject)
                            }
                            setEventObject(object);
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
        console.log(event);
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
            capacity: event.ressource.capacity
        })


    }

    console.log(detailCard)
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
        Sun: 'Dimanche', // Or anything you want
        showMore: total => `+ ${total} événement(s) supplémentaire(s)`
    }

    return (
        <div className="container">
            <div>
                {detailCard ?
                    <div class="card my-3">
                        <h5 class="card-header">Votre réservation du {detailCard.start}</h5>
                        <div class="card-body">
                            <h5 class="card-title">Details</h5>
                            <p class="card-text">Salle: {detailCard.title} / Adresse: {detailCard.address} / Ville: {detailCard.city} / Code Postal: {detailCard.zipCode}</p>
                            <button class="btn btn-primary">Go somewhere</button>
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