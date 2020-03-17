import React, {useEffect, useState} from 'react';
import {cars} from "../data/cars";
import moment from 'moment';
import {v4 as uuidv4} from "uuid";
import * as API from '../api';

const defaultState = {
  name: 'Priya Ravi',
  make: 'Acura',
  model: cars['Acura'][0],
  licence: 'L78DOI',
  entryDate: moment().format('YYYY-MM-DD'),
  exitDate: moment().format('YYYY-MM-DD')
};

const CreateSpot = ({spot: spotToBeEdited, createSpotSuccessCb}) => {

  const [spot, setSpot] = useState(defaultState);

  useEffect(() => {
    setSpot(spotToBeEdited || defaultState);
  }, [spotToBeEdited]);

  const makeOptions = Object.keys(cars).map(car => <option key={car} value={car}>{car}</option>);
  const modelOptions = cars[spot.make].map(model => <option key={model} value={model}>{model}</option>);

  const handleSpotChange = e => {
    const propName = e.target.dataset.prop;
    setSpot({
      ...spot,
      [propName]: e.target.value
    });
  };

  const createSpot = async e => {
    e.preventDefault();
    const _spot = {...spot};
    console.log('Trying to save the spot ... ');
    const {data} = _spot.id ? await API.updateSpot(_spot) : await API.createSpot(_spot);
    console.log(data);
    createSpotSuccessCb();
  };

  console.log(spot);

  return (
    <form className='form' onSubmit={createSpot}>
      <fieldset>
        <div className='field'>
          <label>Name: </label>
          <input
            onChange={handleSpotChange}
            value={spot.name}
            required
            type="text"
            data-prop="name"/>
        </div>

        <div className='field'>
          <label>Car Make </label>
          <select
            onChange={handleSpotChange}
            value={spot.make}
            required
            data-prop="make">

            {makeOptions}
          </select>
        </div>

        <div className='field'>
          <label>Car Model </label>
          <select
            onChange={handleSpotChange}
            value={spot.model}
            required
            data-prop="model">
            {modelOptions}
          </select>
        </div>

        <div className='field'>
          <label>Licence Plate: </label>
          <input
            onChange={handleSpotChange}
            value={spot.licence}
            required
            type="text"
            data-prop="licence"/>
        </div>

        <div className='field'>
          <label>Entry Date: </label>
          <input
            onChange={handleSpotChange}
            value={spot.entryDate}
            required
            type="date"
            data-prop="entryDate"/>
        </div>

        <div className='field'>
          <label>Exit Date: </label>
          <input
            onChange={handleSpotChange}
            value={spot.exitDate}
            required
            type="date"
            data-prop="exitDate"/>
        </div>
      </fieldset>

      <button>
        Add Car
      </button>
    </form>
  );
};

export default CreateSpot;
