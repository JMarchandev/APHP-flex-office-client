import React from 'react'
import Calendar from "react-calendar";

//Internal imports
import UpdateEventForm from './UpdateEventForm'

class EditingModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            event: this.props.event,
            newDate: null
        }
    }

    handleSelectNewDate(date) {
        this.setState({newDate: date})
    }

    render() {
        const event = this.props.event
        return (
            <div className="d-flex m-4">
                <div className="w-75 mr-2">
                    <Calendar
                        className="w-100"
                        onClickDay={(value) => this.handleSelectNewDate(value)}
                        value={new Date(event.eventDate)}
                    />
                </div>
                <UpdateEventForm event={this.props.event} newDate={this.state.newDate} />
            </div>
        )
    }
}

export default EditingModal;