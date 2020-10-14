import React, { useEffect, useState } from 'react';

//External imports
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

//Internal imports
import { getDateMonthYear } from '../../../services/utils/getDateMonthYear';
import { getMyEvents } from '../../../services/api/events/getMyEvents';


moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);
const PlanningBis = () => {
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    const [currentDate, setCurrentDate] = useState(getDateMonthYear(new Date()))
    const [myEvents, setMyEvents] = useState(getMyEvents())

useEffect(() => {
    console.log(getMyEvents())
})

    const handleEventClick = (event) => {
        console.log(myEvents);
    }

    return (
        <div className="container">
            <div style={{ height: '80vh' }}>
                <h4 className="text-center my-3">{currentDate}</h4>
                <BigCalendar
                    localizer={localizer}
                    events={[{ title: "test", start: "2020-10-14", end: "2020-10-14", allDay: true, ressource: null }]}
                    step={60}
                    views={'month'}
                    defaultDate={new Date()}
                    toolbar={false}
                    onSelectEvent={(event) => handleEventClick(event)}
                />
            </div>
        </div>
    )
}

export default PlanningBis;