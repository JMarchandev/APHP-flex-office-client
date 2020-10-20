import React, {useEffect, useState} from "react";

//External Import
import BigCalendar from "react-big-calendar";
import moment from "moment";

//Internal Imports
import {getAllEvents} from '../../../services/api/events/getAllEvents'
import {constructEventObject} from "../../../services/utils/constructEventObject";

moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);

const ConfigEvents = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [eventsList, setEventsList] = useState([])

    useEffect(() => {
        getAllEvents()
            .then(response => {
                setEventsList(constructEventObject(response.data))
            })
            .catch(error => {setError(error)})
    }, [])

     console.log(eventsList)
    return(
        <div style={{ height: '80vh' }}>
            <BigCalendar
                localizer={localizer}
                events={eventsList}
                step={60}
                views={'month'}
                defaultDate={new Date()}
                toolbar={true}
                onSelectEvent={value => console.log(value)}
            />
        </div>
    )
}

export default ConfigEvents;