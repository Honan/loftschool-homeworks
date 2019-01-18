import React, { Component } from "react";

import {getShowInfo} from './../../api';

class Show extends Component {
  state = {
    showId: "",
    data: null
  };

  static getDerivedStateFromProps(nextProps, prevState){
    return {
      showId: nextProps.showId,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    getShowInfo(this.state.showId)
    .then(parseResponse => console.log(parseResponse))

  }

  render() {
    const {showId, data} = this.state;

    let info = '';
    if(!data){ // нет данных
      if(showId) info = 'Загрузка шоу с id ' + showId;
      else info = 'Шоу не выбрано'
    }
 
    return <p className="show-inforation t-show-info">{ info }</p>;
  }
}

export default Show;