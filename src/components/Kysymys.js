import React from 'react';

function Kysymys(props) {

  return (
    <h2 className="kysymys">{props.content}</h2>
  );

}

Kysymys.propTypes = {
  content: React.PropTypes.string.isRequired
};

export default Kysymys;
