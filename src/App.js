import React, { Component } from 'react';
import { ApolloProvider as Provider } from 'react-apollo';
import AntStatisticsContainer from './containers/AntStatisticsContainer/AntStatisticsContainer';
import client from './client';

class App extends Component {
  render() {
    return (
      <main className="avenir">
        <Provider client={client}>
          <AntStatisticsContainer />
        </Provider>
      </main>
    );
  }
}

export default App;
