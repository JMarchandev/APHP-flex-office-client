import React from 'react';

//Internal imports 
import { getCurrentUser } from '../../services/api/users/getCurrentUser';
import { getAvailableRoomsByDate } from '../../services/api/events/getAvailableRoomsByDate';
import { getCalendarFormatedDate } from '../../services/utils/getCalendarFormatedDate';
import { getRooms } from '../../services/api/rooms/getRooms';
import { getToken } from '../../services/utils/getToken';

//External inmports
import axios from 'axios';
import qs from 'querystring'

class UpdateEventForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoading: false,
            event: [],
            rooms: [],
            newDate: null,
            newRoom: null,
            currentUser: []
        }
        this.handleRoomChange = this.handleRoomChange.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true, event: this.props.event })
        getCurrentUser()
            .then(response => {
                this.setState({ currentUser: response.data })
                getRooms()
                    .then(response => {
                        this.setState({ rooms: response.data, isLoading: false })
                    })
                    .catch(error => {
                        this.setState({ error, isLoading: false })
                    })
            })
            .catch(error => {
                this.setState({ error, isLoading: false })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newDate !== this.state.newDate) {
            this.setState({ error: null })

            getAvailableRoomsByDate(getCalendarFormatedDate(nextProps.newDate), this.state.currentUser.id)
                .then(response => {
                    this.setState({ rooms: response.data })
                })
                .catch(error => { this.setState({ error: "Vous avez deja une reservation ce jour. Vous pouvez uniquement changer de salle" }) })
            this.setState({ newDate: getCalendarFormatedDate(nextProps.newDate) });
        }
    }

    handleRoomChange(event) {
        this.setState({ newRoom: this.state.rooms[event.target.value] })
    }

    handleSubmit(event) {
        event.preventDefault()
        let eventDate;
        let user;
        let room;
        let eventId = this.state.event.id

        if (this.props.newDate) {
            eventDate = getCalendarFormatedDate(this.props.newDate)
        } else {
            eventDate = event.target.currentEventDate.value
        }

        if (this.state.newRoom !== null) {
            room = this.state.newRoom.id
        } else {
            room = this.state.event.room.id
        }

        user = this.state.currentUser.id

        const requestBody = {
            eventDate: eventDate,
            user_id: user,
            room: room,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

        axios.put(`http://localhost:1337/events/${eventId}`, qs.stringify(requestBody), config)
            .then(response => { 
                window.location = 'http://localhost:3000/myplanning';
            })
            .catch(error => { console.log(error) })
    }

    render() {
        let newDate;
        const event = this.props.event
        const { isLoading, rooms, error } = this.state

        if (this.props.newDate !== null) {
            newDate = getCalendarFormatedDate(this.props.newDate)
        }

        return (
            <div className="w-25 ml-2" >
                <form onSubmit={event => this.handleSubmit(event)}>
                    {error ?
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                        : ""}
                    <div className="form-group">
                        <label>Changer de salle ?</label>
                        {isLoading ? "loading" :
                            <select onChange={event => this.handleRoomChange(event)} className="form-control">
                                <option selected="selected">Selectionnez une salle</option>
                                {rooms.map((room, index) =>
                                    <option name="room" value={index}>{room.roomIdentifier}</option>
                                )}
                            </select>
                        }
                    </div>
                    <div className="form-group">
                        <label>Date actuel de l'évenement</label>
                        <input name="currentEventDate" className="form-control" value={event.eventDate} />
                    </div>

                    {error ? "" :
                        <div className="form-group">
                            <label>Nouvelle date de l'évenement</label>
                            <input name="newEventdate" className="form-control" value={newDate} placeholder="Choisissez sur une date" />
                        </div>
                    }

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default UpdateEventForm;