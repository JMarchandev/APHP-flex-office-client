import React, { useEffect } from 'react';
import { getCurrentUser } from '../../services/api/getCurrentUser';
import { getAvailableRoomsByDate } from '../../services/api/events/getAvailableRoomsByDate';
import { getCalendarFormatedDate } from '../../services/utils/getCalendarFormatedDate';
import { getRooms } from '../../services/api/getRooms';

class UpdateEventForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoading: false,
            event: [],
            rooms: [],
            newDate: null,
            currentUser: []
        }
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

    render() {
        let newDate;
        const event = this.props.event
        const { isLoading, rooms, error } = this.state

        if (this.props.newDate !== null) {
            newDate = getCalendarFormatedDate(this.props.newDate)
        }

        return (
            <div className="w-25 ml-2" >
                <form >
                    {error ?
                        <div class="alert alert-danger" role="alert">
                            {error}
                        </div>
                        : ""}
                    <div className="form-group">
                        <label>Changer de salle ?</label>
                        {isLoading ? "loading" :
                            <select name="room" className="form-control">
                                <option selected="selected">Selectionnez une salle</option>
                                {rooms.map((room) =>
                                    <option value={room}>{room.roomIdentifier}</option>
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