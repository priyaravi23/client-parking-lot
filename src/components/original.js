import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {createSpot, deleteSpot, updateSpot} from "../api";
import '../App.scss';
import {cars} from '../data/cars';


export default function Spots(props) {

    const [spot, setSpot] = useState({
        id: uuidv4(),
        name: '',
        make: '',
        model: '',
        licence: '',
        entryDate: '',
        exitDate: ''
    });
    const [edit, setEdit] = useState(false);
    const [make, setMake] = useState('Acura');
    const [model, setModel] = useState(cars['Acura'][0]);

    const makeOptions = Object.keys(cars).map(car => <option value={car}>{car}</option>);
    const modelOptions = cars[make].map(model => <option value={model}>{model}</option>);

    const handleCarChange = (e) => {
        const make = e.target.value;
        setMake(make);
        setModel(cars[make][0]);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const handleSpotChange = e => {
        const propName = e.target.dataset.prop;
        setSpot({
            ...spot,
            [propName]: e.target.value
        });
    };

    const saveSpot = async e => {
        if (e.key === 'Enter') {
            let res = edit ? await updateSpot({
                ...spot
            }) : await createSpot({
                ...spot
            });
            console.log(res.data);
            props.fetchSpots().then().catch();
            setTimeout(() => {
                setSpot({
                    id: uuidv4(),
                    name: '',
                    make: '',
                    model: '',
                    licence: '',
                    entryDate: '',
                    exitDate: ''
                });
            }, 100)
        }

    };

    const handleDeleteSpot = async e => {
        try {
            const id = e.currentTarget.dataset.id;
            const spot = await deleteSpot(id);
            const res = await props.fetchSpots();
        } catch (ex) {
            alert('Could not delete the user!');
        }
    };

    const handleEditSpot = async e => {
        try {
            const {id} = e.currentTarget.dataset;
            console.log(id);
            setEdit(true);
            setSpot({
                ...props.spots[id]
            });
        } catch (ex) {
            alert('Could not edit the user!');
        }
    };

    const handleSaveSpotOnClick = async () => {
        let res = edit ? await updateSpot({
            ...spot
        }) : await createSpot({
            ...spot
        });
        console.log(res.data);
        props.fetchSpots().then().catch();

        setSpot({
            id: uuidv4(),
            name: '',
            make: '',
            model: '',
            licence: '',
            entryDate: '',
            exitDate: ''
        })
    };

    const renderedSpots = Object.values(props.spots).map(spot => <div key={spot.id} className="row">
        <div className="column">
            {spot.name}
        </div>

        <div className="column">
            {spot.make}
        </div>

        <div className="column">
            {spot.model}
        </div>

        <div className="column">
            {spot.licence}
        </div>

        <div className="column">
            {spot.entryDate}
        </div>

        <div className="column">
            {spot.exitDate}
        </div>

        <div className="column">
            <button className="icon"
                    data-id={spot.id}
                    onClick={handleEditSpot}>
                <i className="fa fa-edit"/>
            </button>

            <button className="icon"
                    data-id={spot.id}
                    onClick={handleDeleteSpot}>
                <i className="fas fa-user-minus"/>
            </button>
        </div>
    </div>);


    return (<div>
        <form className='form'>
            <fieldset>
                <div className='field'>
                    <label>Name: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.name}
                        required
                        type="text"
                        data-prop="name"/>
                </div>

                <div className='field'>
                    <label>Car Make </label>
                    <select
                        onClick={saveSpot}
                        onChange={handleCarChange}
                        value={make}
                        required
                        data-prop="make">

                            {makeOptions}
                    </select>
                </div>

                <div className='field'>
                    <label>Car Model </label>
                    <select
                        onClick={saveSpot}
                        onChange={handleModelChange}
                        value={model}
                        required
                        data-prop="model">

                            {modelOptions}
                        </select>
                </div>

                <div className='field'>
                    <label>Licence Plate: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.licence}
                        required
                        type="text"
                        data-prop="licence"/>
                </div>

                <div className='field'>
                    <label>Entry Date: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.entryDate}
                        required
                        type="date"
                        data-prop="entryDate"/>
                </div>

                <div className='field'>
                    <label>Exit Date: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.exitDate}
                        required
                        type="date"
                        data-prop="exitDate"/>
                </div>
            </fieldset>

            <button onClick={handleSaveSpotOnClick}>
                Add Car
            </button>
        </form>

        <div className='table'>
            <div className="table-header">
                <div className="row">
                    <div className="column">Name</div>
                    <div className="column">Car Make</div>
                    <div className="column">Car Model</div>
                    <div className="column">Licence Plate</div>
                    <div className="column">Entry Date</div>
                    <div className="column">Exit Date</div>
                    <div className="column">Options</div>
                </div>
            </div>

            <div className="table-body">
                {renderedSpots}
            </div>
        </div>
    </div>);
}
