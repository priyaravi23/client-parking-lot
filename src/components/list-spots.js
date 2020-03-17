import React from 'react';
import RenderSpot from "./render-spot";

const ListSpots = ({spots, handleDeleteSpot, handleEditSpot}) => {
    const renderedSpots = Object.values(spots).map(spot =>
      <RenderSpot
        spot={spot}
        handleDeleteSpot={handleDeleteSpot}
        handleEditSpot={handleEditSpot} />);
  return (
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
  );
};

export default ListSpots;
