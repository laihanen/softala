import React, { Component } from 'react';
import update from 'react-addons-update';
import kieliKysymykset from './api/kieliKysymykset';
import Kysely from './components/Kysely';
import Result from './components/Result';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      kysymysId: 1,
      kysymys: '',
      vastausVaihtoehdot: [],
      vastaus: '',
      vastauksetCount: {
        Kolme: 0,
        Yksi: 0,
        Viisi: 0
      },
      result: ''
    };

    this.handleVastausValittu = this.handleVastausValittu.bind(this);
  }

  componentWillMount() {
    const shuffledVastausVaihtoehdot = kieliKysymykset.map((kysymys) => this.shuffleArray(kysymys.vastaukset));
    this.setState({
      kysymys: kieliKysymykset[0].kysymys,
      vastausVaihtoehdot: shuffledVastausVaihtoehdot[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleVastausValittu(event) {
    this.setUserVastaus(event.currentTarget.value);

    if (this.state.kysymysId < kieliKysymykset.length) {
        setTimeout(() => this.setNextKysymys(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserVastaus(vastaus) {
    const updatedVastauksetCount = update(this.state.vastauksetCount, {
      [vastaus]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        vastauksetCount: updatedVastauksetCount,
        vastaus: vastaus
    });
  }

  setNextKysymys() {
    const counter = this.state.counter + 1;
    const kysymysId = this.state.kysymysId + 1;

    this.setState({
        kysymysId: kysymysId,
        kysymys: kieliKysymykset[counter].kysymys,
        vastausVaihtoehdot: kieliKysymykset[counter].vastaukset,
        vastaus: '',
        counter: counter
    });
  }

  getResults() {
    const vastauksetCount = this.state.vastauksetCount;
    const vastauksetCountKeys = Object.keys(vastauksetCount);
    const vastauksetCountValues = vastauksetCountKeys.map((key) => vastauksetCount[key]);
    const maxVastausCount = Math.max.apply(null, vastauksetCountValues);

    return vastauksetCountKeys.filter((key) => vastauksetCount[key] === maxVastausCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderKysely() {
    return (
      <Kysely
        vastaus={this.state.vastaus}
        vastausVaihtoehdot={this.state.vastausVaihtoehdot}
        kysymysId={this.state.kysymysId}
        kysymys={this.state.kysymys}
        kysymysTotal={kieliKysymykset.length}
        onVastausValittu={this.handleVastausValittu}
      />
    );
  }

  renderResult() {
    return (
      <Result kyselyResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Kielitaito</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderKysely()}
      </div>
    );
  }

}

export default App;
