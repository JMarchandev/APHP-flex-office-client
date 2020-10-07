import React, {useState, useEffect} from "react";
import axios from 'axios'

//Internal imports
import {getToken} from "../../services/utils/getToken";
import {getRooms} from "../../services/api/getRooms";

//External imports
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const PlanningPicker = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectDateFormat, setSelectDateFormat] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectDateRooms, setSelectDateRooms] = useState(null)
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectDate, setSelectDate] = useState(null)

  useEffect( () => {
    getRooms()
      .then(response => {
        setRooms(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  useEffect(() => {
    if  (selectedRoom && selectDate) {
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
          console.log(selectedRoom)
          setSelectDateRooms(response.data)
        })
        .catch(error => {
          setError(error)
        })
    }
  }, [selectedRoom, selectDate])

  const handleClickRoom = (event, room) => {
    event.preventDefault()
    setSelectedRoom(room)
  }

  const handleClickChooseDate = (value) => {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    setSelectDateFormat(value.toLocaleDateString('fr-FR', options))
    setSelectDate(value)
  }

  return (
    <div>
      <h3 className="my-2">Planning <small className="text-muted">(personnel)</small></h3>
      <div>
        <h5 className="text-center">Choisissez une salle</h5>
        <ul className="d-flex justify-content-around list-unstyled">
          {rooms.map(room => (
            <li className="w-25" key={room.id}>
              <button onClick={event => handleClickRoom(event, room)} className="btn btn-primary w-100">{room.roomIdentifier}</button>
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
            <ul className="list-unstyled">
              {selectDateRooms ?
                selectDateRooms.map(event => (
                <li key={event.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{event.room.roomIdentifier}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{event.room.sitPlace - selectDateRooms.length} places restantes</h6>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk
                        of the card's content.</p>
                      <a href="#" className="card-link">Card link</a>
                      <a href="#" className="card-link">Another link</a>
                    </div>
                  </div>
                </li>
              ))
              : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanningPicker;