import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import AntStatisticsContainer from './containers/AntStatisticsContainer/AntStatisticsContainer';

class App extends Component {
  render() {
    return (
      <main className="avenir">
        <Provider store={createStore()}>
          <AntStatisticsContainer />
        </Provider>
      </main>
    );
  }
}

export default App;
