import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import AntSVG from './AntSVG';
import {
  READY,
  IN_PROGRESS,
  COMPLETE,
} from '../../constants/WinLikelihoodStatusConstants';
import 'react-circular-progressbar/dist/styles.css';
import './AntDetails.css';

export default ({
  name,
  color,
  length,
  weight,
  winLikelihoodStatus,
  winLikelihood,
}) => {
  return (
    <div className="ant-details flex items-center pl2 pr2 pr4-m pl4-m pl5-l pr5-l pt3 pb3 bg-chloe-light-blue">
      <div className="ant-details--ant-image">
        <AntSVG fill={color} />
      </div>
      <div className="ml3 mr3 w-80 items-center bg-chloe-light-blue gray">
        <h1 className="f4 f3-ns ma0 normal chloe-dark-blue">{name}</h1>
        <p className="ma0">Length: {length}</p>
        <p className="ma0">Weight: {weight}</p>
      </div>
      <div className="ant-details--progressbar tc ttu">
        <div className="ma2 ma2-ns helvetica">
          <CircularProgressbar
            className="progressbar-chloe-orange"
            initialAnimation="true"
            textForPercentage={() => {
              switch (winLikelihoodStatus) {
                case COMPLETE:
                  return `${Math.round(winLikelihood * 100, 0)}%`;
                case IN_PROGRESS:
                  return '...';
                case READY:
                default:
                  return '?';
              }
            }}
            percentage={Math.round(winLikelihood * 100, 0)}
          />
        </div>
        <p className="ma0 chloe-dark-blue">Win Probability</p>
      </div>
    </div>
  );
};
