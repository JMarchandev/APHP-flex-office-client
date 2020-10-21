import React from "react";
import ConfigRoom from "./rooms/ConfigRooms";
import ConfigUsers from "./users/ConfigUsers";
import ConfigEvents from "./events/ConfigEvents";
import ConfigApp from "./app/ConfigApp";

import { Tabs, Tab } from 'react-bootstrap';

const AdminPanel = () => {

    return (
        <div className="container">
            <Tabs defaultActiveKey="app" id="uncontrolled-tab-example">
                <Tab eventKey="events" title="Evenements">
                    <ConfigEvents/>
                </Tab>
                <Tab eventKey="users" title="Utilisateurs">
                    <ConfigUsers/>
                </Tab>
                <Tab eventKey="rooms" title="Salles">
                    <ConfigRoom/>
                </Tab>
                <Tab eventKey="app" title="Config app">
                    <ConfigApp/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default AdminPanel;