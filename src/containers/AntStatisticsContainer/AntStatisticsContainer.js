import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AntDetails from '../../components/AntDetails/AntDetails';
import { IN_PROGRESS } from '../../constants/WinLikelihoodStatusConstants';
import { fetchAnts, generateWinLikelihood } from '../../actions/AntActions';
import FlipMove from 'react-flip-move';

class AntStatisticContainer extends Component {
  static propTypes = {
    ants: PropTypes.array,
  };
  componentDidMount() {
    this.props.fetchAnts();
  }
  render() {
    const areLikelihoodsGenerating =
      this.props.ants.filter(ant => ant.winLikelihoodStatus === IN_PROGRESS)
        .length > 0;
    return (
      <div>
        <nav className="fixed top-0 w-100 pl3 pr3 pl4-ns pr4-ns bg-white black flex items-center z-max">
          <div className="w-50 w-30-ns tl">
            <h1 className="f6">Ant Race Insider&trade;</h1>
          </div>
          <div className="w-auto w-70-ns flex-auto tr">
            {this.props.ants.length > 0 && (
              <button
                disabled={areLikelihoodsGenerating}
                onClick={() =>
                  this.props.generateWinLikelihood(this.props.ants)
                }
                className="bg-white w-auto w5-ns pa1 br2 b f6"
              >
                Generate Live Odds
              </button>
            )}
          </div>
        </nav>
        <section style={{ marginTop: '35px' }} className="h-100 w-100">
          <FlipMove duration={750} easing="ease-out">
            {this.props.ants
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

const mapProps = ({ AntStore: { ants } }) => {
  return {
    ants,
  };
};

const dispatchToProps = dispatch => ({
  fetchAnts: () => dispatch(fetchAnts()),
  generateWinLikelihood: ants => dispatch(generateWinLikelihood(ants)),
});

export default connect(mapProps, dispatchToProps)(AntStatisticContainer);
