import React, { useState, useEffect } from "react";
import axios from 'axios'

//Internal imports
import { getToken } from "../../services/utils/getToken";
import { getCurrentUser } from "../../services/api/getCurrentUser";
import { getAvailableRoomsByDate } from "../../services/api/events/getAvailableRoomsByDate"
import { getFormartedDate } from "../../services/utils/getFormartedDate"

//External imports
import Calendar, { CenturyView } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import qs from "querystring"

const PlanningPicker = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectDateFormat, setSelectDateFormat] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectDateRooms, setSelectDateRooms] = useState(null)
  const [availableRooms, setAvailableRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectDate, setSelectDate] = useState(null)
  const [currentUser, setCurrentUser] = useState([])

  useEffect(async () => {
    getCurrentUser().then(response => {
      setCurrentUser(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const handleClickChooseDate = (value) => {
    const dateFormated = getFormartedDate(value)

    setSelectDateFormat(dateFormated)
    setSelectDate(value)

    if (value < currentDate) {
      setError('Cette date est déjà passée')
      setSelectDate(null)
      setAvailableRooms(null)
      return null;
    } else if (value >= currentDate) {
      setError(null)
    }

    value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
    const dateParam = value.toISOString().split('T')[0];

    getAvailableRoomsByDate(dateParam, currentUser.id)
      .then(response => {
        setError(null)
        setAvailableRooms(response.data)
      })
      .catch(error => {
        setAvailableRooms(null)
        setError("Une reservation a déja été faite ce jour")
      })

  }

  const handleChooseRoom = (event, room) => {
    event.preventDefault()
    setSelectedRoom(room)
  }

  const handleSubmitBooking = e => {
    e.preventDefault()

    selectDate.setMinutes(selectDate.getMinutes() - selectDate.getTimezoneOffset());
    const dateParam = selectDate.toISOString().split('T')[0];

    const requestBody = {
      eventDate: dateParam,
      user_id: currentUser.id,
      room: selectedRoom.id
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }

    axios.post('http://localhost:1337/events', qs.stringify(requestBody), config)
      .then(response => setSuccess('Votre reservation a été ajouté'))
      .catch(error => console.log(error))
  }

  return (
    <div>
      {error ?
        <div className="mt-1 alert alert-danger" role="alert">
          {error}
        </div>
        : ""
      }
      {success ?
        <div className="mt-1 alert alert-success d-flex justify-content-between align-items-center" role="alert">
          {success}
          <a href="/" className="btn btn-success">Mes reservations</a>
        </div>
        : ""
      }
      <h3 className="my-2">Planning <small className="text-muted">(personnel)</small></h3>
      <h5>Choisissez une date</h5>
      <div className="d-flex border-dark mt-3">
        <div className="w-75 mr-2">
          <Calendar
            className="w-100"
            onClickDay={handleClickChooseDate}
            value={currentDate}
          />
        </div>
        <div className="w-50 pl-2">
          <h5 className="text-center">Choisissez une salle</h5>
          {availableRooms ?
            <div>
              <ul className="d-flex flex-wrap list-unstyled w-100">
                {availableRooms.map(room => (
                  <li className="w-50 p-1" key={room.id}>
                    <button onClick={event => handleChooseRoom(event, room)} className="btn btn-primary w-100">{room.roomIdentifier}</button>
                  </li>
                ))}
              </ul>
              {selectDateFormat ?
                <div className="card m-1">
                  <div className="card-body">
                    <h5 className="card-title">Récapitulatif</h5>
                    <p className="card-text">Date: {selectDateFormat}</p>
                    <p className="card-text">Salle: {selectedRoom ? selectedRoom.roomIdentifier : "Selectionnez une salle"}</p>
                    <div className="d-flex justify-content-between">
                      {selectedRoom && selectDate ?
                        <button onClick={event => handleSubmitBooking(event)} className="btn btn-primary">Reserver</button>
                        : ""}
                      {success ? <a href="/" className="btn btn-success">Mes reservations</a> : ""}
                    </div>
                  </div>
                </div>
                : ""}
            </div>
            : ""}
        </div>
      </div>
    </div>
  )
}

export default PlanningPicker;