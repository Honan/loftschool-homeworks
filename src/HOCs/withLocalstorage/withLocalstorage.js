import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, emptyArray) => WrappedComponent => {
  return class extends Component {
    static displayName = 'pureHocWrapper';

    SavedData = () => load(key) || emptyArray;

    SaveData = data => {
      save(key, data);
      this.forceUpdate();
    };

    render() {
      return (
        <WrappedComponent
          SaveData={this.SaveData}
          savedData={this.SavedData()}
          {...this.props}
        />
      );
    }
  };
};

export default withLocalstorage;
