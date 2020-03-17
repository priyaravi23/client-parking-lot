import React from 'react';

const RenderSpot = ({spot, handleEditSpot, handleDeleteSpot}) => {
  const renderedProps = ['name', 'make', 'model', 'licence', 'entryDate', 'exitDate']
    .map(prop => <div key={prop} className="column">
      {spot[prop]}
    </div>);
  return (<div key={spot.id} className="row">
      {renderedProps}
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
    </div>
  );
};

export default RenderSpot;
