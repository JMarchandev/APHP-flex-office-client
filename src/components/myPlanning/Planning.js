import React, { useState, useEffect } from 'react';

//Internal imports
import Calendar from './Calendar';
import { getCurrentUser } from '../../services/api/getCurrentUser'
import { getEventsByUserId } from '../../services/api/events/getEventsByUserId'
import { constructEventObject } from './constructEventObject';

//CSS imports
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

const Planning = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [userEvents, setUserEvents] = useState([])
    const [eventsObject, setEventsObject] = useState([])

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setCurrentUser(response.data)
                getEventsByUserId(response.data.id)
                    .then(response => { 
                        setUserEvents(response.data) 
                        setEventsObject(constructEventObject(response.data))
                    })
                    .catch(error => { setError(error) })
            })
            .catch(error => { setError(error) })
    }, [])

    return (
        <div>
            <Calendar eventsObject={eventsObject} />
        </div>
    )
}

export default Planning;