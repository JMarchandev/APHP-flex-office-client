import React, {useEffect, useState} from "react";

// External imports
import axios from 'axios';
import qs from 'query-string';

// Internal imports
import {getDayBeforeBooking} from "../../../services/api/config/getSimpleUserConfig";
import {getToken} from "../../../services/utils/getToken";

const ConfigApp = () => {
    const [error, setError] = useState(null)
    const [configs, setConfigs] = useState([])

    useEffect(() => {
        getDayBeforeBooking()
            .then(response => setConfigs(response.data))
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleChangeValue = (event, index) => {
        let newConfig = configs[index]
        newConfig[event.target.name] = event.target.value
        newConfig = configs.splice(index, 1, newConfig)

        setConfigs(newConfig)
    }

    const handleSubmitChangeDayBeforeBooking =( event, config) => {
        event.preventDefault()

        const requestBody = config
        const configuration = {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

        axios.put(`http://localhost:1337/configs/${config.id}`, qs.stringify(requestBody), configuration)
            .then(response => {window.location = '/admin'})
            .catch(error => {console.log(error)})
    }

    return (
        <div className="w-50 mt-3">
            <h5>Limite de jours pour reserver un bureau</h5>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Role</th>
                    <th scope="col">Value</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                {configs ? configs.map((config, index) => (
                    <tbody>
                    <tr>
                        <th scope="row">{config.id}</th>
                        <td>{config.userRole}</td>
                        <th>
                            <form onSubmit={event => handleSubmitChangeDayBeforeBooking(event, config)}
                                  className="d-flex align-content-center">
                                <input type="number" name="dayBeforeBooking"
                                       onChange={event => handleChangeValue(event, index)}
                                       value={config.dayBeforeBooking}/>
                                <button className="btn btn-warning ml-5">Modifier</button>
                            </form>
                        </th>
                    </tr>
                    </tbody>
                ))
                : ""}
            </table>
        </div>
    )
}

export default ConfigApp;