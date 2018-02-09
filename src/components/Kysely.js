import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Kysymys from '../components/Kysymys';
import KysymysCount from '../components/KysymysCount';
import VastausVaihtoehto from '../components/VastausVaihtoehto';

function Kysely(props) {

  function renderVastausVaihtoehdot(key) {
    return (
      <VastausVaihtoehto
        key={key.content}
        vastausContent={key.content}
        vastausType={key.type}
        vastaus={props.vastaus}
        kysymysId={props.kysymysId}
        onVastausValittu={props.onVastausValittu}
      />
    );
  }

  return (
    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.kysymysId}>
        <Kysymys content={props.kysymys} />
        <ul className="vastausVaihtoehdot">
          {props.vastausVaihtoehdot.map(renderVastausVaihtoehdot)}
        </ul>
        <KysymysCount
          counter={props.kysymysId}
          total={props.kysymysTotal}
        />
      </div>
    </ReactCSSTransitionGroup>
  );
}

Kysely.propTypes = {
  vastaus: React.PropTypes.string.isRequired,
  vastausVaihtoehdot: React.PropTypes.array.isRequired,
  kysymys: React.PropTypes.string.isRequired,
  kysymysId: React.PropTypes.number.isRequired,
  kysymysTotal: React.PropTypes.number.isRequired,
  onVastausValittu: React.PropTypes.func.isRequired
};

export default Kysely;
