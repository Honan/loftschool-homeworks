import React, { Component } from 'react';

import { getShowInfo } from './../../api';

class Show extends Component {
  state = {
    showId: '',
    data: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showId === prevState.showId) return null;

    return {
      showId: nextProps.showId
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showId === this.props.showId) return;
    getShowInfo(this.state.showId).then(parseResponse =>
      this.setState({
        data: parseResponse
      })
    );
  }

  render() {
    const { showId, data } = this.state;
    console.log(data);
    let info = '';
    if (!data) {
      if (showId) info = 'Загрузка шоу с id ' + showId;
      else info = 'Шоу не выбрано';

      return <p className="show-inforation t-show-info">{info}</p>;
    }

    return (
       <div className="show">
          <img alt={data.name} className="show-image" src={data.image.medium} />
          <h2 className="show-label t-show-name">{data.name}</h2>
          <p className="show-text t-show-genre">
            <b>Жанр: </b>
            {data.genres.join(', ')}
          </p>
          <p
            className="show-text t-show-summary"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </div>
    );
  }
}

export default Show;
