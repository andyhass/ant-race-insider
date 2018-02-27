function generateAntWinLikelihoodCalculator() {
  var delay = 7000 + Math.random() * 7000;
  var likelihoodOfAntWinning = Math.random();

  return function(callback) {
    setTimeout(function() {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

export default () => {
  return new Promise(resolve => {
    const callback = likelihoodOfAntWinning => {
      resolve(likelihoodOfAntWinning);
    };

    generateAntWinLikelihoodCalculator()(callback);
  });
};
