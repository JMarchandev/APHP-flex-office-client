import React from "react";
import ConfigRoom from "./rooms/ConfigRooms";
import ConfigUsers from "./users/ConfigUsers";
import ConfigEvents from "./events/ConfigEvents";

const AdminPanel = () => {

    return(
        <div>
            <ConfigEvents />
            <ConfigUsers />
            <ConfigRoom />

        </div>
    )
}

export default AdminPanel;