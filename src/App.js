import React, {useState, useEffect} from 'react';
import Spots from "./components/parking-lot";
import {listSpots} from "./api";
import keyBy from 'lodash/keyBy';

export default function App() {
    const [spots, setSpots] = useState({});
    const fetchSpots = async () => {
        const res = await listSpots();
        console.log(res.data);
        setSpots(keyBy(res.data, 'id'));
    };
    const cb = () => {
        fetchSpots().then().catch();
    };
    useEffect(cb, [true]);
    return (<div>
        <Spots fetchSpots={fetchSpots} spots={spots}/>
    </div>);
}