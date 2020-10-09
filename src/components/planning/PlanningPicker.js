import React, {useState, useEffect} from "react";
import axios from 'axios'

//Internal imports
import {getToken} from "../../services/utils/getToken";
import {getRooms} from "../../services/api/getRooms";

//External imports
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {getCurrentUser} from "../../services/api/getCurrentUser";

const PlanningPicker = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectDateFormat, setSelectDateFormat] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectDateRooms, setSelectDateRooms] = useState(null)
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectDate, setSelectDate] = useState(null)
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    getRooms()
      .then(response => {
        setRooms(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  useEffect(() => {
    if (selectedRoom && selectDate) {
      selectDate.setMinutes(selectDate.getMinutes() - selectDate.getTimezoneOffset());
      const dateFormat = selectDate.toISOString().split('T')[0].replaceAll('-', '');

      axios
        .get(`http://localhost:1337/events?eventDate=${dateFormat}&room=${selectedRoom.id}`, {
            headers: {
              authorization: `Bearer ${getToken()}`
            }
          }
        )
        .then(response => {
          setSelectDateRooms(response.data)
        })
        .catch(error => {
          setError(error)
        })
    }
  }, [selectedRoom, selectDate])

/*  useEffect(async () => {
     await axios
      .post(`http://localhost/1337/events`, {
        headers: {authorization: `Bearer ${getToken()}`},
        body: {eventDate: selectDate, room: selectedRoom.id, user_id: currentUser.id}
      })
      .then(response => {
        setSuccess(response.data.message)
      })
      .catch(error => {
        console.log(error)
        setError(error.message)
      })
  }, [])*/

  const handleClickRoom = (event, room) => {
    event.preventDefault()
    setSelectedRoom(room)
  }

  const handleClickChooseDate = (value) => {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    setSelectDateFormat(value.toLocaleDateString('fr-FR', options))
    //if (value < currentDate) {
    //  setError('Cette date est déjà passée')
    //} else if (value >= currentDate) {
    //  setError(null)

    axios.get(`http://localhost:1337/event/20201006`)
      .then(response => {
      console.log(response)
    }).catch(error => {console.log(error)})
    setSelectDate(value)
    //}
  }

  const handleSubmitBooking = e => {
    e.preventDefault()

    getCurrentUser().then(response => {
      console.log(response.data)
      setCurrentUser(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      {error ?
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        : ""
      }
      {success ?
        <div className="alert alert-danger" role="alert">
          {success}
        </div>
        : ""
      }
      <h3 className="my-2">Planning <small className="text-muted">(personnel)</small></h3>
      <div>
        <h5 className="text-center">Choisissez une salle</h5>
        <ul className="d-flex justify-content-around list-unstyled">
          {rooms.map(room => (
            <li className="w-25" key={room.id}>
              <button onClick={event => handleClickRoom(event, room)}
                      className="btn btn-primary w-100">{room.roomIdentifier}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex border-dark mt-3">
        <div className="w-50 mr-2">
          <Calendar
            className="w-100"
            onClickDay={handleClickChooseDate}
            value={currentDate}
          />
        </div>
        <div className="w-50 ml-2">
          <h5 className="text-center">{selectDateFormat || "Choisissez une date"}</h5>
          <div>
            {selectDateRooms ?
              <ul className="list-unstyled">
                <li>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{selectedRoom.roomIdentifier}</h5>
                      <h6
                        className="card-subtitle mb-2 text-muted">{selectedRoom.sitPlace - selectDateRooms.length} places
                        restantes</h6>
                      <div className="d-flex">
                        <p className="card-text">Participants:&nbsp;</p>
                        <ul className="list-unstyled">
                          {selectDateRooms.map(event => (
                            <li className="card-text">&nbsp;{event.user_id.firstName} {event.user_id.lastName}</li>
                          ))}
                        </ul>
                      </div>
                      <form onSubmit={event => handleSubmitBooking(event)}>
                        <input type="hidden" name="eventDate" value={selectDate}/>
                        <input type="hidden" name="room" value={selectedRoom}/>
                        <button className="btn btn-primary float-right">Réserver</button>
                      </form>

                    </div>
                  </div>
                </li>
              </ul>
              : ""}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanningPicker;