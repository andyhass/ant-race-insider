import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import FlipMove from 'react-flip-move';
import AntDetails from '../../components/AntDetails/AntDetails';
import { withAnts } from '../../resolvers/ants';
import {
  withWinLikelihoods,
  resetWinLikelihoods,
  calculateWinLikelihood,
} from '../../resolvers/winLikelihoods';
import { IN_PROGRESS } from '../../constants/WinLikelihoodStatusConstants';

class AntStatisticContainer extends Component {
  static propTypes = {
    ants: PropTypes.array,
    winLikelihoods: PropTypes.array,
    resetWinLikelihoods: PropTypes.func,
    mutateWinLikelihood: PropTypes.func,
  };
  static defaultProps = {
    ants: [],
  };
  render() {
    const ants = this.props.ants.map((ant, index) => {
      const winLikelihood =
        this.props.winLikelihoods.length > 0 &&
        this.props.winLikelihoods[index];
      return {
        id: index,
        ...ant,
        ...(winLikelihood && {
          ...winLikelihood,
        }),
      };
    });

    const areLikelihoodsGenerating =
      ants.filter(ant => ant.winLikelihoodStatus === IN_PROGRESS).length > 0;
    return (
      <div>
        <nav className="fixed top-0 w-100 pl3 pr3 pl4-ns pr4-ns bg-white black flex items-center z-max">
          <div className="w-50 w-30-ns tl">
            <h1 className="f6">Ant Race Insider&trade;</h1>
          </div>
          <div className="w-auto w-70-ns flex-auto tr">
            {ants.length > 0 && (
              <button
                disabled={areLikelihoodsGenerating}
                onClick={() => {
                  this.props
                    .resetWinLikelihoods(this.props.ants)
                    .then(() => this.props.calculateWinLikelihood());
                }}
                className="bg-white w-auto w5-ns pa1 br2 b f6"
              >
                Generate Live Odds
              </button>
            )}
          </div>
        </nav>
        <section style={{ marginTop: '35px' }} className="h-100 w-100">
          <FlipMove duration={750} easing="ease-out">
            {ants
              .slice()
              .sort((antA, antB) => antB.winLikelihood - antA.winLikelihood)
              .map((ant, index) => {
                return (
                  <div key={ant.name} className={`mb1 w-100`}>
                    <AntDetails {...ant} />
                  </div>
                );
              })}
          </FlipMove>
        </section>
      </div>
    );
  }
}

export default compose(
  withAnts,
  withWinLikelihoods,
  resetWinLikelihoods,
  calculateWinLikelihood
)(AntStatisticContainer);
