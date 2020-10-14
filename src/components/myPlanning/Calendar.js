import React from 'react';

// External imports
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/min/locales.min'

//Internal imports
import DetailCard from './DetailCard'

moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null
        };
    }

    handleEventClick(value) {
        this.setState({ events: value.ressource })
    }

    render() {
        return (
            <div>
                {this.state.events ? 
                    <div>
                        <DetailCard event={this.state.events} />
                    </div>
                : "" }
                <div style={{ height: '80vh' }}>
                    <BigCalendar
                        localizer={localizer}
                        events={this.props.eventsObject}
                        step={60}
                        views={'month'}
                        defaultDate={new Date()}
                        toolbar={false}
                        onSelectEvent={(value) => this.handleEventClick(value)}
                    />
                </div>
            </div>
        )
    }
}

export default Calendar;