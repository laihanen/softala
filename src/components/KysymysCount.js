import React from 'react';

function KysymysCount(props) {

  return (
    <div className="kysymysCount">
      Kysymys <span>{props.counter}</span>/<span>{props.total}</span>
    </div>
  );

}

KysymysCount.propTypes = {
  counter: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

export default KysymysCount;
