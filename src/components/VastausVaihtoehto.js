import React from 'react';

function VastausVaihtoehto(props) {

  return (
    <li className="vastausVaihtoehto">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={props.vastausType === props.vastaus}
        id={props.vastausType}
        value={props.vastausType}
        disabled={props.vastaus}
        onChange={props.onVastausValittu}
      />
      <label className="radioCustomLabel" htmlFor={props.vastausType}>
        {props.vastausContent}
      </label>
    </li>
  );

}

VastausVaihtoehto.propTypes = {
  vastausType: React.PropTypes.string.isRequired,
  vastausContent: React.PropTypes.string.isRequired,
  vastaus: React.PropTypes.string.isRequired,
  onVastausValittu: React.PropTypes.func.isRequired
};

export default VastausVaihtoehto;
