import React, {useState, useEffect} from 'react';
import Spots from "./components/original";
import {deleteSpot, listSpots} from "./api";
import keyBy from 'lodash/keyBy';
import ListSpots from "./components/list-spots";
import CreateSpot from "./components/create-spot";

export default function App() {
    const [spots, setSpots] = useState({});
    const [activeSpot, setActiveSpot] = useState(null);
    const fetchSpots = async () => {
        const res = await listSpots();
        console.log(res.data);
        setSpots(keyBy(res.data, 'id'));
    };
    const cb = () => {
        fetchSpots().then(() => {
            setActiveSpot(null);
        }).catch();
    };
    const handleDeleteSpot = async e => {
        try {
            const id = e.currentTarget.dataset.id;
            await deleteSpot(id);
            await fetchSpots();
        } catch (ex) {
            alert('Could not delete the spot!');
        }
    };

    const handleEditSpot = e => {
        const {id} = e.currentTarget.dataset;
        setActiveSpot(spots[id]);
    };

    useEffect(cb, [true]);
    console.log('active spot being edited is ', activeSpot);
    return (<div>
        <CreateSpot
          createSpotSuccessCb={cb}
          spot={activeSpot}/>
       <ListSpots
         handleDeleteSpot={handleDeleteSpot}
         handleEditSpot={handleEditSpot}
         spots={spots} />
    </div>);
}
